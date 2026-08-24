#!/usr/bin/env python3
"""Create AV3YA merchant auth user and link to merchant (one-time bootstrap)."""
from __future__ import annotations

import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ENV_PATH = Path('/Users/admin/Documents/GitHub/Redface-pay/.env.local')
EMAIL = 'av3ya.inc@gmail.com'
PASSWORD = os.environ.get('AV3YA_BOOTSTRAP_PASSWORD', '')
MERCHANT_ID = '189b3304-3275-43c5-b2f6-8f8c2d0704b2'


def load_env(path: Path) -> dict[str, str]:
    out: dict[str, str] = {}
    if not path.exists():
        return out
    for line in path.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, val = line.split('=', 1)
        out[key.strip()] = val.strip().strip('"').strip("'")
    return out


def request_json(method: str, url: str, headers: dict[str, str], body: dict | None = None):
    data = None if body is None else json.dumps(body).encode('utf-8')
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read().decode('utf-8')
            return json.loads(raw) if raw else {}
    except urllib.error.HTTPError as err:
        raw = err.read().decode('utf-8')
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            payload = {'message': raw}
        raise RuntimeError(f'{method} {url} failed ({err.code}): {payload}') from err


def main() -> int:
    if len(sys.argv) > 1:
        global PASSWORD
        PASSWORD = sys.argv[1]

    if not PASSWORD:
        print('Missing password: set AV3YA_BOOTSTRAP_PASSWORD or pass as argv[1]', file=sys.stderr)
        return 1

    env = load_env(ENV_PATH)
    url = env.get('SUPABASE_URL') or env.get('NEXT_PUBLIC_SUPABASE_URL') or ''
    service = env.get('SUPABASE_SERVICE_ROLE_KEY') or ''
    anon = env.get('NEXT_PUBLIC_SUPABASE_ANON_KEY') or ''

    if not url or not service:
        print('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local', file=sys.stderr)
        return 1

    admin_headers = {
        'Authorization': f'Bearer {service}',
        'apikey': service,
        'Content-Type': 'application/json',
    }

    # Find existing user
    users = request_json(
        'GET',
        f'{url}/auth/v1/admin/users?email={urllib.parse.quote(EMAIL)}',
        admin_headers,
    )
    user_id = None
    if isinstance(users, dict) and users.get('users'):
        user_id = users['users'][0]['id']
        print(f'Found existing auth user: {user_id}')
    else:
        created = request_json(
            'POST',
            f'{url}/auth/v1/admin/users',
            admin_headers,
            {
                'email': EMAIL,
                'password': PASSWORD,
                'email_confirm': True,
                'user_metadata': {'source': 'av3ya_bootstrap'},
            },
        )
        user_id = created.get('id') or (created.get('user') or {}).get('id')
        if not user_id:
            print(f'Create user response missing id: {created}', file=sys.stderr)
            return 1
        print(f'Created auth user: {user_id}')

    # Update password for existing users (handoff reset)
    request_json(
        'PUT',
        f'{url}/auth/v1/admin/users/{user_id}',
        admin_headers,
        {'password': PASSWORD, 'email_confirm': True},
    )
    print('Password synced')

    # Link merchant + identity assets
    link = request_json(
        'POST',
        f'{url}/rest/v1/rpc/apply_identity_link_assets',
        admin_headers,
        {'p_supabase_user_id': user_id, 'p_email': EMAIL},
    )
    print('Identity link RPC:', link if link else 'ok')

    # Verify merchant row
    merchant = request_json(
        'GET',
        f'{url}/rest/v1/merchants?id=eq.{MERCHANT_ID}&select=id,email,paystack_subaccount,auth_user_id',
        admin_headers,
    )
    print('Merchant:', merchant)

    if anon:
        signin = request_json(
            'POST',
            f'{url}/auth/v1/token?grant_type=password',
            {'apikey': anon, 'Content-Type': 'application/json'},
            {'email': EMAIL, 'password': PASSWORD},
        )
        print('Sign-in test:', 'ok' if signin.get('access_token') else signin)

    return 0


if __name__ == '__main__':
    import urllib.parse

    raise SystemExit(main())

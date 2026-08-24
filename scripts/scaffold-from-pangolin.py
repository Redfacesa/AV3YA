#!/usr/bin/env python3
"""Copy Pangolin satellite scaffold into AV3YA with rebrand (keeps shared RPC/table names)."""
from __future__ import annotations

import os
import re
import shutil
from pathlib import Path

SRC = Path('/Users/admin/Documents/GitHub/pangolinclothing')
DST = Path('/Users/admin/Documents/GitHub/AV3YA')
EXCLUDE_DIRS = {'.git', 'node_modules', '.next', '.cursor', 'scripts'}

PROTECTED = [
    'pangolin_storefront_catalog',
    'pangolin_tailoring_services',
    'pangolin_site_content',
]

RENAME_FILES = {
    'PangolinLogo.tsx': 'Av3yaLogo.tsx',
    'PangolinIntroAnimation.tsx': 'Av3yaIntroAnimation.tsx',
}

TEXT_REPLACEMENTS = [
    ('PangolinPlatformConfig', 'Av3yaPlatformConfig'),
    ('getPangolinConfig', 'getAv3yaConfig'),
    ('isPangolinAdmin', 'isAv3yaAdmin'),
    ('NEXT_PUBLIC_PANGOLIN_MERCHANT_ID', 'NEXT_PUBLIC_AV3YA_MERCHANT_ID'),
    ('PANGOLIN_SOCIAL', 'AV3YA_SOCIAL'),
    ('PangolinIntroAnimation', 'Av3yaIntroAnimation'),
    ('PangolinLogo', 'Av3yaLogo'),
    ('pangolin-clothing', 'av3ya'),
    ('pangolinclothing-git-main-redfacesa-8644s-projects.vercel.app', 'av3ya-git-main-redfacesa-8644s-projects.vercel.app'),
    ('pangolinclothing-redfacesa-8644s-projects.vercel.app', 'av3ya-redfacesa-8644s-projects.vercel.app'),
    ('pangolinclothing.vercel.app', 'av3ya.vercel.app'),
    ('www.pangolinsa.store', 'av3ya.vercel.app'),
    ('pangolinsa.store', 'av3ya.vercel.app'),
    ('Pangolin Clothing', 'AV3YA'),
    ('Pangolin Tailoring', 'AV3YA Tailoring'),
    ("p_slug: 'pangolin'", "p_slug: 'av3ya'"),
    ('ecosystem_app: \'pangolin\'', 'ecosystem_app: \'av3ya\''),
    ('ecosystem_from: \'pangolin\'', 'ecosystem_from: \'av3ya\''),
    ("ecosystem_from: 'pangolin'", "ecosystem_from: 'av3ya'"),
    ("utm_source: 'pangolin'", "utm_source: 'av3ya'"),
    ("'pangolin'", "'av3ya'"),
    ('bg-pangolin-', 'bg-av3ya-'),
    ('text-pangolin-', 'text-av3ya-'),
    ('border-pangolin-', 'border-av3ya-'),
    ('from-pangolin-', 'from-av3ya-'),
    ('to-pangolin-', 'to-av3ya-'),
    ('pangolin:', 'av3ya:'),
]


def protect(content: str) -> tuple[str, dict[str, str]]:
    tokens: dict[str, str] = {}
    for i, name in enumerate(PROTECTED):
        token = f'__PROTECTED_{i}__'
        content = content.replace(name, token)
        tokens[token] = name
    return content, tokens


def restore(content: str, tokens: dict[str, str]) -> str:
    for token, name in tokens.items():
        content = content.replace(token, name)
    return content


def transform(content: str) -> str:
    content, tokens = protect(content)
    for old, new in TEXT_REPLACEMENTS:
        content = content.replace(old, new)
    content = restore(content, tokens)
    # slug fallback in config
    content = re.sub(r"slug: 'av3ya'", "slug: 'av3ya'", content)
    return content


def copy_tree() -> None:
    for root, dirs, files in os.walk(SRC):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        rel = Path(root).relative_to(SRC)
        if any(part in EXCLUDE_DIRS for part in rel.parts):
            continue
        target_dir = DST / rel
        target_dir.mkdir(parents=True, exist_ok=True)
        for name in files:
            src_file = Path(root) / name
            out_name = RENAME_FILES.get(name, name)
            dst_file = target_dir / out_name
            if src_file.suffix in {'.tsx', '.ts', '.css', '.json', '.md', '.mjs', '.example', '.env'} or name in {
                'vercel.json',
                '.gitignore',
                '.eslintrc.json',
                '.gitattributes',
            }:
                text = src_file.read_text(encoding='utf-8')
                dst_file.write_text(transform(text), encoding='utf-8')
            else:
                shutil.copy2(src_file, dst_file)


if __name__ == '__main__':
    copy_tree()
    print('AV3YA scaffold complete')

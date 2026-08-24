# AV3YA

**Anime-inspired streetwear** on the RedFace Pay commerce kernel — shop limited drops and pay instantly with [RedFace Pay](https://github.com/Redfacesa/Redface-pay).

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, React 19, Tailwind CSS, Framer Motion |
| Database | RedFace Pay Supabase (shared) |
| Payments | RedFace Pay + Paystack subaccounts |

## Setup

```bash
npm install
cp .env.example .env.local   # local dev — gitignored
cp vercel.env.example vercel.env.local   # fill for Vercel paste — gitignored
npm run dev
```

**Never commit** `.env.local`, `vercel.env.local`, or real API keys. Set secrets only in Vercel → Environment Variables.

Open [http://localhost:3000](http://localhost:3000)

## RedFace Pay integration

1. Migration `0396_av3ya_fashion_platform.sql` registers ecosystem app `av3ya` and merchant bootstrap.
2. Set `NEXT_PUBLIC_AV3YA_MERCHANT_ID` after migration (or rely on `get_ecosystem_app_config`).
3. Client owner email, Paystack subaccount, and bank details: update via follow-up migration when provided.

## Ecosystem

AV3YA is registered as ecosystem app `av3ya` in RedFace Pay (same pattern as Pangolin). SSO login flows through RedFace Pay's ecosystem login page.

## Pending from client

- Owner admin email + password (merchant auth)
- Bank account details
- Paystack subaccount code

When you have these, we wire the merchant owner email in `platform_ecosystem_apps.metadata.owner_email`, create the auth user, and attach Paystack settlement.

# Jellybean's Boyfriend Benefits — V2

V2 adds server-backed coupon redemption, email notifications, and a private `/admin/` dashboard.

## Vercel setup
1. Deploy this repository to Vercel.
2. Add a Vercel KV/Redis integration so `KV_*` environment variables are available.
3. Add environment variables: `NOTIFY_EMAIL`, `RESEND_API_KEY`, optional `FROM_EMAIL`, and `ADMIN_KEY`.
4. Redeploy after adding environment variables.

The notification email is deliberately not hard-coded into browser JavaScript.


Database integration: Upstash Redis connected through Vercel Marketplace.

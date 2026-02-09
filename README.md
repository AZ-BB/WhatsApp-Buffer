# WhatsApp Cloud API CRM Dashboard

Production-ready Next.js dashboard for receiving and sending WhatsApp messages via Meta’s Cloud API, with a CRM to manage leads and statuses.

## Tech stack

- **Next.js** (App Router)
- **TypeScript**
- **PostgreSQL** via **Supabase**
- **Tailwind CSS**

## Features

- **Webhook** – GET (Meta verification) and POST (incoming messages), signature verification, persistence and logging
- **Send message** – `POST /api/send-message` with retry and error handling
- **CRM** – Leads list, filters by status, conversation view, send messages, update lead status (e.g. not interested, unresponsive)

## Setup

### 1. Environment

Copy `.env.example` to `.env.local` and set:

- **Supabase**: Create a project at [supabase.com](https://supabase.com). Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY`.
- **WhatsApp**: In [Meta for Developers](https://developers.facebook.com/) create an app, add WhatsApp, get **Access Token** and **Phone number ID**. Set `WHATSAPP_ACCESS_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID`.
- **Webhook**: Choose a verify token and set `WEBHOOK_VERIFY_TOKEN` (same value in Meta App Dashboard > WhatsApp > Configuration).
- **Optional**: Set `META_APP_SECRET` to verify webhook payloads with `X-Hub-Signature-256`.

### 2. Database

Run the migration in Supabase (SQL Editor or CLI):

```bash
# If using Supabase CLI
supabase db push
```

Or paste the contents of `supabase/migrations/001_initial.sql` into the Supabase SQL Editor and run it.

### 3. Meta webhook

- Callback URL: `https://your-domain.com/api/webhook`
- Verify token: same as `WEBHOOK_VERIFY_TOKEN`
- Subscribe to the **messages** field.

### 4. Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Open dashboard** to manage leads.

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/webhook` | Meta webhook verification (hub.mode, hub.verify_token, hub.challenge) |
| POST | `/api/webhook` | Incoming WhatsApp events; stores messages and logs |
| POST | `/api/send-message` | Send text. Body: `{ "to": "phone_number", "text": "message" }` |
| GET | `/api/leads` | List leads (optional `?status=&limit=&offset=`) |
| GET | `/api/leads/[id]` | Get one lead |
| PATCH | `/api/leads/[id]/status` | Update status. Body: `{ "status": "not_interested" \| ... }` |
| GET | `/api/leads/[id]/messages` | List messages for a lead |

## Lead statuses

`new`, `contacted`, `interested`, `not_interested`, `unresponsive`, `converted`, `invalid`

## Project structure

```
app/
  api/
    webhook/route.ts      # GET verify, POST receive
    send-message/route.ts # POST send
    leads/                # CRUD + status + messages
  dashboard/              # CRM UI
  error.tsx, global-error.tsx
lib/
  supabase/               # Browser + server + service client
  whatsapp/service.ts     # Send message, retry, normalize phone
  db/                     # leads, messages, webhook_logs
  utils/
    parse-whatsapp-message.ts  # Extract text/media from payload
    webhook-signature.ts       # HMAC verification
types/
  database.ts, whatsapp.ts
supabase/migrations/
  001_initial.sql
middleware.ts
```

## Learn more

- [Next.js](https://nextjs.org/docs)
- [WhatsApp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api)
- [Supabase](https://supabase.com/docs)

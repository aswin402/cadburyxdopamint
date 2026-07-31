# Cadbury × Dopamint companion widget

Cadbury hosts brand chrome only. Companion **picker** and **chat** stay in **`ai_companion`** and load as iframes — no catalog/API copy in Cadbury.

## Local setup (recommended)

| App | Port | Command |
|-----|------|---------|
| Cadbury | **5173** | `cd cadburyxdopamint && npm run dev` |
| Companion | **3001** | `cd ai_companion/frontend && npm run dev` |

Cadbury `.env.local`:

```
VITE_COMPANION_ORIGIN=http://localhost:3001
VITE_COMPANION_EMBED_ORIGIN=http://localhost:3001
# Santa JWT → widget ?token= (Bearer for APIs; no wallet UI)
VITE_SANTA_USER_ID=<jwt>
# Santa avatar uuid from /api/avatars
VITE_SANTA_AVATAR_ID=ce8f55aa-3281-4ec3-9acd-a131b6a3a4b0
```

Companion `.env.local` must include Cadbury in framing:

```
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_CSP_FRAME_ANCESTORS="'self' http://localhost:5173 http://127.0.0.1:5173"
```

## Cadbury host routes (React Router)

| Path | Page |
|------|------|
| `/` | Home + floating launcher |
| `/companions` | Picker shell |
| `/companions/:id` | Chat shell (wallet auth) |
| `/companions/<santa-uuid>?santa=1` | Santa chat — JWT, **no wallet** |

### How Santa chat is called (important)

Cadbury / frontend only injects `VITE_SANTA_USER_ID` (JWT) and opens Santa by uuid — **credit rules stay on your colleague’s companion API** (do not edit `session.py` in this repo for that).

UI flow:

1. Hero → `/companions/ce8f55aa-3281-4ec3-9acd-a131b6a3a4b0?santa=1`
2. Iframe: `?chat=<uuid>&token=<JWT>&santa=1` — no wallet Connect
3. Widget runs normal ChatSession with `character_id: "santa"`

## Widgets

| Route | Purpose |
|-------|---------|
| `/widget/picker` | Companion catalog cards (API + UI) |
| `/widget/companion` | Live chat |
| `/widget/plans` | Credit / plan top-up |

### Picker flow

1. Cadbury → `/companions` embeds `/widget/picker`
2. Select → `dopamint:select` → `/companions/<uuid>` chat iframe

## Lightweight host responsibility

| Layer | Responsibility |
|-------|----------------|
| Cadbury | Brand chrome + routes + iframe + `VITE_SANTA_USER_ID` / avatar uuid |
| Dopamint iframes | Catalog, session, Agora (Reown only for non-Santa) |

**Do not install Agora or AppKit in Cadbury.**

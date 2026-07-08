# Fable 5 — Living Mirror Grove (X Live)

**Unifying thread:** The Grove is the living crystallization of the **1/13 audience / revenue surface**.

| Field | Value |
|-------|--------|
| Broadcast | [`1nxeLLzpWlRJX`](https://x.com/i/broadcasts/1nxeLLzpWlRJX) |
| Public host | `https://yennefer.quest/live` |
| Operator | Diamondnode · Sovereign Genesis Conductor |
| Status | Activation package (cold-path) |

## Contents

```
fable5-signal-bridge.js     Node + browser ingestSignal()
signals/ingest-pack.json    Real X signals (no synthetic posts)
public/live/index.html      /live companion + meters + intents
public/fable5-living-mirror.html
public/_redirects           Cloudflare Pages /live 200 rewrite
cloudflare/live-route-worker.js
docs/CLOUDFLARE_DEPLOY_CHECKLIST.md
```

## Run the bridge (Diamondnode)

```bash
# Full pack ingest → writes /tmp/sota-livestream/intent-signal.json + evt JSONL
node fable5-signal-bridge.js --signals ./signals/ingest-pack.json --pretty

# Single shot
node fable5-signal-bridge.js --once --signal surge --text "Let it flow" --pretty

# Optional CF intent push (never log the token)
# INTENT_PUSH_SECRET=*** CF_INTENT_URL=https://yennefer.quest/api/intent \
#   node fable5-signal-bridge.js --signals ./signals/ingest-pack.json
```

Evt log default: `~/logs/fable5-grove-activation.jsonl`

## Grove browser integration

```html
<script src="/fable5-signal-bridge.js"></script>
<script>
  // After Living Mirror mounts, window.__fable5 / window.ingestSignal exist.
  await ingestSignal({
    id: '2074885222726770998',
    author: 'InvariantX',
    text: 'Let it flow',
    metrics: { likes: 2, views: 36 }
  });
</script>
```

`fetch()` from the Grove live page already polls `/api/intent` and the local relay.

## Deploy

See [`docs/CLOUDFLARE_DEPLOY_CHECKLIST.md`](docs/CLOUDFLARE_DEPLOY_CHECKLIST.md).

## Security

- No stream keys or bearer tokens in this repo.
- Rotate X Media Studio keys if ever leaked.
- Auth for intent POST: `X-Intent-Secret` / `INTENT_PUSH_SECRET` only.

# Cloudflare Pages + custom domain — `/live` checklist

**Target:** `https://yennefer.quest/live`  
**Project:** `yennefer-quest`  
**Broadcast:** `1nxeLLzpWlRJX`

## Deploy

```bash
cd /home/diamondnode/yennefer-quest-deploy
cp -a /home/diamondnode/fable5-living-mirror/public/live public/
cp /home/diamondnode/fable5-living-mirror/public/_redirects public/_redirects
cp /home/diamondnode/fable5-living-mirror/fable5-signal-bridge.js public/fable5-signal-bridge.js
npx wrangler pages deploy public --project-name=yennefer-quest
```

## Verify

```bash
curl -sI https://yennefer.quest/live | head -5
curl -sI https://yennefer.quest/fable5-living-mirror.html | head -5
```

## Security

Never commit stream keys or bearer tokens. Use `INTENT_PUSH_SECRET` for POST `/api/intent` only.

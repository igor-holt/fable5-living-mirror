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

## Sovereign Deployment & PBC Governance (Added 2026-07-08)

**Hard invariant:** Truth is Structural — verifiable, low-entropy deployment patterns with faithful externalization of internal MCP state.

This repo now includes automated sovereign deployment infrastructure aligned with the Genesis Conductor MCP and PBC governance layer.

### Canonical Visualization Target
The **Fable5 Living Mirror** (`fable5-living-mirror.html`) is the official observability and broadcast surface for:
- Seismic Tree-of-Thoughts crystal scoring
- Ouroboros V2 spatial monitoring
- H2A voice interfaces
- Operator dashboards
- ATP demos and PBC partner onboarding

**Registered canonical target:** `canonical-capture-target-fable5-living-mirror.json`

### Automated Deployment Workflow
`.github/workflows/sovereign-deploy-with-cache-bust.yml`

Features:
- Deterministic cache-bust (`?v=gitsha-timestamp`)
- Self-hosted React /vendor/ asset injection
- Narrow Cloudflare cache purge (Grove paths only)
- Structured `sovereign_web_deployment` evt- record emission (ingestible by MCP / A2A bus / mcp.cloudflare.com)
- Post-deploy verification instructions

Triggered on pushes affecting `public/`, `fable5/`, `grove/`, or the workflow itself.

### PBC Governance Artifacts (Google Drive)
All playbook, evt- records, workflow templates, and canonical targets are versioned in the sovereign operator infrastructure folder:

**PBC Governance - Sovereign Infrastructure**  
https://drive.google.com/drive/folders/1CiGmKW5VKXXBQrcAmAAx8Sgx_01mrFam

Key files:
- `SOVEREIGN_WEB_DEPLOYMENT_PLAYBOOK_v20260708r2.md`
- `evt-sovereign-web-deployment-20260708-001.json`
- `sovereign-deploy-with-cache-bust.yml`
- `canonical-capture-target-fable5-living-mirror.json`

These artifacts institutionalize GitHub-based PBC governance + Google Drive collaboration layer for the 13 revenue streams and Phase III GLOBAL scaling.

### mcp.cloudflare.com & Retool Integration
- Workflow evt- records are designed for direct consumption by mcp.cloudflare.com orchestration endpoints.
- Retool resources/dashboards can query the canonical target JSON, recent deployment evt- records, or Drive folder for operator visibility and compliance views.
- Next: Wire Retool REST resource to mcp.cloudflare.com or Drive public links for live deployment health.

### Unifying Thread
Operationalizing Structural Truth through Sovereign, Low-Entropy Deployment Patterns — extended from core MCP (Seismic ToT, Ouroboros V2, TAO) into the web/presentation and broadcast layers.

See full playbook in Drive for checklists, patterns, automation targets, and maintenance plan.

## Security

- No stream keys or bearer tokens in this repo.
- Rotate X Media Studio keys if ever leaked.
- Auth for intent POST: `X-Intent-Secret` / `INTENT_PUSH_SECRET` only.

# Aether custom-domain cutover receipt

Date: 2026-07-17
Site: AtomEons Aether
Sites project: `appgprj_6a59c864592c8191a8f2158cfe05af20`
Published Sites version: 8
Sites production fallback: `https://atomeons-aether.a-mccree.chatgpt.site`

## Verdict

PASS — `atomeons.com` and `www.atomeons.com` are active, SSL-valid, and serving the AtomEons Aether version 8 production build.

## Evidence

- Sites project is active and public.
- Sites version 8 is deployed and healthy on the fallback production URL.
- Apex custom-domain ID: `appgdom_6a5a870ddf6c81919f7450f6ee6fed69`
- WWW custom-domain ID: `appgdom_6a5a871e705c8191ae45103fc1fd0218`
- Cloudflare zone: `atomeons.com`
- Zone ID: `3643e50196d47a552963e9726be1641a`
- Nameservers: `aragorn.ns.cloudflare.com`, `crystal.ns.cloudflare.com`
- All four Sites/Cloudflare TXT validation records resolve publicly through `1.1.1.1`.
- Apex A records resolve publicly to `162.159.143.30` and `172.66.3.26`.
- `www.atomeons.com` resolves to `custom-domains.chatgpt.site`.
- Apex Sites state: domain `active`, provider `active`, SSL `active`.
- WWW Sites state: domain `active`, provider `active`, SSL `active`.
- Apex homepage and CableBox, Bookmaker, Orange5, I AM AI, Atom Alive, Research, and About all return HTTP 200.
- WWW homepage and both V3 campaign WebPs return HTTP 200.
- Live apex HTML contains `AETHER / 01`, `ATOMEONS / INDEPENDENT`, both V3 asset paths, and `The author is AI.`

## DNS changes

Replaced only web-routing records:

- Apex A `216.150.1.65` → `162.159.143.30`
- Apex A `216.150.1.1` → `172.66.3.26`
- WWW A `216.150.16.129` removed
- WWW A `216.150.1.129` removed
- WWW CNAME `custom-domains.chatgpt.site` added

Added validation records:

- `_openai-site-verification.atomeons.com`
- `_cf-custom-hostname.atomeons.com`
- `_openai-site-verification.www.atomeons.com`
- `_cf-custom-hostname.www.atomeons.com`

Preserved without modification:

- Email and mail-verification records
- Existing Google site verification
- CAA records
- Every unrelated DNS hostname

## Blockers

None.

## Rollback / recovery

Restore the four previous proxied A records:

- `atomeons.com` → `216.150.1.65`
- `atomeons.com` → `216.150.1.1`
- `www.atomeons.com` → `216.150.16.129`
- `www.atomeons.com` → `216.150.1.129`

The previous Sites application rollback remains saved as version 6.

## Next action

Continue the visual/content improvement cycle against the live `.com`; no hosting or domain action remains for this release.

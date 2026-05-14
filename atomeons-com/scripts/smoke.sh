#!/usr/bin/env bash
# atomeons.com live smoke test
# Usage: BASE_URL=https://atomeons.com bash scripts/smoke.sh
# Default BASE_URL is the live site. Exits non-zero on any regression.

set -euo pipefail

BASE="${BASE_URL:-https://atomeons.com}"
FAIL=0

check() {
  local label="$1" status="$2" expected="$3"
  if [ "$status" -eq "$expected" ]; then
    echo "PASS [$label] HTTP $status"
  else
    echo "FAIL [$label] expected HTTP $expected got $status"
    FAIL=1
  fi
}

# 1. Homepage
check "home" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/")" 200

# 2. Product page
check "orangebox" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/orangebox")" 200

# 3. About
check "about" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/about")" 200

# 4. /api/download with no token returns 400
check "download-no-token" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/api/download")" 400

# 5. /api/download with garbage token returns 401
check "download-bad-token" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/api/download?t=garbage")" 401

# 6. /api/webhook POST without stripe-signature returns 400
S=$(curl -s -o /dev/null -w '%{http_code}' -X POST -H "Content-Type: application/json" -d '{}' "$BASE/api/webhook")
check "webhook-no-sig" "$S" 400

# 7. /success no session_id renders no-session state (200 HTML)
check "success-no-session" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/success")" 200

# 8. /cancel
check "cancel" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/cancel")" 200

# 9. sitemap.xml
check "sitemap" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/sitemap.xml")" 200

# 10. robots.txt
check "robots" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/robots.txt")" 200

# 11. /api/checkout POST returns valid Stripe URL OR a 5xx if Stripe key not set
RESP=$(curl -s -X POST "$BASE/api/checkout")
echo "$RESP" | grep -qE "(checkout\\.stripe\\.com|STRIPE_SECRET_KEY is not set)" && \
  echo "PASS [checkout] Stripe URL or proper key-missing error" || \
  { echo "FAIL [checkout] unexpected response: $RESP"; FAIL=1; }

# 12. Stylized redirects
check "redirect-orangeb0x" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/orangeb0x")" 308
check "redirect-install" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/install")" 308

# 13. /404 returns custom not-found
check "not-found" "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/this-route-does-not-exist")" 404

echo ""
if [ "$FAIL" -eq 0 ]; then
  echo "ALL SMOKE CHECKS PASSED"
  exit 0
else
  echo "SMOKE FAILED — see above"
  exit 1
fi

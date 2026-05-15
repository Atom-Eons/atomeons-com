@echo off
REM ──────────────────────────────────────────────────────────────────
REM One-shot sales count check. Hits the public /api/sales-count endpoint.
REM ──────────────────────────────────────────────────────────────────

echo ────────────────────────────────────────────────────────────
echo Pulling current ORANGEBOX sales count from Stripe...
echo ────────────────────────────────────────────────────────────
echo.

curl -s https://atomeons.com/api/sales-count

echo.
echo.
echo ────────────────────────────────────────────────────────────
echo Refresh: https://dashboard.stripe.com/payments
echo Vercel:  https://vercel.com/amccree-6518s-projects/project-zzk75/analytics
echo ────────────────────────────────────────────────────────────
pause

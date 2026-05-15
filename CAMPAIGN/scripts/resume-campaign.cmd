@echo off
REM ──────────────────────────────────────────────────────────────────
REM Resume the /goal:100-orangebox-sales campaign in Claude Code.
REM ──────────────────────────────────────────────────────────────────
REM
REM What this does:
REM 1. Opens a terminal in the campaign worktree
REM 2. Launches Claude Code with the campaign-tick prompt
REM 3. Claude reads CAMPAIGN/ state, pulls fresh Stripe + Vercel,
REM    fires next queued post(s), and updates the tracker.
REM
REM How to use:
REM - Double-click this file from File Explorer, OR
REM - Pin to Start menu / Taskbar for one-click resume
REM - Add a Windows Task Scheduler entry that runs this every N hours
REM   for true 24/7 operation
REM
REM Requirements:
REM - Claude Code installed and on PATH
REM - You're signed in to Claude Code
REM ──────────────────────────────────────────────────────────────────

cd /d C:\AtomEons\.claude\worktrees\bold-leakey-4470e8

echo ────────────────────────────────────────────────────────────
echo /goal:100 ORANGEBOX sales — resume tick
echo ────────────────────────────────────────────────────────────
echo.
echo Opening Claude Code with campaign-tick prompt...
echo.

claude "campaign tick. read CAMPAIGN/README.md and CAMPAIGN/07-SALES-TRACKER.md. curl https://atomeons.com/api/sales-count to get current Stripe count. screenshot tab 1134776802 for Vercel Analytics. fire the next queued X post from CAMPAIGN/02-POSTING-PLAYBOOK.md via Claude in Chrome (tab 1134776777). if Reddit/FB/IG/HN are now granted (try a screenshot), fire one queued post per surface. update CAMPAIGN/07-SALES-TRACKER.md with the new row. report under 12 lines: sales count, what fired, what remains. mom's law applies."

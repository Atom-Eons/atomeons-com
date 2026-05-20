# Where is atomeons-com?

**Canonical home:** `C:\AtomEons\github\atomeons-com\`
**Private GitHub repo:** https://github.com/AtomEons/atomeons-com
**Production:** https://atomeons.com (Vercel project `prj_rJrokQneeIQYo6IigQIKwDn0QvU8`)

## Per operator decree (2026-05-19)

The atomeons-com project no longer lives inside `.claude/worktrees/`.
It now has its own standalone private git history at
`C:\AtomEons\github\atomeons-com\`, with its own remote on GitHub.

The folder that was here (`bold-leakey-4470e8/atomeons-com/`) was a
copy from before the split — it has been removed because the
canonical home is the source of truth.

## Working in atomeons-com going forward

```pwsh
cd C:\AtomEons\github\atomeons-com
# work, commit, push, deploy from here only
vercel --prod --yes
```

Never put new atomeons-com work in `.claude/worktrees/`. Ever.

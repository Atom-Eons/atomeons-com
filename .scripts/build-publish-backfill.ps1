$dir = "C:\AtomEons\github\atomeons-com\.scripts\founders-view-letters"
$out = "C:\AtomEons\github\atomeons-com\.scripts\publish-backfill.sql"
$dq  = "`$body_md`$"  # the dollar-quote tag — kept in a variable so the format string never sees a literal $-sigil

function ParseLetter($path) {
  $raw = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
  $subj = ([regex]::Match($raw, "(?m)^# SUBJECT:\s*(.+)$")).Groups[1].Value.Trim()
  $openMatch = [regex]::Match($raw, "(?m)^# OPENING:\s*(.+)$")
  $open = $openMatch.Groups[1].Value.Trim()
  $afterOpen = $openMatch.Index + $openMatch.Length
  $body = $raw.Substring($afterOpen).Trim()
  $wc = ($body -split "\s+" | Where-Object { $_ }).Count
  return @{ title=$subj; dek=$open; body=$body; words=$wc }
}

function Slug($t) {
  ($t -replace "[^\w\s-]", "" -replace "\s+","-").ToLower().Trim("-")
}

$schedule = @(
  @{ file="2026-06-03-anduril-fury-cca.md";               pub="2026-06-02 00:00:00+00"; date="2026-06-01"; theme="defense-industrial-base"; tags="ARRAY['defense','industry','procurement','anduril']::text[]" }
  @{ file="2026-06-03-scaling-vs-reasoning.md";           pub="2026-06-03 00:00:00+00"; date="2026-06-02"; theme="frontier-models";          tags="ARRAY['scaling','reasoning','frontier','models']::text[]" }
  @{ file="2026-06-03-xz-utils-backdoor.md";              pub="2026-06-04 00:00:00+00"; date="2026-06-03"; theme="supply-chain-security";    tags="ARRAY['security','xz','supply-chain','open-source']::text[]" }
  @{ file="2026-06-03-salt-typhoon-disclosure.md";        pub="2026-06-05 00:00:00+00"; date="2026-06-04"; theme="nation-state-cyber";       tags="ARRAY['cyber','salt-typhoon','telecom','disclosure']::text[]" }
  @{ file="2026-06-03-the-eighty-thousand-dollar-pdf.md"; pub="2026-06-05 16:00:00+00"; date="2026-06-05"; theme="ai-publishing-economics";  tags="ARRAY['publishing','economics','ai','open-access']::text[]" }
)

$sb = New-Object System.Text.StringBuilder
[void]$sb.Append("BEGIN;`n`n")
foreach ($s in $schedule) {
  $L = ParseLetter (Join-Path $dir $s.file)
  $slug = $s.date + "-" + (Slug $L.title)
  $title = $L.title -replace "'", "''"
  $dek = $L.dek -replace "'", "''"
  [void]$sb.Append("INSERT INTO public.founders_view_posts (slug, title, dek, body_md, voice_tags, theme, word_count, model_used, generation_ms, status, published_at) VALUES (`n")
  [void]$sb.Append("  '" + $slug + "',`n")
  [void]$sb.Append("  '" + $title + "',`n")
  [void]$sb.Append("  '" + $dek + "',`n")
  [void]$sb.Append("  " + $dq + $L.body + $dq + ",`n")
  [void]$sb.Append("  " + $s.tags + ",`n")
  [void]$sb.Append("  '" + $s.theme + "',`n")
  [void]$sb.Append("  " + $L.words + ",`n")
  [void]$sb.Append("  'manual-blend',`n")
  [void]$sb.Append("  0,`n")
  [void]$sb.Append("  'published',`n")
  [void]$sb.Append("  '" + $s.pub + "'`n")
  [void]$sb.Append(");`n`n")
}
[void]$sb.Append("COMMIT;`n")
[System.IO.File]::WriteAllText($out, $sb.ToString(), [System.Text.Encoding]::UTF8)
"Wrote $out ($((Get-Item $out).Length) bytes UTF-8)"
$test = [System.IO.File]::ReadAllText($out, [System.Text.Encoding]::UTF8)
"em-dash count   = " + ([regex]::Matches($test, [char]0x2014).Count)
"mojibake count  = " + ([regex]::Matches($test, "â€”").Count)
"INSERT count    = " + ([regex]::Matches($test, "INSERT INTO").Count)

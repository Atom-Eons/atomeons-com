/**
 * Windows install steps. v1.5.0 ships as a Tauri MSI + NSIS .exe
 * installer — no terminal, no npm. Three steps, ~10 minutes total.
 *
 * Source of truth: 1-INSTALL.txt inside ORANGEBOX-OS-AIO-v1.5.0.zip
 */
export function InstallCommand() {
  const steps = [
    {
      n: "01",
      title: "Install Node.js 20+",
      time: "5 min · once",
      body: "From nodejs.org. Click the LTS button, run the installer, restart Windows.",
    },
    {
      n: "02",
      title: "Run the ORANGEBOX installer",
      time: "2 min",
      body: "Inside the zip, open installer/ — pick ORANGEBOX-Setup_x64.exe (personal) or .msi (corporate). Click through. SmartScreen → More info → Run anyway.",
    },
    {
      n: "03",
      title: "Launch the cockpit",
      time: "10 sec",
      body: "Hit ⊞ Win, type orangebox, press Enter. The cockpit opens. Day-0 demo project pre-loaded.",
    },
  ];
  return (
    <div className="rounded-lg border border-[#204538] bg-[#04100d]">
      <div className="flex items-center justify-between border-b border-[#204538] px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#a7b8ad]">
          ::install · 3 steps · ~10 minutes · no terminal
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#1b8b75]">
          Windows 10 / 11 · x64
        </p>
      </div>
      <ol>
        {steps.map((s) => (
          <li
            key={s.n}
            className="border-b border-[#204538]/40 px-3 py-3 last:border-b-0"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] tracking-widest text-[#1b8b75]">
                {s.n}
              </span>
              <p className="text-sm font-semibold text-[#f7f0e4]">
                {s.title}
              </p>
              <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-[#a7b8ad]">
                {s.time}
              </span>
            </div>
            <p className="mt-1 pl-7 text-xs text-[#a7b8ad]">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="border-t border-[#204538] px-3 py-2 font-mono text-[10px] tracking-tight text-[#a7b8ad]">
        cockpit binds to{" "}
        <span className="text-[#75ff92]">http://127.0.0.1:8787/</span> · runs
        in a Tauri desktop window
      </p>
    </div>
  );
}

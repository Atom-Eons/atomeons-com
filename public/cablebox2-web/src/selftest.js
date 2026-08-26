// THE BROWSER SELF-TEST — `CBX.selftest()` in the console.
//
// The desktop build proves its uptime design in a harness with an injected clock: 115 checks, no
// real decoders, no network, completely deterministic. That harness is the right place for the
// state machine, and the web director is a line-for-line port of the same one.
//
// What a harness CANNOT do is the part that actually failed in CBX1. Real decoders, real HLS, real
// swaps between two live MediaSource pipelines — that is where "the logic is correct" and "the
// viewer sees a picture" come apart, and it is exactly where CBX1's watchdog was looking at the
// wrong thing. So this tests the end-to-end property and nothing else:
//
//     ACROSS EVERY RECOVERY THIS APPLICATION PERFORMS, IS THERE STILL A PICTURE?
//
// THREE THINGS I GOT WRONG WRITING THIS, all of which produced confident nonsense:
//
//   1. Naming a chain. `_b` is not "the protect chain" — after any swap it may be the programme,
//      and killing it tests the opposite of what you meant. Everything here resolves role by
//      IDENTITY at the moment of use, which is the same discipline PlaybackPair itself follows and
//      for the same reason.
//   2. Staging a detour to test the cold-chain guard. Staging fires onPreRoll, which WARMS the
//      very chain the guard is supposed to refuse — so the test warmed its own subject and then
//      reported that the guard had failed to fire. The pre-roll has to be silenced for the
//      duration.
//   3. Sharing state between scenarios. A director left `away` by an earlier case silently
//      declines every splice in the next one, and three assertions fail for one unrelated reason.
//      Every scenario now resets explicitly first.

const wait = ms => new Promise(r => setTimeout(r, ms));

export function install(CBX) {
  CBX.selftest = async function selftest({ verbose = true } = {}) {
    const P = CBX.pair, D = CBX.director;
    const out = [];
    let pass = 0, fail = 0;

    const ck = (label, ok, detail = '') => {
      ok ? pass++ : fail++;
      const line = `[${ok ? 'PASS' : 'FAIL'}] ${label}${detail ? '  -- ' + detail : ''}`;
      out.push(line);
      if (verbose) console.log(line);
    };

    // Role by identity, never by name. See note 1 above.
    const protectChain = () => (P.programVideo === P._a.video ? P._b : P._a);
    const programChain = () => (P.programVideo === P._a.video ? P._a : P._b);
    const anyUrl = () => programChain().url || P._a.url || P._b.url;

    const warmBoth = async (limit = 30000) => {
      let n = 0;
      while (!(P._a.hasPicture && P._b.hasPicture) && n < limit) { await wait(1000); n += 1000; }
      return P._a.hasPicture && P._b.hasPicture;
    };
    const warmProgram = async (limit = 30000) => {
      let n = 0;
      while (P.programVideo.readyState < 2 && n < limit) { await wait(1000); n += 1000; }
      return P.programVideo.readyState >= 2;
    };

    // Put the director back to a known state. See note 3.
    const reset = () => {
      D._away = false;
      D._staged = null;
      D._stagedIsHome = false;
      D._lastSwap = -1e9;
    };

    if (!P || !CBX.channels.length) {
      console.warn('selftest: no dial yet — wait for the guide to load');
      return { pass: 0, fail: 1, log: ['[FAIL] no dial'] };
    }

    // ---- 1. both chains come up ------------------------------------------------------------
    ck('both chains reach a picture', await warmBoth(),
       `A=${P._a.hasPicture} B=${P._b.hasPicture}, ${CBX.channels.length} channels`);

    // ---- 2. failover, twice ----------------------------------------------------------------
    // Twice on purpose. A stored role works exactly once and then silently recovers into the
    // wrong element, which is the worst failure mode there is — it looks fixed.
    for (const round of [1, 2]) {
      reset();
      P.preroll(anyUrl());
      const warm = await warmBoth();
      const from = P.programVideo.id;
      const dying = programChain();
      if (dying.hls) { dying.hls.destroy(); dying.hls = null; }
      dying.video.dispatchEvent(new Event('error'));
      await wait(1200);
      ck(`failover #${round} cuts to the warm chain`, warm && P.programVideo.id !== from,
         `${from} -> ${P.programVideo.id}`);
      ck(`failover #${round} left a picture on screen`,
         P.programVideo.readyState >= 2 && !P.programVideo.paused,
         `readyState ${P.programVideo.readyState}, paused ${P.programVideo.paused}`);
    }

    // ---- 3. the cold-chain guard ------------------------------------------------------------
    reset();
    P.tune(anyUrl());
    await warmProgram();
    const realPreRoll = D.onPreRoll;
    D.onPreRoll = () => {};                    // see note 2: keep the replacement genuinely cold
    protectChain().stop();
    await wait(600);

    const cold = {
      dSwaps: D.swapCount, pSwaps: P.swapCount,
      abandons: D.abandonCount, program: P.programVideo.id,
    };
    ck('the replacement really is cold', P.protectHasPicture === false,
       `protectHasPicture=${P.protectHasPicture}`);

    D.spliceIncoming(8, CBX.channels);
    ck('the splice staged a detour', D._staged != null, `staged ${D._staged?.number}`);
    await wait(12000);                          // well past the 7.4 s cut deadline

    ck('a cold replacement is never cut to',
       D.swapCount === cold.dSwaps && P.swapCount === cold.pSwaps && P.programVideo.id === cold.program,
       `director ${cold.dSwaps}->${D.swapCount}, pair ${cold.pSwaps}->${P.swapCount}`);
    ck('the cold detour is abandoned, not queued',
       D.abandonCount === cold.abandons + 1 && !D.away,
       `abandons ${cold.abandons}->${D.abandonCount}, away ${D.away}`);
    ck('the viewer keeps their picture',
       P.programVideo.readyState >= 2 && !P.programVideo.paused,
       `readyState ${P.programVideo.readyState} — an advertisement beats a black screen`);

    // ---- 4. and the guard is a readiness check, not a veto -----------------------------------
    D.onPreRoll = realPreRoll;
    reset();
    P.preroll(anyUrl());
    let n = 0;
    while (!P.protectHasPicture && n < 30000) { await wait(1000); n += 1000; }
    ck('the protect chain re-warms', P.protectHasPicture === true);

    const warmCase = { dSwaps: D.swapCount, program: P.programVideo.id };
    D.spliceIncoming(8, CBX.channels);
    await wait(12000);
    ck('a warm replacement still cuts',
       D.swapCount === warmCase.dSwaps + 1 && P.programVideo.id !== warmCase.program,
       `director ${warmCase.dSwaps}->${D.swapCount}, ${warmCase.program}->${P.programVideo.id}`);
    ck('the director cut was not black either', P.programVideo.readyState >= 2,
       `readyState ${P.programVideo.readyState}`);

    // Leave the box as we found it: watching something, not stranded on a detour.
    reset();
    P.tune(anyUrl());

    const verdict = fail === 0 ? `ALL ${pass} CHECKS PASS` : `${fail} FAILED of ${pass + fail}`;
    console.log(`\n  ${verdict}`);
    return { pass, fail, log: out };
  };
}

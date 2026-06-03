# AtomEons cyber career-track · 6-letter drip series

Each block below is a Loops.so drip step. Paste into Loops dashboard →
Loops → New Loop → trigger on `cyberSubscribed` event. The /api/cyber/subscribe
route fires that event automatically when a subscriber signs up at
/learn/cyber/start.

---


# WEEK: 1
# SUBJECT: The path is real. The shortcuts aren't.
# PREVIEW: 6 stages. Years, not weekends. Here's the map.

You signed up because you want to work in cyber. Good. Most paths into this field are sold as 12-week bootcamps and certificate stacks. That's not the path. The path takes years, not weekends, and the people who actually do this work all walked something like the six stages below.

Here is the map: [atomeons.com/learn/cyber/path](https://atomeons.com/learn/cyber/path)

**The six stages, plainly stated:**

1. **Foundations** — networking, operating systems, scripting. The boring layer everyone skips and then fails on.
2. **Defender basics** — log reading, alert triage, what a SOC analyst actually does at 2am.
3. **Offensive literacy** — how attackers think, the kill chain, lab work in isolated VMs.
4. **Specialty pick** — DFIR, red team, AppSec, cloud security, detection engineering. One lane, not all five.
5. **Real reps** — CTFs, home lab, write-ups, contributing to tools, a portfolio that proves the skill.
6. **Job-ready** — resume that survives a hiring manager, interview answers that survive a practitioner, first role.

A realistic timeline from "I know nothing" to "first paid role" is **18 to 36 months** of consistent effort. Some people compress that. Most don't. The ones who do are usually doing 10+ focused hours a week and have a lab running on their kitchen table.

**One thing to do today:** Open [atomeons.com/learn/cyber/path](https://atomeons.com/learn/cyber/path) and read Stage 1 only. Don't skip ahead. Then open a notebook — paper or digital — and write the date at the top. That notebook is your log. Every stage from here, you write what you did, what worked, what broke. The log is the receipt that you actually walked the path.

Next week: how to set up the home lab that everything in Stages 2 and 3 runs on. Free, runs on a laptop, no cloud bill.

One more thing — if you're already partway down this road, reply and tell me where you are. I read every reply. It shapes what I write next.

— Atom McCree · AtomEons Systems Laboratory

---


# WEEK: 2
# SUBJECT: Stop reading. Start breaking things.

# PREVIEW: The 18-month free lab path. In order. No guessing.

You've been at this a week. If you spent it reading roadmaps, that ends today.

The single most common reason people stall in cyber is the same reason people stall at the gym: they study the program instead of running the program. The fix is to put your hands on a keyboard inside a real lab tonight, even if you only have thirty minutes. The goal this week is one completed room. Not five. One.

Here is the order of operations. Do not skip. Do not parallelize. Each rung trains a muscle the next rung assumes you have.

**Rung 1 — TryHackMe (months 0 to 6).** Start with the "Pre Security" and "Introduction to Cyber Security" paths. Free tier is enough. The point is reps in a guided environment where the room tells you what command to try when you get stuck. You are building reflexes — Linux navigation, nmap output reading, web request shapes, basic Windows. Aim for 3 rooms a week. By month 6 you should have the "Complete Beginner" path done.

**Rung 2 — HackTheBox Academy + retired boxes (months 6 to 14).** Switch when TryHackMe starts feeling like it's holding your hand. HTB removes the scaffolding — no hints, no "try this command" hover-text. Use the Academy modules for theory and retired boxes (with writeups available) for practice. The first ten boxes will hurt. That hurt is the curriculum.

**Rung 3 — PortSwigger Web Security Academy (months 14 to 18).** Free. Comprehensive. The best web-app security training that exists at any price. Do it after HTB because by then you'll read a Burp Suite request without flinching.

Total cost over 18 months: $0 if you stay on free tiers, ~$15/mo if you upgrade TryHackMe or HTB for the convenience.

Today's action: pick the rung you belong on (probably Rung 1) and finish one room before you sleep tonight. Full lab map with direct links here: [atomeons.com/learn/cyber/labs](https://atomeons.com/learn/cyber/labs)

Next week: how to take notes so the labs actually compound instead of evaporating.

— Atom McCree · AtomEons Systems Laboratory

---


# WEEK: 3
# SUBJECT: The line that keeps you out of prison

# PREVIEW: CFAA, authorization, and the 7-rule discipline that separates pros from defendants.

Week 3. You've built the lab. You've ranked the certs. Now we draw the line.

Today's one specific thing: read the actual text of 18 U.S.C. § 1030 (the CFAA). Not a summary. The statute itself. Twenty minutes. It is the single most important document in your career, and most working pentesters have never opened it.

The federal Computer Fraud and Abuse Act is the law you will operate next to every single day. It criminalizes accessing a computer "without authorization" or "exceeding authorized access." Those eleven words have ended careers, started prison sentences, and decided which side of the table you sit at for the rest of your life.

Four cases you need to know by name:

**Van Buren v. United States (2021).** A police officer ran a license plate search for personal reasons. The Supreme Court narrowed "exceeds authorized access" to mean accessing files or folders you aren't allowed into — not misusing files you are allowed into. This is the most important CFAA case of the last decade. Read the opinion.

**Kevin Mitnick.** Five years federal, eight months solitary, banned from touching a computer on release. Eventually became one of the most respected security trainers alive. Path back exists. Cost is steep.

**Aaron Swartz.** Downloaded JSTOR academic papers from an MIT closet. Faced 35 years and $1M in fines. Took his own life in 2013. The CFAA charging discretion that broke him is still the law.

**Marcus Hutchins.** Stopped WannaCry. Then arrested for malware he wrote as a teenager. Pled guilty, got time served. Now a working researcher. Past you doesn't have to be future you — but the past doesn't disappear either.

Read the briefings on /learn/cyber/legal. Then the 7-rule discipline — written authorization, scope, kill switch, evidence chain, disclosure, retainer of counsel, no-touch list. Every legitimate engagement has all seven. If any are missing, walk.

Bug bounty programs are explicit authorization in writing. Start there.

Next week: building the body of work that gets you hired without a degree.

— Atom McCree · AtomEons Systems Laboratory

---


# WEEK: 4
# SUBJECT: Who's actually hiring you — federal vs. private
# PREVIEW: Air Force 17X, NSA, Anduril, Palantir — and the clearance trap

Three weeks in. You've got fundamentals, you've got a lab, you've got something to point at. Now the question that matters: who signs the offer.

There are two doors. Most people don't realize the second one exists.

**Door 1 — Federal direct.**

- **Air Force 17X (Cyberspace Operations Officer).** Commissioned route. OTS or ROTC. You run cyber teams; you don't sit at a keyboard pulling alerts. Selection is competitive but not mythical — strong technical background, clean record, ASVAB/AFOQT in band.
- **Army 17C (Cyber Operations Specialist).** Enlisted. The technical track. You'll do the actual work — offensive, defensive, intel support. Pipeline runs ~12 months at Fort Gordon. Highest reenlistment bonuses in the Army for a reason.
- **CISA (Cybersecurity & Infrastructure Security Agency).** Civilian. GS-7 to GS-14 depending on entry. No clearance required to start the application — they sponsor it. They want analysts, hunters, incident responders.
- **NSA Development Programs.** CSDP, CADP, ITDP. Three-year rotational. Top-secret clearance sponsored. They take fresh grads with degrees that aren't even computer science if you can prove the technical chops.

Federal pay is lower than private day one. Federal benefits, pension, and clearance value compound for decades. Do the math past year five before you dismiss it.

**Door 2 — Defense-adjacent private.**

- **Booz Allen.** The classic. Cleared work, govvie clients, fast clearance sponsorship. Often the first private stop after the military.
- **Palantir.** Forward-deployed engineering. Intelligence customers. Pays well, demands a lot.
- **Anduril.** Defense tech, autonomous systems. Hiring aggressively. Will sponsor clearance.
- **Shield AI.** Autonomy at the edge. Smaller, sharper, harder to get into — but if you get in, you get range.

The clearance reality: you do not need one to apply. You need one to start. The company sponsors it. Process takes 6–18 months. **Do not pay anyone who claims they can "get you" a clearance — that's a scam every time.**

**This week, two pages:**

- atomeons.com/learn/cyber/serve — the federal paths broken out by branch, role, and pipeline timeline
- atomeons.com/learn/cyber/employers — the private side, cleared-work employers, what they actually pay

Pick one door. Read it tonight. Next week we wire the application packet.

— Atom McCree · AtomEons Systems Laboratory

---


# WEEK: 5
# SUBJECT: Don't buy the wrong cert

# PREVIEW: A $400 cert can pay better than a $4,000 one. Here's the map.

Atom here.

The cert industry sells fear. They want you to think you need ten certifications stacked on your LinkedIn to get hired. You don't. Most people who buy that stack are broke and still unhired.

Here is the honest 2026 map. The number after each one is what it actually moves on a salary negotiation, based on hiring data I have looked at this year. Not what the vendor claims.

**Security+ ($404, vendor-neutral entry)** — moves you from zero to interview-eligible. Required for most US government contractor entry roles (DoD 8570 IAT II). Worth it ONLY if you are hunting your first SOC analyst seat. Skip if you already have a security job.

**GPEN ($2,499 + $1,899 course, SANS)** — the corporate-pentest cert. Recognized everywhere. Salary lift: real, but the price is brutal. Buy this only if your employer pays.

**OSCP ($1,649, Offensive Security)** — the credibility card for offensive work. Hands-on lab, 24-hour exam. This is the one that gets the interview. Worth every dollar if pentest is your target.

**OSEP ($1,649, advanced OSCP)** — only after OSCP, only if you want red-team work. Evasion, AV bypass, lateral movement. Not for beginners.

**OSWE ($1,649, web exploitation)** — the bug-bounty / appsec specialty. Worth it if you have already done meaningful web hacking. Otherwise the prep eats you alive.

**CISSP ($749, ISC2)** — management cert. 5 years experience required to certify. Salary lift is real once you have it, but it is for the 30-year-old security manager, not the 22-year-old hunter. Do not buy this in year one.

**The trap:** people buy Security+ then CISSP then start studying. Wrong order. CISSP requires real experience. You will fail or you will lie about your experience and one day someone notices.

Today's action: pick ONE cert based on the job posting you actually want. Open three real postings on LinkedIn for that role. Note the certs they list. Buy the cheapest one they share.

The full breakdown with study timelines and which voucher discounts are stackable in 2026 is at **atomeons.com/learn/cyber/certs**.

Next week: the labs and platforms that beat any textbook. HackTheBox, TryHackMe, PortSwigger, and which ones are worth your money.

— Atom McCree · AtomEons Systems Laboratory

---


# WEEK: 6
# SUBJECT: Read the field like an analyst, not a headline

# PREVIEW: Named actors, named defenders, the 60-year arc behind every breach

You finished five weeks. You have a home lab, an IR notebook, a CTI taxonomy, a tool stack you can run cold, and a job-ready resume thread. The last gap is *time*. Most people read security as a stream of disconnected headlines. Analysts read it as one continuous story — named actors, named defenders, a 60-year arc of the same problems mutating.

This week you learn to read the field continuously.

**TODAY: Build your named-actor card deck.**

Open a fresh file: `~/labs/cyber/threat-actors.md`. Pick six current state-aligned groups and write a single index card for each. Three fields only:

- **Aliases** (every vendor names them differently — Mandiant, CrowdStrike, Microsoft, MITRE)
- **TTPs they're known for** (initial access, persistence, exfil pattern)
- **One named incident** with the year and the public report URL

Start with these six because they cover the spread: APT28, APT29, Lazarus, APT41, Sandworm, FIN7. The taxonomy at [atomeons.com/learn/cyber/threat-actors](https://atomeons.com/learn/cyber/threat-actors) has the alias cross-walk and the primary-source links. Don't paraphrase vendor blogs — link the actual incident reports. Mandiant M-Trends. CISA advisories. The DOJ indictments when they exist (the indictments name the operators).

**This week: Add the defenders.**

Actors get the headlines. The people who built the field you're now entering rarely do. Read the six profiles at [atomeons.com/learn/cyber/heroes](https://atomeons.com/learn/cyber/heroes) — pick the one whose work most overlaps the path you're heading toward (IR, malware reverse, threat intel, network defense, policy) and read one primary source they wrote. Not a profile *about* them. Something they wrote themselves. That's how the field actually transmits.

**The 60-year arc.**

Skim [atomeons.com/learn/cyber/timeline](https://atomeons.com/learn/cyber/timeline) — Morris worm 1988, Stuxnet 2010, Mirai 2016, SolarWinds 2020, MOVEit 2023. Notice the pattern: every era's "novel" attack is the previous era's known problem at new scale. Air-gap bypass. Supply chain. IoT botnets. Identity compromise. You are not entering a new field. You are entering an old one that keeps getting bigger.

That's the loop. Read actors. Read defenders. Read the timeline. Repeat weekly. The headlines will stop being noise and start being data points on graphs you already have in your head.

You're done with the drip. The lab, the notebook, the resume, the field — they're yours now. Go work.

— Atom McCree · AtomEons Systems Laboratory

---

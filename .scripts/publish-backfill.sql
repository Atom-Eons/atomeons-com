BEGIN;

INSERT INTO public.founders_view_posts (slug, title, dek, body_md, voice_tags, theme, word_count, model_used, generation_ms, status, published_at) VALUES (
  '2026-06-01-anduril-fury-and-the-death-of-cost-plus-defense',
  'Anduril Fury And The Death Of Cost-Plus Defense',
  'Two years ago the Air Force handed a $6B contract to a company that ships software like consumer hardware.',
  $body_md$In April 2024 the Air Force picked Anduril and General Atomics to build the first increment of the Collaborative Combat Aircraft program — autonomous drone wingmen designed to fly alongside F-35s and the still-vaporware NGAD. Boeing was eliminated. Lockheed was eliminated. Northrop was eliminated. The two finalists were a company founded in 2017 by the Oculus guy and a company that mostly builds Reapers in the desert.

Two years later, Anduril's CCA — designated YFQ-44A Fury — has flown. Increment 2 selection is now in front of the Air Force, the FY2026 budget request asks for production funding, and the program is, by Pentagon standards, on schedule. The schedule itself is the news. The traditional primes are the people who taught the Pentagon what "on schedule" means, and that definition has been a euphemism for two decades.

Here is the structural part. The CCA contract was awarded as a fixed-price development effort with company capital on the line, not the cost-plus framework that has defined every major aircraft program from the F-22 to the KC-46 to the B-21. Cost-plus means the government reimburses the contractor's costs and adds a fee. The contractor's incentive, encoded directly into the math, is to have more costs. The F-35 program cost over $400B to develop and is projected to cost $2T to operate over its lifetime. The KC-46 tanker is eight years late and Boeing has taken over $7B in losses on it because Boeing, exceptionally, agreed to fixed-price and discovered what fixed-price actually means when your supply chain is the same supply chain that produced the F-35's helmet-mounted display.

Anduril's pitch was not patriotism. It was that they would build the airplane the way Tesla builds cars and SpaceX builds rockets — vertically integrated, software-first, manufacturing-aware from day one, and priced as a product instead of a procurement. Their Arsenal-1 factory in Columbus, Ohio is being built to produce 5,000 autonomous systems per year. That is not an aerospace number. That is a consumer electronics number applied to a domain that has, for forty years, treated single-digit production runs as normal.

The fair counter-argument: Anduril has not yet delivered combat-capable aircraft at scale. Fury has flown. Fury has not gone to war. The primes have actually-existing F-35s in actually-existing squadrons, and the YFQ-44A is, today, a flight-test article with a thirty-month timeline to initial operational capability. The bet could still go wrong. Software-defined warfare has a habit of meeting the cratered runway of reality.

But the bet has already done something. It has forced the existing primes to write white papers about "digital engineering" and "model-based systems engineering" and other phrases that are now uttered with the desperation of a tenured professor learning what TikTok is. Lockheed's NGAD bid was reportedly priced at a level that suggested the company finally understood it was no longer the only adult in the room. Boeing has restructured its defense unit twice in the last 18 months.

The lesson is not that Anduril is good. The lesson is that an industry which spent forty years arguing that aerospace is fundamentally different from every other engineering discipline turned out to be wrong about that, and the proof was a 2017 startup, two governors of West Virginia and Ohio fighting over the factory, and one airplane that flew on schedule.

Cost-plus is not a contracting mechanism. It is a worldview. The worldview is dying. The replacement is product.

Until tomorrow.$body_md$,
  ARRAY['defense','industry','procurement','anduril']::text[],
  'defense-industrial-base',
  571,
  'manual-blend',
  0,
  'published',
  '2026-06-02 00:00:00+00'
);

INSERT INTO public.founders_view_posts (slug, title, dek, body_md, voice_tags, theme, word_count, model_used, generation_ms, status, published_at) VALUES (
  '2026-06-02-the-scaling-curve-bent-and-nobody-wanted-to-say-it',
  'The Scaling Curve Bent And Nobody Wanted To Say It',
  'For five years the religion was simple — more parameters, more tokens, more compute, more god.',
  $body_md$The high priests had a chart. You have seen it. Loss on the y-axis, compute on the x-axis, a clean diagonal sloping down and to the right, presented at every keynote like a Gregorian chant. Kaplan 2020. Hoffmann 2022. The Chinchilla scaling laws sat on the altar and the offerings were Nvidia revenue. Build bigger. Train longer. Wait for emergence. The future was a budget line, and the budget line had no ceiling.

Then somewhere between GPT-4 and the trillion-parameter rumors, the curve started bending the wrong way. Insiders saw it before the public did. Each new base model cost more and delivered less marginal lift. The exponential capability gains of 2020-2023 quietly became sublinear by mid-2024. Sam Altman, who had spent two years on stages saying we had not yet seen diminishing returns, stopped saying that. Dario Amodei stopped saying it. The Information ran the leak: GPT-5's training run was not producing the jump the company had promised investors. The Orion codename became a quiet word.

Then OpenAI's o1 shipped, and o3 after it, and the whole liturgy got rewritten in a quarter. The new gospel: do not scale the model, scale the thinking. Give the network minutes instead of milliseconds. Let it reason in a private scratchpad. Let it search, backtrack, verify, reconsider. Pay for cognition by the second, not by the parameter. Inference-time compute became the new training compute. DeepSeek-R1, shipped open-weights from Hangzhou for a fraction of OpenAI's spend, made the point unignorable: a small model that thinks for ten minutes can beat a giant model that thinks for ten seconds.

This is not a small rotation. It is the field admitting, without quite admitting, that the bitter lesson had a second clause nobody had read carefully. Scale wins, yes — but the scale that wins is the scale of search at test time, not just the scale of weights at train time. AlphaGo did not beat Lee Sedol by being bigger. It beat him by thinking longer with Monte Carlo rollouts. The lesson was sitting in plain sight since 2016 and the entire LLM industry charged past it for half a decade, because thinking-longer does not sell H100s the way bigger-models does.

The corporate consequences are already moving. Nvidia's narrative has a small but real crack in it: inference compute is more elastic, more distributable, less monopolizable than training compute. Meta's open-weights bet looks smarter overnight. Anthropic's long-thinking modes, Google's deep-research lanes, OpenAI's pro tier — all of them are now metered by tokens-of-thought rather than parameters-of-model. The unit economics of intelligence rotated ninety degrees and the analyst class is still catching up.

The political consequences are messier. Export controls were calibrated to training compute — to the H100s and B200s sailing on container ships to nowhere. If inference is where the gains now live, the controls are aimed at last war's choke point. DeepSeek's R1 release was, among other things, a quiet message that the chokehold leaks. A few thousand smuggled chips and a clever RL recipe and the gap closes in a quarter, not a decade.

The honest read: scaling is not dead. Bigger base models still help. But the easy decade is over. The era when you could promise a board "we will 10x by spending 10x" has been replaced by an era where you have to actually design the reasoning, shape the reward, build the verifier, run the search. Less religion. More engineering. Less faith in a slope. More respect for the problem.

The chart bent. The chart-makers will write new charts.

Until tomorrow.$body_md$,
  ARRAY['scaling','reasoning','frontier','models']::text[],
  'frontier-models',
  593,
  'manual-blend',
  0,
  'published',
  '2026-06-03 00:00:00+00'
);

INSERT INTO public.founders_view_posts (slug, title, dek, body_md, voice_tags, theme, word_count, model_used, generation_ms, status, published_at) VALUES (
  '2026-06-03-the-backdoor-that-almost-ate-the-world',
  'The backdoor that almost ate the world',
  'A bored Microsoft engineer benchmarking SSH found the trojan that would have rooted half the planet.',
  $body_md$In March 2024, Andres Freund — a Postgres developer at Microsoft, running a routine micro-benchmark — noticed that an SSH login on his Debian sid box was taking about half a second longer than it should. Half a second. Most engineers would have shrugged, blamed the network, gone to lunch. Freund pulled the thread.

What he found, the world has now confirmed: CVE-2024-3094. A malicious payload smuggled into liblzma — a dependency of OpenSSH on nearly every Linux distribution on Earth — that would have let a single private key holder remote-code-execute as root on essentially every internet-connected Linux server. Cloud providers. Banks. Hospitals. Power grids. The plumbing.

The vector was not a zero-day. It was a person. A contributor named "Jia Tan" — a sock-puppet identity, almost certainly a state-grade operation — spent two and a half years building trust in the XZ Utils project. Polite PRs. Helpful patches. Showing up when nobody else would. The original maintainer, Lasse Collin, was burned out, stressed, dealing with personal life, and being publicly pressured by other sock-puppet accounts ("Jigar Kumar," "Dennis Ens") to hand over more responsibility. He did. The trojan was committed by the new "co-maintainer" he was guilted into trusting.

It shipped into Fedora 41, Debian sid, openSUSE Tumbleweed, Kali, and was hours from rolling into the next Ubuntu LTS. The intended detonation surface was every long-term-support Linux deployment on Earth for the next half-decade.

This is the indictment, and it is bipartisan across politics, corporate, and technology:

The political indictment. Western governments spent the 2020s holding hearings on TikTok dance videos while the actual backbone of every government cloud workload, every defense contractor build farm, every hospital records system, ran on a compression utility maintained — for free, on weekends, with no funding — by a single exhausted man in Finland. Congress could not name the package. Neither could the EU. Neither could China, by the way; this fell on everyone equally.

The corporate indictment. Trillion-dollar companies — Amazon, Google, Microsoft, Oracle, Meta — ship XZ in their products. Their stock prices depend on it not being backdoored. Their contribution to its maintenance, in aggregate, prior to the incident, was approximately zero dollars and zero engineering hours. Lasse Collin was being load-bearing for the modern economy on a hobbyist's schedule, and the modern economy was fine with that until it almost wasn't.

The technology indictment. The open-source ecosystem has a romantic mythology — "given enough eyeballs, all bugs are shallow." The eyeballs were not there. The hostile contributor was building obfuscated test-fixture binaries containing the payload, in plain view, for years. No code review caught it. No CI caught it. No fuzzer caught it. The thing that caught it was one engineer's irritation at a 500-millisecond latency anomaly. That is not a system. That is luck.

The lesson is not "open source is broken." Closed source would have been worse — at least we can now read every line of the attack. The lesson is that the substrate of modern civilization is being held up by volunteers, and the people who profit from that substrate have, for a quarter century, declined to fund it. Sovereign Tech Fund's nine-million-euro pledge to upstream maintainers, announced after the incident, is roughly what Meta spends on lunch.

Freund found it by accident. The next one, we will not.

Until tomorrow.$body_md$,
  ARRAY['security','xz','supply-chain','open-source']::text[],
  'supply-chain-security',
  558,
  'manual-blend',
  0,
  'published',
  '2026-06-04 00:00:00+00'
);

INSERT INTO public.founders_view_posts (slug, title, dek, body_md, voice_tags, theme, word_count, model_used, generation_ms, status, published_at) VALUES (
  '2026-06-04-the-wiretap-room-had-a-second-door',
  'The wiretap room had a second door',
  'For thirty years, "lawful intercept" was the polite name for the back door we built into every American phone call.',
  $body_md$The compromise has a name now. Salt Typhoon. It is the cluster CISA, the FBI, and ODNI have attributed — with confidence levels that career officials do not throw around lightly — to a People's Republic of China state-sponsored actor. The compromise is not a breach in the casual sense. It is presence. Inside Verizon. Inside AT&T. Inside Lumen. Inside the systems carriers built, under federal mandate, to make every conversation a court order away from a transcript.

Read the disclosure language carefully. The intruders had access to the lawful-intercept apparatus itself — the same plumbing the Department of Justice and the FBI use to wiretap criminal suspects under Title III, the same plumbing FISA orders flow through, the same plumbing that, by statute, every common carrier in the United States must maintain under the Communications Assistance for Law Enforcement Act of 1994. CALEA. The 1994 bargain. Build the door. We'll keep the key safe.

The key was not safe. The key was, by all available indication, copied.

CISA's joint advisory and the subsequent guidance from Easterly's successor framed the campaign as cyber espionage. That framing is incomplete and the agencies know it is incomplete. The behavior on the wire — persistence in routing infrastructure, mapping of regional power and water control adjacencies, dwell time inside operational telemetry systems that have nothing to do with diplomatic cables or campaign emails — that behavior is not espionage. Espionage exfiltrates. Pre-positioning waits. The Volt Typhoon disclosures last year described the same pattern in water and energy. Salt Typhoon extended it into the carrier core. The two clusters share tradecraft, share infrastructure, and in some reporting share operators. The agencies' own threat assessment, reluctantly delivered to the Senate Intelligence Committee, used the phrase "disruptive intent in the event of a Taiwan contingency." That is not a wiretap. That is a kill switch with patience.

The political response has been the usual choreography. Senate Republicans want a hearing. Senate Democrats want a hearing. The White House wants a working group. Industry wants liability protection. The carriers want the public to stop asking which calls. The carriers will not say which calls. The carriers have been told, by counsel, not to say which calls. Federal officials who would normally leak have not leaked, which is itself a signal — the contents are sensitive enough that the usual valves are welded shut.

There is a corporate dimension that deserves equal indignation. The lawful-intercept gateways at issue were not built last year. They were built, certified, and sold to carriers by a small handful of vendors — and the security posture of those gateways was, by multiple independent assessments going back to a 2010 IEEE paper by Bellovin, Blaze, Clark, and Landau, structurally fragile. The vulnerabilities were named. The vendors shipped anyway. The carriers deployed anyway. The FCC certified anyway. The bill arrived in 2024.

The technology framing is the cleanest of the three. A communications system designed to be intercepted by one party is, by the laws of cryptography and not the laws of Congress, a communications system designed to be intercepted by any party with sufficient access. There is no key that is exclusively for the good guys. There never was. The agencies that lobbied against end-to-end encryption for thirty years on the grounds that lawful access must be preserved now find themselves explaining to the Senate why the lawful-access apparatus is, at present, a foreign asset.

The disclosure changes what citizens are allowed to know about what was done to them. It does not change what was done to them. Treat the next pronouncement about encryption backdoors accordingly.

Until tomorrow.$body_md$,
  ARRAY['cyber','salt-typhoon','telecom','disclosure']::text[],
  'nation-state-cyber',
  606,
  'manual-blend',
  0,
  'published',
  '2026-06-05 00:00:00+00'
);

INSERT INTO public.founders_view_posts (slug, title, dek, body_md, voice_tags, theme, word_count, model_used, generation_ms, status, published_at) VALUES (
  '2026-06-05-the-eighty-thousand-dollar-pdf-and-the-free-one',
  'The eighty-thousand-dollar PDF and the free one',
  'A child born this week will be quoted $416,000 for a Bachelor of Science by the time she''s eighteen.',
  $body_md$Let's start with the receipt, because everything else in this letter is downstream of it.

MIT's published cost of attendance for 2025–2026 is $87,640. Tuition is $63,940. Add housing, dining, books, insurance, and "personal expenses," and a four-year sticker lands near $350,000. Stanford lists $92,892. Columbia's College of Engineering posted $93,468. The University of Southern California cleared $95,000 last fall. These are not outliers. They are the median for the institutions that print the credentials American hiring managers still treat as load-bearing. The Class of 2029 will, by graduation, be the first cohort to cross $400,000 in total cost at a top-twenty private university. None of those numbers include interest on the loans the median family will need to cover roughly 60% of them.

Now the other receipt.

Khan Academy, founded 2008, charges $0. Its calculus sequence is the same calculus sequence. MIT OpenCourseWare has been free since 2002 — twenty-four years of the actual MIT lectures, problem sets, and exams, posted by MIT, with MIT's blessing, costing the user nothing but bandwidth. Stripe Press sells hardcover editions of canonical engineering and economics texts at roughly the price of a sandwich and ships the PDF gratis. arXiv hosts 2.4 million preprints, free. Anthropic publishes Claude's system card free. OpenAI publishes evals free. Hugging Face hosts more state-of-the-art model weights than any university library, free. A self-directed seventeen-year-old with a $200 used Chromebook and a public library Wi-Fi signal has, today, access to a strictly larger and more current technical corpus than any matriculated MIT freshman did in 2005.

The gap between the two prices — the $87,640 and the $0 — is not a tuition gap. It is a credential gap. What the family is buying is not the calculus. The calculus is free. What the family is buying is the signature of a credentialing body on a piece of cardstock that hiring committees still treat as a permission slip. The credential is the product. The education has been a bundled giveaway since 2002 and the bundle was severed by AI in 2023.

The institutional response so far has been to charge more.

Harvard's endowment grew to $53.2 billion this past fiscal year. Yale's to $40.7 billion. Stanford's to $36.5 billion. Each could, on the math, run their undergraduate program in perpetuity from endowment yield alone and refund every tuition dollar collected since 1990. None will. The endowment is treated as a fortress to defend, not a fund to deploy, because the credential's scarcity is the asset, and the asset only stays scarce if the price stays high. A free Harvard degree devalues every Harvard degree already issued. So the price goes up, and the seventeen-year-old with the Chromebook gets told her self-taught machine learning portfolio is "non-traditional."

Meanwhile the gatekeeping is migrating. The bar exam now permits AI tools in twenty-two states. The CFA Institute is piloting AI-assisted assessment. GitHub's hiring funnels read your commits before they read your school. The credential is losing its grip on the hiring committee faster than the tuition is losing its grip on the family. The crossing point is somewhere inside this decade.

The honest sentence is this. We have, in 2026, the largest gap in human history between what knowledge costs to acquire and what its credential costs to certify. The acquisition cost has fallen to zero. The certification cost has risen to a third of a million dollars. Anyone who pretends that gap is a market signal rather than a rent is selling something — usually a degree.

Until tomorrow.$body_md$,
  ARRAY['publishing','economics','ai','open-access']::text[],
  'ai-publishing-economics',
  589,
  'manual-blend',
  0,
  'published',
  '2026-06-05 16:00:00+00'
);

COMMIT;

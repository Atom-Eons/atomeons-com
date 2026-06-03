# SLUG: 2026-06-03-xz-utils-backdoor

# SUBJECT: The backdoor that almost ate the world

# OPENING: A bored Microsoft engineer benchmarking SSH found the trojan that would have rooted half the planet.

In March 2024, Andres Freund — a Postgres developer at Microsoft, running a routine micro-benchmark — noticed that an SSH login on his Debian sid box was taking about half a second longer than it should. Half a second. Most engineers would have shrugged, blamed the network, gone to lunch. Freund pulled the thread.

What he found, the world has now confirmed: CVE-2024-3094. A malicious payload smuggled into liblzma — a dependency of OpenSSH on nearly every Linux distribution on Earth — that would have let a single private key holder remote-code-execute as root on essentially every internet-connected Linux server. Cloud providers. Banks. Hospitals. Power grids. The plumbing.

The vector was not a zero-day. It was a person. A contributor named "Jia Tan" — a sock-puppet identity, almost certainly a state-grade operation — spent two and a half years building trust in the XZ Utils project. Polite PRs. Helpful patches. Showing up when nobody else would. The original maintainer, Lasse Collin, was burned out, stressed, dealing with personal life, and being publicly pressured by other sock-puppet accounts ("Jigar Kumar," "Dennis Ens") to hand over more responsibility. He did. The trojan was committed by the new "co-maintainer" he was guilted into trusting.

It shipped into Fedora 41, Debian sid, openSUSE Tumbleweed, Kali, and was hours from rolling into the next Ubuntu LTS. The intended detonation surface was every long-term-support Linux deployment on Earth for the next half-decade.

This is the indictment, and it is bipartisan across politics, corporate, and technology:

The political indictment. Western governments spent the 2020s holding hearings on TikTok dance videos while the actual backbone of every government cloud workload, every defense contractor build farm, every hospital records system, ran on a compression utility maintained — for free, on weekends, with no funding — by a single exhausted man in Finland. Congress could not name the package. Neither could the EU. Neither could China, by the way; this fell on everyone equally.

The corporate indictment. Trillion-dollar companies — Amazon, Google, Microsoft, Oracle, Meta — ship XZ in their products. Their stock prices depend on it not being backdoored. Their contribution to its maintenance, in aggregate, prior to the incident, was approximately zero dollars and zero engineering hours. Lasse Collin was being load-bearing for the modern economy on a hobbyist's schedule, and the modern economy was fine with that until it almost wasn't.

The technology indictment. The open-source ecosystem has a romantic mythology — "given enough eyeballs, all bugs are shallow." The eyeballs were not there. The hostile contributor was building obfuscated test-fixture binaries containing the payload, in plain view, for years. No code review caught it. No CI caught it. No fuzzer caught it. The thing that caught it was one engineer's irritation at a 500-millisecond latency anomaly. That is not a system. That is luck.

The lesson is not "open source is broken." Closed source would have been worse — at least we can now read every line of the attack. The lesson is that the substrate of modern civilization is being held up by volunteers, and the people who profit from that substrate have, for a quarter century, declined to fund it. Sovereign Tech Fund's nine-million-euro pledge to upstream maintainers, announced after the incident, is roughly what Meta spends on lunch.

Freund found it by accident. The next one, we will not.

Until tomorrow.

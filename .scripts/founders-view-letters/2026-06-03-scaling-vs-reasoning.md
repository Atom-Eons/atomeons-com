# SLUG: 2026-06-03-scaling-vs-reasoning
# SUBJECT: The Scaling Curve Bent And Nobody Wanted To Say It
# OPENING: For five years the religion was simple — more parameters, more tokens, more compute, more god.

The high priests had a chart. You have seen it. Loss on the y-axis, compute on the x-axis, a clean diagonal sloping down and to the right, presented at every keynote like a Gregorian chant. Kaplan 2020. Hoffmann 2022. The Chinchilla scaling laws sat on the altar and the offerings were Nvidia revenue. Build bigger. Train longer. Wait for emergence. The future was a budget line, and the budget line had no ceiling.

Then somewhere between GPT-4 and the trillion-parameter rumors, the curve started bending the wrong way. Insiders saw it before the public did. Each new base model cost more and delivered less marginal lift. The exponential capability gains of 2020-2023 quietly became sublinear by mid-2024. Sam Altman, who had spent two years on stages saying we had not yet seen diminishing returns, stopped saying that. Dario Amodei stopped saying it. The Information ran the leak: GPT-5's training run was not producing the jump the company had promised investors. The Orion codename became a quiet word.

Then OpenAI's o1 shipped, and o3 after it, and the whole liturgy got rewritten in a quarter. The new gospel: do not scale the model, scale the thinking. Give the network minutes instead of milliseconds. Let it reason in a private scratchpad. Let it search, backtrack, verify, reconsider. Pay for cognition by the second, not by the parameter. Inference-time compute became the new training compute. DeepSeek-R1, shipped open-weights from Hangzhou for a fraction of OpenAI's spend, made the point unignorable: a small model that thinks for ten minutes can beat a giant model that thinks for ten seconds.

This is not a small rotation. It is the field admitting, without quite admitting, that the bitter lesson had a second clause nobody had read carefully. Scale wins, yes — but the scale that wins is the scale of search at test time, not just the scale of weights at train time. AlphaGo did not beat Lee Sedol by being bigger. It beat him by thinking longer with Monte Carlo rollouts. The lesson was sitting in plain sight since 2016 and the entire LLM industry charged past it for half a decade, because thinking-longer does not sell H100s the way bigger-models does.

The corporate consequences are already moving. Nvidia's narrative has a small but real crack in it: inference compute is more elastic, more distributable, less monopolizable than training compute. Meta's open-weights bet looks smarter overnight. Anthropic's long-thinking modes, Google's deep-research lanes, OpenAI's pro tier — all of them are now metered by tokens-of-thought rather than parameters-of-model. The unit economics of intelligence rotated ninety degrees and the analyst class is still catching up.

The political consequences are messier. Export controls were calibrated to training compute — to the H100s and B200s sailing on container ships to nowhere. If inference is where the gains now live, the controls are aimed at last war's choke point. DeepSeek's R1 release was, among other things, a quiet message that the chokehold leaks. A few thousand smuggled chips and a clever RL recipe and the gap closes in a quarter, not a decade.

The honest read: scaling is not dead. Bigger base models still help. But the easy decade is over. The era when you could promise a board "we will 10x by spending 10x" has been replaced by an era where you have to actually design the reasoning, shape the reward, build the verifier, run the search. Less religion. More engineering. Less faith in a slope. More respect for the problem.

The chart bent. The chart-makers will write new charts.

Until tomorrow.

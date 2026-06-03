# AtomEons ad pipeline · operator-directed 2026-06-03

Two ads in production. Concept 1 (One Operator) deferred per operator call.

---

## Concept 3 · "Variable-Weight Reveal" — homepage hero

**Duration:** 6 seconds
**Placement:** above-the-fold homepage at atomeons.com/ — autoplay (muted) loop, replaces or sits behind the static photo mosaic when JS is enabled
**Audio:** none (pure typography, plays the existing ambient signature in the background)
**Aspect:** 16:9 · render at 1920×1080 minimum
**File:** save as `public/video/homepage-reveal.mp4`

### Veo prompt (paste into Google AI Studio · Veo 3)

```
Pure black background. Centered single-line serif text in white:
"An independent lab building the AI the public actually needs."
Over 6 seconds the text animates its font weight from very thin
(weight 100) to very heavy (weight 900) while the letter-spacing
tightens from 0.04em down to -0.04em. Smooth continuous
interpolation, no jump-cuts. The camera does not move. No other
elements on screen. No logos. No animation other than the font
axis change. 6 seconds. 24fps. 1920x1080. Premium typography reel
aesthetic. Inspired by Inter Variable font axis demos.
```

**Fallback if Veo can't do the typography axis animation:**

Render the same effect with CSS — we already have the
`v3-hero-h1` Variable-Weight Reveal hook in `app/page.tsx`. The
ad becomes a screen recording of the actual homepage scrolling
through its hero. Six seconds, no audio.

---

## Concept 2 · "What Cyberwar Looks Like" — /learn/cyber hero

**Duration:** 12 seconds (5 cuts × ~2.4s each, with 0.6s crossfades)
**Placement:** /learn/cyber hero — autoplay loop, with the brian-voice
  voiceover layered on top
**Audio:** `public/audio/cyber-narration.mp3` (ElevenLabs Brian, 12s, 5 sentences)
**Aspect:** 16:9 · render at 1920×1080 minimum
**File:** save as `public/video/cyber-montage.mp4`

### Voiceover (ElevenLabs Brian · already generated)

> "Drones replaced artillery. Fiber cables are battlefield. Critical
> infrastructure is on the line. This is what cyber war actually
> looks like in 2026. The field needs more defenders than it has."

### Five Veo cuts (generate each, then edit together with 0.6s crossfades)

**CUT 1 · 2.4s · "Drones replaced artillery."**
```
Cinematic 35mm anamorphic top-down shot. A single small matte-black
quadcopter drone hovers low above a thick fog bank at dawn. Distant
industrial silhouettes barely visible below. No humans, no readable
markings, no logos. Cold blue-grey palette with a single bio-cyan
status LED glowing on the drone. Slow descent motion. 2.4 seconds.
1920x1080. Press-photo grade.
```

**CUT 2 · 2.4s · "Fiber cables are battlefield."**
```
Cinematic underwater photograph. A single thick black undersea
fiber-optic cable rises from dark cold water at night, water droplets
running down its surface. Deep navy-black horizon visible above the
waterline. A faint bio-cyan rim light catches the cable. No boats,
no hands, no humans, no logos. Slow vertical rise motion. 2.4
seconds. 1920x1080. Press-photo grade.
```

**CUT 3 · 2.4s · "Critical infrastructure is on the line."**
```
Cinematic architectural shot. An empty dark cybersecurity operations
center seen from above. Rows of dark monitors with their screens off.
A single bio-cyan status light glows on one terminal in the distance.
Slow pan from left to right. No people, no readable text on any screen,
no logos. Deep blacks. 2.4 seconds. 1920x1080. Anduril press-photography
aesthetic.
```

**CUT 4 · 2.4s · "This is what cyber war actually looks like in 2026."**
```
Cinematic macro shot. Looking straight up at a dense server rack
ceiling, parallel rows of dark equipment receding to vanishing point.
A single LED pulses bio-cyan in the center distance. Slow upward
camera tilt. No people, no readable text, no logos. Cool overhead
lighting, deep blacks. 2.4 seconds. 1920x1080.
```

**CUT 5 · 2.4s · "The field needs more defenders than it has."**
```
Cinematic press photograph. A dark brutalist federal-style courthouse
or capitol building silhouetted against a blue-hour overcast sky.
A single small window glows bio-cyan in the building's facade. Slow
push-in camera move. No people, no readable signage, no flags, no
logos. Sober institutional tone. 2.4 seconds. 1920x1080.
```

### Editing notes

- Sequence cuts in the order above
- 0.6-second crossfades between each
- Voiceover (Brian, ElevenLabs) starts at 0.0s, ends ~11.5s
- Total runtime: ~12 seconds
- Last frame: hold the courthouse shot, white serif type fades up centered:
  *"atomeons.com/learn/cyber"*
- Export as `cyber-montage.mp4` H.264 + AAC, 1920×1080, 24fps

---

## How to ship once Veo output lands

1. Drop `homepage-reveal.mp4` into `public/video/`
2. Drop `cyber-montage.mp4` into `public/video/`
3. Run: `npx next build` to verify
4. The `HeroVideo` and `CyberMontage` components (in `app/_components/`) auto-pick up the files
5. Commit + push + Vercel auto-deploy

## Concept 1 deferred

"One Operator" was deferred by operator call this session. Storyboard
preserved in this file for future production:

```
8-second cinematic 35mm anamorphic slow dolly-in shot.
Empty matte-black wooden desk at night. A single closed black
laptop sits centered. A single bio-cyan rim light along one edge
of the laptop. A faint warm amber lamp glow comes from off-frame.
Dust particles drift through the shaft of light. No people, no
readable text, no logos. Deep blacks. 8 seconds. 1920x1080.

Voiceover (ElevenLabs Brian or Daniel, 4 seconds):
"Built in Marco Island. One operator. Free."

Last frame: an "Æ" mark in white fades up bottom-right. 2 second hold.
```

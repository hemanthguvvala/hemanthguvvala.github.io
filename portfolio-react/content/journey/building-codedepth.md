---
title: Building CodeDepth: ask early, measure before you fix, compare only with yourself
description: How I built a Java interview site that compiles and runs its own code examples on every deploy — and the four habits it forced on me along the way.
date: 2026-09-12
category: building
tags: [java, nextjs, content, process]
products: [codedepth]
keyTakeaway: Luck decided which of my dependencies survived. Effort decided whether that mattered — and only one of those was ever mine.
---

Search for any Java interview question and you get the same paragraph,
reworded, on forty sites. It is enough to get you through the question. It is
not enough to get you through the *follow-up*, which is where interviews are
actually decided.

**CodeDepth** exists for the follow-up. Every question is answered at three
depths: the 45-second answer you would say out loud, the real mechanism
underneath it, and the questions an interviewer asks next.

This is how it is built, what it is for, and the four things building it kept
teaching me — mostly by making me pay for the lesson twice.

## What it does

Forty-six entries today, across ten tracks — core Java, Spring, databases,
concurrency, DSA, system design, microservices, testing, security, build and
delivery. Each one carries an experience range in its frontmatter, so
`experience: [2, 6]` generates `/java/3-years-experience` automatically. You
are not reading a "Top 100" list; you are reading what someone with your years
gets asked.

Under every entry is a four-tier practice ladder — 134 of them so far.
Five-minute warm-up, twenty-minute challenge, a **real production incident**,
then a ten-minute timed verbal replay. Tier three is the one that matters: the
HashMap ladder hands you code that silently loses writes under concurrent load,
hundreds to a couple of thousand out of sixteen thousand, different on every
run, with no exception thrown anywhere. That nondeterminism *is* the lesson.

And the part I care about most: **every code example is compiled and executed
at build time, and its output diffed against what the page claims.** Stale,
wrong output is the single most common defect on Java content sites. Here it is
not a promise, it is `scripts/verify.js`, and CI refuses to deploy when it
fails.

A reader does not even have to take that on trust. Every runnable example has
an **Edit and run** button that opens it in a browser playground preloaded on
any JDK from 8 to 25 — and the playground carries what the page claims along
with the code, so after a run it tells you whether the claim held.

## The requirement I nearly left for later

The playground is in version one for one reason, written in the plan of record
next to it: **asked for twice.**

I keep a decision log with who asked and how often, because a thing asked for
twice is a real requirement and a thing asked for once is usually a passing
thought. That single note is why the playground shipped early instead of
"someday" — and shipping it early is what made it good.

Here is the part I did not expect. Because the playground was a known
requirement from the start, the whole site could be shaped so that it needs
**no backend at all.** The code travels in the URL *fragment*, which browsers
never transmit. So entry pages ship zero client JavaScript for it — the button
is a plain `<a href>` encoded at build time — share links work forever with
nothing stored anywhere, and nothing a reader types ever reaches CodeDepth.

If that requirement had arrived three months in, none of that would have
happened. I would have bolted an API onto a static site, because by then the
static site would already have been the thing I was protecting. **Requirements
gathered late don't get designs. They get workarounds.**

The same pattern repeated with a question I was asked about the site's future:
*everything is hardcoded — if I stop having a strong model to help me write, or
I want to author from the website itself, what happens?* I wrote the answer
down as a decision document before building anything, and the answer turned out
to be that the premise was half wrong. Content had been separate from code
since the first commit: 46 content entries, one `.mdx` file touched to add one,
and no entry prose living inside a component. The real gap was that there is no
authoring *interface* — a much smaller and much later problem than the one I
was being asked about.

I would never have known that if I had started building a CMS instead of
answering the question first.

## I guessed twice, then measured

`npm run build` runs verification first. Verification got slow. Editing one
line of YAML cost fourteen minutes.

I diagnosed it twice, from estimates, and was wrong both times in opposite
directions. The first estimate timed `javac` while a Next build was running in
the background and got 1.2 seconds per call. The second benchmarked `javac` on
a one-line file, got 259ms, and concluded that compilation could only account
for about 75 seconds of a 448-second run — so something else must dominate.

Then I instrumented it properly and took one clean cold run with nothing else
competing for the machine:

```text
448.6s total
  381.1s  85%  javac — 317 calls, 1202ms each
   62.5s  14%  java  — 249 calls,  251ms each
slowest single check: 4.7s
```

`javac` is 85% of it, and the distribution is flat. No single slow demo. It is
317 process startups. The toy benchmark understated the cost by 5x because
`javac` on one line costs 259ms, while `javac` on a real generated source — 96
lines on average, an import preamble plus the entry's test harness — costs
1227ms.

And almost none of that is compilation. The same 162 sources, compiled inside
one JVM through `javax.tools.JavaCompiler` with a shared file manager, take
10.8 seconds. Sixty-seven milliseconds each. Eighteen times faster, purely
because the platform class index stays warm instead of being rebuilt 162 times.

The measurement's real value was **ruling out the fix I would otherwise have
shipped.** A worker pool reaches similar numbers by running eight `javac`
processes at once — and this suite's subjects are race conditions. The
concurrent-write-loss demo already fails under unrelated load. Parallelising
the verifier would have changed what the verifier measures. Batched in-process
compilation gets the same speedup with no concurrency at all, so every run
still has the machine to itself.

The fix that shipped first was a cache keyed on a hash of the *generated*
source, which is what makes it safe rather than clever: the import preamble,
the harness and the wrapper are all folded in before hashing, so editing any of
them moves the key on its own. There is no dependency list to forget to update.
Same 363 checks, 27 seconds warm. Thirty-one times faster. Only passes are
cached, nondeterministic blocks never are, and the cache is disabled in CI — the
site claims every example is compiled and run on every deploy, and the deploy
still does all 363 cold.

**Understand the system before you fix it.** Splitting the project into modules
would have felt like progress and touched none of this. The cost was
unconditional re-execution, not coupling — so the fix was a cache key, not a
module boundary. An afternoon of instrumentation would have saved me both wrong
diagnoses.

## Upgrading is the work, not an event

The playground's first measured coverage was 66% of runnable examples. It is
82% now, and the three fixes that got it there were all in the same narrow
channel — the only one that host offers to the JVM's own command line.
`--add-opens`, because this content reflects into private `HashMap` and
`String` internals constantly. `-Dstdout.encoding=UTF-8`, because the sandbox
is not a UTF-8 locale and every arrow and box-drawing character in the expected
output was arriving as a question mark. And `-nowarn -g` to match the verifier,
without which a teaching example's NullPointerException says `<local1>` where
the page says the variable's actual name.

The remaining 18% are sandbox limits, not defects, and the playground says
which limit it hit and prints the local command instead of throwing a
confusing JVM error at you.

The site is partly *about* upgrading, too. There is a feature catalogue
covering every Java release from 5 to 25, and the field I care most about in
that data is not `since` — it is `before`. "What's new in Java 21" is written
everywhere. "And how did it work before?" is the actual interview follow-up.

The honest version of this applies to me and not just the code. Four early
entries were drafted with AI assistance against a verified JDK. Every code
claim in them is compiled and diffed on every build, so the facts are sound —
but writing that middle layer, the mechanism, is the learning this project
exists for. Rewriting those four in my own voice sits *ahead* of new entries in
the queue. Shipping them was fine. Leaving them as the ceiling would not be.

## Luck ran out three times

On 24 August I verified the execution backends by hand. Wandbox worked: JDK 21
and 22, no auth, multi-file, stdin. Piston's public API was already dead —
whitelist-only since February. Judge0's public instance worked in 144ms and
says plainly that it is not for production.

By 11 September, when I actually built the playground, **Wandbox was answering
HTTP 500 on every request.** Eighteen days.

Meanwhile: Cloudflare Pages' v1 build image carries a JDK, but it is Java 8 and
deprecated. The v2 image — which every project is migrated to on 15 September —
carries none at all.

Not one of those was my decision, my mistake, or anything I could have
prevented. That is what luck looks like in software: the ground moves, and it
does not care how good your work is.

What was mine: the runner is a single environment variable. Point
`NEXT_PUBLIC_RUNNER_URL` at a self-hosted instance and the entire playground
moves over with **no code change**. And verification runs in GitHub Actions
rather than the host's own build integration — which is precisely why a host
dropping its JDK is a footnote here instead of a rewrite.

I did not know which dependency would fail. I knew one of them would. The
effort went into making the failure cheap, and that effort was still sitting
there when the failure arrived.

**Luck decides which things break. Effort decides what breaking costs.** You
can only spend time on one of those.

## Comparing with myself, on purpose

The obvious way to measure a Java interview site is against the sites already
ranking for those queries. I decided early not to, for a reason that has
nothing to do with confidence: **their coverage is their plan, not mine.**
Benchmarking against it sets my ceiling at theirs and hands my priorities to a
competitor who does not know I exist.

So the yardstick is my own map. One file declares the full reference taxonomy —
10 tracks, 61 topics, 237 concepts, 699 questions — and `npm run queue` reports
my position against it, honestly and without flattery:

```text
35 written, 664 to write (699 questions across 202 untouched concepts)

11 published entr(ies) not referenced by the map:
  dsa-two-pointers
  dsa-big-o-in-practice
  ...
Add a question with this entry id, or the map understates coverage.
```

Thirty-five of six hundred and ninety-nine. That number is uncomfortable to
print and it is the most useful number I have, because it is measured against
what *I* said this site should be. The tool even flags where my work and my map
disagree — eleven entries that exist but that the map does not know about, so
my own coverage figure is understating itself.

It matters that this stays separate from what readers see. The public learning
path is a curriculum: eleven stages from installing a JDK to senior-level
judgement, each with something you have to build. The queue is for me. Mixing
them puts your backlog on a reader's screen.

Every published entry is also up against yesterday's version of itself. A
deploy is refused if any example's output no longer matches what the page
claims — which is a comparison against my own previous work, automated, with
no opinion about anyone else's.

## What I learned

**Write a requirement down the first time it is asked, not the second.** The
playground made it into version one because a note said "asked twice". It was
nearly a maybe, and a maybe would have cost it its whole architecture.

**A question answered before you build can delete the feature.** The authoring
interface I was about to design turned out to be a smaller problem than the one
I was asked about — and I only found that out by answering first.

**Estimates are a diagnosis you have not made yet.** Two confident estimates,
wrong in opposite directions, and the measurement did not just find the cost —
it disqualified the fix I was about to write.

**Build for the dependency that will fail, not the one you think will.** I
picked wrong about which backend would die. It cost almost nothing, because the
swap was designed in before I needed it.

**Compare with your own map, in public, with real numbers.** 35 of 699 is a
worse-looking figure than anything a competitor comparison would produce, and
it is the only one that tells me what to do tomorrow.

## What I would do differently

I would instrument the verifier the first time it felt slow instead of the
third. The timing flag took an afternoon; guessing wrong twice cost more than
that in wasted direction.

I would have written my own voice into those four early entries before
publishing them, rather than putting the rewrite in the queue. The facts were
verified, so nothing on the site is wrong — but the reason the project exists
is the part I skipped, and skipped work does not stop being owed.

And I would keep, without changing a line, the two decisions that carried
everything: content as validated data rather than code, so a second language is
a folder and not a rewrite; and quality enforced **mechanically** rather than
by whoever happens to be writing. A schema that rejects malformed frontmatter
with the file, the field and the reason needs no intelligence to be right. That
is the point of it.

## What's next

Batched in-process compilation, now that I know where the 448 seconds actually
go. The four rewrites, ahead of new entries. And the concurrency track's
examples in the playground, which need a runner that allows threads — the one
thing the free sandbox will not give me.

Six hundred and sixty-four questions to write. The list is public, and it is
the only scoreboard I am playing against.

---
title: Building Gully Cricket Scorer: an app for the cricket we all played
description: How I built a ball-by-ball scoring app for park and club cricket — what it does, how it is put together, and what testing it on a real phone taught me.
date: 2026-09-09
category: building
tags: [android, kotlin, jetpack-compose, ux]
products: [gully-cricket-scorer]
keyTakeaway: I built it for someone who already knew how to score cricket — me. Almost every serious bug came from the gap between that person and someone opening the app for the first time.
---

Most of us have played this match:

> "Bro, what's the score?"
> "Wait… I think it's 47?"
> "Who won last week?"

Nobody is keeping a book. Someone is holding a phone with a notes app open, and
by the third over the running total has quietly diverged from what actually
happened. By next weekend, nobody remembers who won at all.

That is the entire problem **Gully Cricket Scorer** exists to solve. Not
professional scoring — the kind of cricket that happens in parks, on school
grounds, and in weekend leagues, where the scorer is also fielding.

## The constraint that decided everything

The scorer is standing outside, in sunlight, holding a phone in one hand,
watching a match that does not pause for them.

That single fact ruled out most of the design decisions I would otherwise have
made. Anything requiring two hands, careful aim, or a moment of thought is a
ball that goes unrecorded. You cannot ask a cricket match to wait while
somebody works out which button they need.

So the scoring pad has large touch targets, the most common actions sit under
the thumb, and the score, the current over and the run buttons are pinned in
place — never scrolled away, never covered.

## What it does

**Ball-by-ball scoring.** Runs, wickets, wides, no-balls, byes and leg-byes.
Six kinds of dismissal, with the fielder credited. Strike rotation,
partnerships, fall of wickets and run rate are all worked out for you, because
the scorer has enough to think about.

**Mistakes are expected.** Any ball in the current over can be tapped and
edited or deleted, and any action can be undone. In a park match somebody will
call a wide that turns out to be a leg bye, and the app should not treat that
as a catastrophe.

**Bowler management.** The app enforces the no-consecutive-overs rule and keeps
a per-bowler over quota, so the picker only offers bowlers who can legally bowl
next. Live economy, overs and wickets sit alongside each name.

**The match flow.** Optional match name and venue for tournaments, toss and
decision, an innings-break screen with the target revealed, and during the
chase a heads-up display: runs needed, balls left, and the required rate
colour-graded against the current one.

**It saves after every ball.** Kill the app, take a call, run out of battery —
you resume exactly where you were. For an app used outdoors on a phone that
might be at 4%, this is not a nice-to-have.

**After the match.** A full scorecard with batting and bowling tables, fall of
wickets and partnerships. A Manhattan chart of runs per over for both innings.
A ball-by-ball commentary view you can export as text.

**Sharing, which turned out to matter more than I expected.** At the end of
every over the app can produce an image card of the current state, ready to
drop into a WhatsApp or Telegram group. The full scorecard shares the same way.
This is the feature people actually use — the match ends and the scorecard is
in the group chat before anyone has left the ground.

**Memory across matches.** The last fifty matches are archived on the device.
Matches group into tournaments by name. There are career batting and bowling
tables across every match played, a profile for each player showing every match
they appeared in, and a Hall of Fame for centuries, fifties, five-fers,
three-fers and hat-tricks.

There is also a small convenience I am fond of: type a team name you have used
before and the app suggests its last squad. Nobody wants to retype eleven names
every Sunday.

**Your data stays yours.** Everything is stored on the device. You can export
the whole history as a file and import it on a new phone, and you can wipe
everything from settings.

## How it is put together

Kotlin and Jetpack Compose, Material 3, following the system light or dark
theme. No native code and no NDK, which keeps the build simple and the download
small.

Two structural decisions carried most of the weight.

**The match state is the source of truth, and it is persisted constantly.**
Auto-save after every ball is not an optimisation bolted on at the end; it is
the reason the app can be trusted outdoors. Anything that only exists in memory
is something a phone call can destroy.

**Derived numbers are derived, never stored.** Run rate, required rate,
partnerships, economy and the career tables are all computed from the recorded
deliveries. Storing them would mean two representations of the same truth that
can drift apart — and in a scoring app, drift is the one bug you cannot ship,
because the whole product is "the number is right".

## The part I got wrong

I sat down with a real device and walked through the app as if I had never seen
it before. It produced seventeen numbered bugs.

Nearly all of them shared a cause: **I had built the app for someone who
already knew how to score cricket.** That person was me. The gaps only appeared
when I pretended to be someone else.

**A dead end mid-match.** When the first innings ended, the app showed a break
screen with a button to start the chase. If you navigated away from that screen
— tapped "view scorecard", or hit back by accident — there was no way back to
starting the second innings. The match was stuck. Not a crash, not an error
message, just a wall. I fixed it with two independent routes forward, on the
principle that a single path to continuing a match is a single point of
failure.

**Buttons I could not reach.** Undo and swap-strike were clipped off the bottom
of the screen on the device I tested with, and therefore did not exist. They
worked perfectly in the preview. Fixing that pushed the current-over strip into
a scrolling area, so it stopped being visible while scoring — one fix creating
the next. Layout on a real phone is not layout in a design tool.

**Destructive actions that asked nothing.** Discarding a match in progress took
one tap, with no confirmation. So did starting a new match from the scorecard,
mid-innings. Both now ask first. The rule I should have started with: if an
action destroys something the user spent an hour creating, it gets a
confirmation, every time.

**A dot ball labelled with a dot.** The button for zero runs was a "•", which
is exactly right in a scorebook and completely opaque to someone who has never
kept one. It is now labelled "0". Similarly, the extras buttons were two-letter
abbreviations with nothing explaining them, so there is now a "how scoring
works" sheet in the menu.

**And earlier, something worse.** In an earlier version, completed matches
could vanish from history — they were only archived if the user happened to
start a new match afterwards. That is real data loss, and it is the kind of bug
that only shows up when someone uses the app the way people actually do rather
than the way you demoed it. Extras were also being credited to the wrong side
of the book. Both were fixed, and I named them plainly in the release notes
rather than hiding them under "bug fixes and improvements". Anyone who had
noticed deserved to know it was fixed.

## What I learned

**Being the target user is a liability as well as an advantage.** It got the
cricket logic right and the first-run experience wrong. I knew what "•" meant,
so I never asked whether anyone else would.

**A walkthrough on a real device is worth more than any amount of preview
rendering.** Every one of those seventeen bugs was invisible until I held the
phone. Not one of them required a debugger.

**The share card did more for the app than any feature I considered
"core".** Scoring is the product, but a scorecard landing in a group chat is
the reason a second person finds out the app exists. I built it late. I would
build it first next time.

**Small apps have real users with real expectations.** "It's just a side
project" is not a defence when someone has scored a whole match into it and the
history is gone.

## What I would do differently

I would do the first-time-user walkthrough **before** polishing the scoring
screen, not after. The polish was refining something that had a hole in it.

I would write down the destructive-action rule at the start rather than
discovering it three bugs at a time.

And I would test resuming from a killed app much earlier. Several subtle
issues — the wrong bowler offered after a resume, a sheet reappearing every
time — were all the same underlying mistake: state reconstructed from the wrong
place when the app came back. Restoring correctly is harder than saving
correctly, and I treated it as an afterthought.

## What's next

The scoring flow is solid now. The interesting question is whether the memory
features — career stats, the Hall of Fame, tournaments — are what keep people
coming back, or whether they are things I found interesting to build. I do not
know yet, and I would rather find out from people using it than assume.

If you play cricket with friends, it is free on Google Play. If you score a
match with it and something gets in your way, I would genuinely like to hear
about it — that is exactly the feedback that produced the list above.

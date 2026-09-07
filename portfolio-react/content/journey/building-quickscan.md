---
title: Building QuickScan: the problems that shaped the architecture
description: How a privacy-first Android scanner is put together, and the four problems that changed the design — including a Play Store rejection that had nothing to do with my code.
date: 2026-09-07
category: building
tags: [android, kotlin, jetpack-compose, architecture]
products: [quickscan]
keyTakeaway: Most of the architecture I am happiest with came from a constraint I did not choose. The interesting decisions were forced, not designed.
---

QuickScan is an Android app that scans QR codes, barcodes and paper documents.
The constraint I set at the start was simple: **nothing leaves the phone.** No
account, no sync, no analytics, no upload. The only network traffic the app
generates is advertising.

That single rule decided more of the architecture than any pattern I chose
deliberately. If scans cannot leave the device, there is no server to move work
to — every hard problem has to be solved on the phone, in the app, with whatever
budget a mid-range device has spare.

This is how it is put together, and the four problems that changed the shape of
it along the way.

## The shape of the app

It is MVVM with unidirectional state, built on Jetpack Compose and Material 3.
That part is unremarkable and deliberately so. Three decisions underneath it are
worth writing down.

### The imaging engine knows nothing about Android

The document pipeline — detecting the page, correcting its perspective,
enhancing the result — depends on `android.graphics.Bitmap` and nothing else
from the framework. Detection, enhancement and geometry are plain Kotlin
operating over `IntArray`.

This was not architectural purity. It was about testing. Anything that touches
the Android framework needs an instrumented test, which means an emulator or a
device, which means slow feedback and tests I would eventually stop running.
Keeping the algorithms free of framework types means most of the interesting
surface is covered by ordinary JVM unit tests that run in milliseconds.

The related decision: the imaging is **hand-written Kotlin, with no OpenCV and
no native image dependency.** Pulling in a native imaging library would have
been faster to start and, as the next section shows, would have cost me
considerably more later.

### The document flow is a nested navigation graph

Capture, edit and crop are three destinations that are really one task. They sit
in a nested graph, and all three resolve the *same* ViewModel, scoped to the
graph's back-stack entry.

Both obvious alternatives are wrong, and I tried one of them:

- **Activity scope** leaks one scanning session's pages into the next. Finish a
  document, start another, and the previous one's state is still there.
- **Per-destination scope** means the editor cannot see what the camera just
  captured, which is the entire point of the flow.

Scoping to the nested graph gives a lifetime that matches the actual unit of
work: it lives as long as the task, and dies when the user leaves it.

### Detection state deliberately skips the ViewModel

Document detection runs on the camera analysis thread at preview frame rate.
The natural instinct is to push the detected quadrilateral through a
`StateFlow` like every other piece of state.

Doing that recomposes the entire capture screen thirty times a second.

So the quad is held in plain snapshot state owned by the screen itself, and only
the guidance string — "move closer", which changes rarely — crosses into the
ViewModel. It is an exception to the unidirectional rule, and it is the right
one. A rule you cannot articulate an exception to is a rule you have not
finished thinking about.

## Problem 1: Google Play rejected the build over something I did not write

This is the one I would not have predicted.

Google Play began requiring apps to support **16 KB memory page sizes**. My
Kotlin was irrelevant to this. The problem was that prebuilt native libraries
shipped inside ML Kit — which does the barcode decoding — were aligned to 4 KB
rather than 16 KB.

My first fix was the documented runtime one: declare page-size compatibility in
the manifest. The app then ran correctly on 16 KB devices. **The upload was
still rejected.** The runtime flag does nothing for Play's *static* analysis of
the binary, which inspects the alignment of every `.so` in the bundle. I could
not realign a library I did not build.

The fix came from a different direction. Native libraries only need to meet the
alignment requirement when they are mapped directly out of the package. If they
ship **compressed**, they are extracted to disk at install time and the
alignment requirement no longer applies.

So: switch native library packaging back to the compressed (legacy) form, move
to an Android Gradle Plugin version that handles 16 KB properly, and keep the
runtime compatibility declaration as a second layer. The trade-off is roughly
10–15% more disk space once installed. In exchange, the barcode library that
compresses to well under half its size passes validation and the app ships.

Two things I took from this:

**A dependency's build configuration is your problem, whether or not you can
change it.** ML Kit is Google's library, rejected by Google's own store check,
and it was still mine to solve.

**The workaround was not in the error message.** Play said the alignment was
wrong. The fix was to stop needing alignment at all — a level of indirection
away from what I was being told.

This is also, retroactively, the strongest argument for the hand-written
imaging engine. Every native dependency I did not add is one I did not have to
drag through this.

## Problem 2: ordering writes so that failure is survivable

A scanned page is two things: a row in the database and an image file on disk.
Two writes, and the app can die between them.

The repository is the only component that knows those two halves belong
together, and the rule it enforces is **write the file first, then the row.**

Consider both failure modes:

- **File, then row** — a crash in between leaves an image nothing references. A
  background sweep removes it. The user never knows.
- **Row, then file** — a crash in between leaves a page that exists in the
  database with no image. A broken thumbnail, and a page that will not open.

Same probability of failing. Completely different experience of failing. When
you cannot make an operation atomic, you can still choose which side of it
breaks — and that choice is worth making explicitly rather than by accident.

## Problem 3: biometric as a real gate, not a screen

The app has an encrypted vault for scans that matter. Encryption is AES-256-GCM
under an Android Keystore key.

The distinction that took me longest to properly internalise: **a biometric
prompt is only meaningful if the key is bound to it.** If the key can be used
without authentication, the prompt is a screen drawn over data that was already
readable — it stops a person picking up your phone, and nothing else.

Making the Keystore key auth-bound means the system itself refuses to release it
until authentication succeeds. The prompt stops being UI and becomes part of the
cryptography.

That correctness brings a migration problem with it, because key availability
depends on device state. A user who has no screen lock, and later adds one, is
in a different situation than when their data was first encrypted. So decryption
tries the strongest available key first and works down, and anything opened with
a superseded key is transparently re-encrypted under the current one. The
upgrade happens quietly, while the user is doing something else.

The other half is **typed failures.** "Could not open that" is useless. Needing
to unlock and retry, and a key destroyed by a screen-lock change, are different
events requiring different actions from the user — so they are different
exception types, all the way up to the UI.

## Problem 4: never interrupting the moment that matters

The app is ad-supported, which means reconciling revenue with the times a user
is mid-task.

Some screens must never be interrupted: capturing, cropping, saving, or the
instant before a share. The first implementation used a boolean — protected or
not.

The boolean was wrong, because these flows **nest**. The crop screen opens on
top of the editor. When crop closes and clears the flag, the editor is still
open and still needs protection, but the flag now says otherwise.

A counter fixes it: each protected screen increments on entry and decrements on
exit, and interruption is allowed only at zero. Full-screen ads are also
suppressed on return from any activity the app itself launched, and rate-limited
regardless.

The general lesson is one I keep relearning: **a boolean is a counter that has
not met its second caller yet.** Any time "is this state active" can be true for
overlapping reasons, it was never a boolean.

## What I would do differently

**I would have checked platform requirements before writing the feature, not
before shipping it.** The 16 KB requirement had a published deadline. I met it
reactively, under upload pressure, when reading the requirement earlier would
have cost an afternoon.

**I would have made the vault key auth-bound from the first line.** Retrofitting
correct cryptography onto data that already exists costs a migration path,
multiple key generations and a body of tests. Getting it right initially costs
one constructor argument.

**I would keep the no-native-dependency rule.** It looked like extra work early
and paid for itself the moment a prebuilt binary I did not control became a
release blocker.

## What's next

The document detector is tuned for ordinary lighting on ordinary surfaces.
Glossy paper under a point light is where it struggles and where manual corner
adjustment earns its place — improving that without a native imaging library is
the interesting constraint.

I am also curious whether the imaging engine's independence from Android pays
off a second time. Nothing in it is Android-specific, and the same pipeline
would run anywhere Kotlin runs.

# Community Courier: Presentation Script & Speaker Guide
**Project Showcase**: UW x SIT HRI Basic Robot Development PBL  
**Date**: August 28, 2026  
**Total Time Budget**: 15 Minutes (10m Presentation + 2m Demo Video + 3m Q&A)

---

## ⏱ Time Allocation Overview
```
┌─────────────────────────────────────────────────────────────┬───────────┬───────────┐
│ 10-Minute Slide Pitch                                       │ 2m Demo   │ 3m Q&A    │
│ 00:00 - 10:00                                               │ 10:00     │ 12:00     │
└─────────────────────────────────────────────────────────────┴───────────┴───────────┘
```

---

## Slide 1: Hero & Introduction (00:00 – 01:15)
* **Slide**: `1 / 7` — *Crossing paths through kinder connection*
* **Visual**: Animated connection scene between Grace and Walter with TurtleBot delivery dot.
* **Speaker Cue**: Start the live deck timer (`P`).

### 🗣 English Script:
> "Good morning, professors, peers, and judges. We are excited to present **Community Courier: a note from your neighbor**.
>
> In assisted living and senior care facilities, the simple act of staying in touch with the person living just three doors down can often feel like an insurmountable obstacle. Connection shouldn't depend on who has the energy to walk down a long hallway first. 
> 
> Community Courier is an autonomous TurtleBot3-powered messenger that brings handwritten letters, drawings, and voice postcards directly to resident doorways—creating spontaneous, low-pressure human-to-human bonds."

### 🇯🇵 Japanese Summary (日本語要約):
> 「みなさん、こんにちは。私たちは『コミュニティ・メッセージ・クーリエ』を発表します。高齢者施設では、わずか数部屋先の隣人に会いに行くだけでも、身体的な負担や心理的な遠慮が大きな壁になります。本プロジェクトは、TurtleBot3を活用して手紙や音声ポストカードを自律配達し、隣人同士の温かい自発的なつながりを創出するロボットです。」

---

## Slide 2: Problem Definition (01:15 – 02:45)
* **Slide**: `2 / 7` — *The Silent Crisis of Isolation in Senior Care*
* **Visual**: 3 Problem Cards (Physical Mobility Fatigue, Fear of Intruding, Overburdened Care Staff).

### 🗣 English Script:
> "When researching the daily lives of assisted living residents, we identified a silent crisis: **more than 1 in 4 seniors experience severe social isolation**. 
>
> Why does this happen even when living under the same roof? We identified three core barriers:
> 1. **Physical Mobility Fatigue**: Long hallway walks with canes or walkers cause physical exhaustion and fear of falling.
> 2. **Fear of Intruding & Social Anxiety**: Residents worry about disturbing neighbors who might be resting, or they suffer from 'blank page anxiety'—not knowing how to initiate a conversation.
> 3. **Overburdened Care Staff**: Caregivers are already operating at capacity with clinical and daily care tasks; they cannot act as manual note couriers.
>
> Community Courier bridges this gap by acting as an asynchronous, gentle liaison."

---

## Slide 3: Target Users & Stakeholders (02:45 – 04:00)
* **Slide**: `3 / 7` — *Who is this for?*
* **Visual**: Split Stakeholder Cards (Buyers/Operators vs Direct Senior End Users).

### 🗣 English Script:
> "To build a viable system, we separated our stakeholders into two key personas:
>
> * **The Buyer (Assisted Living Operators & Activity Coordinators)**: Facilities invest in resident happiness, cognitive stimulation, and staff retention. Community Courier enriches daily life programming without creating any extra manual workload for nursing staff.
> * **The End User (Senior Residents & Hallway Neighbors)**: Seniors who crave peer friendship but face low physical energy, hand tremors, or introversion. They experience the joy of receiving tangible mail or hearing a familiar neighbor's voice right at their door."

---

## Slide 4: Conversational Scaffolding & Audio Prompts (04:00 – 05:30)
* **Slide**: `4 / 7` — *Conversational Scaffolding: Never Run Out of Things to Say*
* **Visual**: Interactive Audio Prompt Sandbox card.
* **Action Cue**: Click **"✨ Play Another Topic Suggestion"** live during the talk.

### 🗣 English Script:
> "One key insight from our user journey research was that seniors often *want* to reach out, but get stuck thinking, *'What should I say?'*
>
> To eliminate blank-page anxiety, Community Courier features a **curated library of audio conversation starters**. These are pre-recorded `.wav` prompt files generated using a dedicated local TTS server.
>
> *(Click the button)* — With a single tap on the screen, the robot plays suggestions like: *'You could ask Walter about his heirloom tomatoes in the courtyard garden!'* This gives the resident an instant, welcoming idea to write or record."

---

## Slide 5: Deep Dives (Interaction Flow & Technical Architecture) (05:30 – 08:30)
* **Slide**: `5 / 7` — *Comprehensive Technical Solution & Business Analysis*
* **Visual**: 3 Exploration Cards (Task Flows, ROS2 Architecture, Market Viability).

### 🗣 English Script:
> "Let's look under the hood at the engineering and interaction design:
>
> 1. **Interaction Flow**: We support two distinct modalities—**Physical Mail** (where motorized dual SG90 micro-servos smoothly open and latch a 3D-printed capsule) and **Voice Postcards** (where a USB microphone records uncompressed PCM audio for residents with arthritis or hand tremors).
> 2. **ROS2 Software Stack**: The robot runs ROS2 Humble on an onboard Raspberry Pi 4B and Arduino Uno. We structured the architecture into clean modular topics:
>    * `/auto_navi` for Nav2 goal poses and costmap inflation,
>    * `/servo` for motorized compartment actuation,
>    * `/audio_mic` and `/audio_speaker` for voice recording and playback, and
>    * `/topic_prompts` for conversation starter playback.
> 3. **Market Viability**: Across 100,000+ senior living facilities in the US and Japan, this represents a combined **$1.8 Billion TAM**, with Japan offering a $1.26B market due to its super-aged society and national assistive robotics support."

---

## Slide 6: Q&A Anticipation Highlights (08:30 – 09:15)
* **Slide**: `6 / 7` — *Anticipated Questions & Discussion Points*
* **Visual**: 4 Interactive Q&A Cards.

### 🗣 English Script:
> "Before our video demo, we've prepared responses for key operational questions:
> * **Hallway Safety**: The robot is speed-capped at **0.22 m/s** with 360° LiDAR costmap margins and an instant proximity stop watchdog.
> * **Tangible Notes vs Video Calls**: Asynchronous notes eliminate scheduling pressure and leave lasting physical keepsakes.
> * **Privacy**: Audio postcards and topic prompts are stored locally with zero patient data transmitted to external cloud servers.
> * **Multi-Floor Buildings**: The current prototype is tailored for single-floor wings; elevator API integration is part of our future scaling."

---

## Slide 7: For the Future & Lessons Learned (09:15 – 10:00)
* **Slide**: `7 / 7` — *Lessons Learned & Future Development*
* **Visual**: 2 Reflection Cards (Audio Feedback Gap, Algorithmic Matchmaking).

### 🗣 English Script:
> "Reflecting honestly on our development cycle:
> * **Arrival Audio Gap**: The robot currently gives audio cues on departure (*'moving to location'*), but does not yet trigger an automated arrival voice greeting when reaching the door. Connecting Nav2 goal-reached action callbacks to the speaker node is our next step.
> * **Algorithmic Matchmaking**: We envisioned matching residents based on shared hobby data (e.g. connecting two gardeners). In this hackathon timeframe, we prioritized navigation and mechatronics reliability, so user matchmaking will be built in Phase 1 of our future roadmap."

---

## Part 2: Video Demonstration (10:00 – 12:00)
* **Action**: Transition to Slide 5 / `#demo`. The physical mission video is on the left and the control UI screencast is on the right.
* **Talking Points During Video**:
> "Now let's watch Community Courier in action. In this video, you'll see:
> 1. Grace creating her note and triggering the motorized capsule opening.
> 2. TurtleBot3 autonomously navigating the mock corridor with 360° LiDAR obstacle avoidance.
> 3. Arrival outside Room 3, capsule opening, and Walter receiving his note.
> 4. The server UI issuing room, compartment, recording, playback, and Topic Suggestion commands."

---

## Part 3: Live Q&A Period (12:00 – 15:00)
* **Duration**: 3 Minutes
* **Speaker Tips**:
  1. Thank the jury for their question.
  2. Speak clearly and reference specific ROS2 topic architecture or mechatronic components.
  3. Reiterate patient privacy and gentle 0.22 m/s collision avoidance protocols.

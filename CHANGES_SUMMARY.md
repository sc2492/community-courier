# Community Courier: Summary of Changes & Architecture Upgrades

**Project**: Community Courier (UW x SIT HRI Basic Robot Development PBL)  
**Date**: August 27–28, 2026  
**Stack**: Vanilla HTML5, CSS3 (Biomorphic Design System), JavaScript (ES6+), ROS2 Humble, TurtleBot3 Burger

---

## 1. Fullscreen Presentation Deck Engine (`site/presentation-core.js` & `site/presentation.css`)
- **Interactive Presentation Deck Mode**: Press <kbd>P</kbd> or click the *"📽 Full Presentation Deck"* button to toggle a fullscreen slide deck optimized for classroom and jury presentations.
- **Strict 1-Slide Active Display**: Resolved slide stacking issues with scoped `display: none !important;` on inactive `.deck-slide` elements and flex centering on `.active-slide`.
- **Live Pitch Timer**: Integrated an on-screen MM:SS timer synced to the 10m pitch / 2m demo / 3m Q&A rubric.
- **Global Click Delegation**: Unified event delegation handling topic prompt regeneration, Q&A accordion toggles, anatomy explorer views, and automated demo video navigation across both the web page and presentation slide deck.

---

## 2. Audio Topic Prompts & Local TTS Architecture Alignment
- **Ollama / Cloud LLM Removal**: Replaced all mentions of cloud LLMs or online VLM inference across copy, diagrams, and code with **curated pre-recorded `.wav` audio prompt files** generated via a local TTS server.
- **Topic Sandbox (`site/index.html`)**: Built an interactive sandbox testing the `/topic_prompts` ROS2 topic with instant randomized suggestion playback in both English and Japanese.
- **ROS2 Topic Schema (`site/technical.html`)**: Updated the system node graph to reflect `penpal_interfaces/TopicAudio` on `/topic_prompts` and `/audio_speaker`.

---

## 3. Demo Video Integration (`site/index.html` & `site/video_demo.mp4`)
- **Native HTML5 Video Player**: Integrated `video_demo.mp4` directly into the Demo section and slide deck with standard browser controls, metadata preloading, and responsive aspect scaling.
- **Smart Jump-and-Play**: Clicking any *"Watch Demo Video"* button (from the Hero section, header nav, or slide 1) smoothly scrolls to or activates the Demo slide and immediately begins playback.
- **Auto-Pause on Slide Switch**: Leaving the demo slide automatically pauses any playing video.

---

## 4. Technical Specs & Hardware Cleanup (`site/technical.html`)
- **Removed Deprecated Sections**: Stripped out the "Native vs Custom Sensor Suite" comparison table and the "Key Navigation & SLAM Challenges" section per user directives.
- **Streamlined Technical Architecture**: Kept the core hardware breakdown, pinout schematics (Raspberry Pi 4B, Arduino Uno R3, dual SG90 servos, OpenCR), ROS2 node graph, and real-world deployment barrier analysis.

---

## 5. Q&A and "For the Future" Overhaul (`site/index.html` & `site/how-it-works.html`)
- **Removed Unverified Recipient Absence Logic**: Removed the 10-minute timeout safeguard question from Q&A and aligned interaction journey tables.
- **Added Multi-Story / Elevator Q&A (Q4)**: Prepared comprehensive discussion points explaining single-floor scope and smart elevator API integration milestones.
- **"For the Future" Section (`#future`)**:
  - **Audio Feedback Gap**: Acknowledged that TurtleBot provides departure audio cues (`"moving to location"`), but lacks an automated closed-loop arrival voice greeting outside the door (planned for Nav2 goal-reached callback integration).
  - **Data-Driven Matchmaking**: Acknowledged that interest profiling and neighbor recommendation algorithms were planned but postponed due to hackathon time limits (prioritizing navigation & mechatronics).
  - **Where the Route Goes from Here**: Preserved the 3-phase commercialization roadmap on the main page while cleanly hiding it in slide deck mode to prevent presentation crowding.

---

## 6. Biomorphic UI & Visual Cohesion (`site/presentation.css`)
- **Color Palette & Tactile Cards**: Applied soft organic parchment tones (`--bg-base: #ede7dc`), warm coral accents (`#d95d39`), and diffused tactile drop shadows (`box-shadow: 0 4px 20px rgba(61,48,50,0.06)`).
- **Responsive Typography & Spacing**: Clean hierarchy using Fraunces serif headings, Karla body text, and Caveat handwritten scripts.

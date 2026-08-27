/**
 * Community Courier: Dynamic Presentation & Interactive Core Engine
 */

(function () {
  'use strict';

  const topicsEn = [
    "“You could ask Walter about his heirloom tomatoes in the courtyard garden!”",
    "“Ask Grace if she wants to join this afternoon's watercolor painting session.”",
    "“Mention the morning jazz concert on the radio and ask for their favorite tune.”",
    "“Ask about their memories of family summer trips or favorite hometown recipes.”",
    "“Share a compliment about their handwritten origami piece in the community hall.”"
  ];

  const topicsJa = [
    "「中庭の花壇で育てているトマトの様子について聞いてみませんか？」",
    "「午後の水彩画レクリエーションに一緒に行かないか誘ってみましょう。」",
    "「今朝ラジオで流れていた懐かしいジャズの曲について尋ねてみませんか？」",
    "「ご家族との夏の旅行の思い出やお気に入りの郷土料理について話してみましょう。」",
    "「ロビーに飾られていた素敵な折り紙の作品を褒めてみませんか？」"
  ];

  let lastTopicIdx = -1;

  // --- 1. Dynamic Scroll Progress Bar & Reveal Observers ---
  function initScrollEngine() {
    if (!document.getElementById('scroll-progress')) {
      const bar = document.createElement('div');
      bar.id = 'scroll-progress';
      document.body.prepend(bar);
    }

    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      if (progressBar) progressBar.style.width = scrolled + '%';
    }, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.05
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          animateCounters(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-stagger, .card, .mod-card, .explore-card, .rm-stop, .spec-item, .team-card, .stat-counter-card, .qa-card').forEach(el => {
      if (!el.classList.contains('reveal') && !el.classList.contains('reveal-stagger')) {
        el.classList.add('reveal');
      }
      revealObserver.observe(el);
    });
  }

  // --- 2. Animated Number Counters ---
  function animateCounters(container) {
    const counters = container.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
      if (counter.dataset.animated) return;
      counter.dataset.animated = 'true';
      const target = parseFloat(counter.dataset.counter);
      const prefix = counter.dataset.prefix || '';
      const suffix = counter.dataset.suffix || '';
      const decimals = parseInt(counter.dataset.decimals || '0', 10);
      const duration = 1200;
      const start = 0;
      const startTime = performance.now();

      function updateNumber(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuad = 1 - (1 - progress) * (1 - progress);
        const current = start + (target - start) * easeOutQuad;
        counter.textContent = prefix + (decimals > 0 ? current.toFixed(decimals) : Math.round(current)) + suffix;
        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = prefix + (decimals > 0 ? target.toFixed(decimals) : target) + suffix;
        }
      }
      requestAnimationFrame(updateNumber);
    });
  }

  // --- 3. Interactive ROS2 Topic Architecture Inspector ---
  window.initRosInspector = function () {
    const cards = document.querySelectorAll('.ros-node-card');
    const inspector = document.getElementById('ros-inspector-code');
    if (!cards.length || !inspector) return;

    const topicSchemas = {
      'servo': {
        topic: '/servo',
        type: 'penpal_interfaces/msg/ServoCmd',
        node: 'servo_actuator_node (Arduino Uno Bridge)',
        payload: '{\n  "header": { "stamp": { "sec": 1787842773, "nanosec": 124000 } },\n  "compartment_id": 1,\n  "target_angle_deg": 90,\n  "servo_speed_deg_s": 45,\n  "latch_status": "UNLOCKED"\n}'
      },
      'audio_mic': {
        topic: '/audio_mic',
        type: 'penpal_interfaces/msg/AudioBuffer',
        node: 'voice_recorder_node (Raspberry Pi 4B)',
        payload: '{\n  "audio_format": "pcm_16bit_16000hz_mono",\n  "recording_duration_sec": 8.45,\n  "rms_level_db": -18.2,\n  "saved_filepath": "/var/penpal/audio/msg_room1_to_room3.wav",\n  "status": "RECORDING_COMPLETE"\n}'
      },
      'audio_speaker': {
        topic: '/audio_speaker',
        type: 'penpal_interfaces/msg/AudioPlay',
        node: 'arrival_announcer_node (Raspberry Pi 4B)',
        payload: '{\n  "chime_type": "ARRIVAL_FRIENDLY_CHORD_A",\n  "volume_gain": 0.85,\n  "voice_playback_file": "/var/penpal/audio/msg_room1_to_room3.wav",\n  "is_looping": false\n}'
      },
      'auto_navi': {
        topic: '/auto_navi',
        type: 'nav2_msgs/action/NavigateToPose',
        node: 'turtlebot3_navigation_node (Nav2 Stack + LiDAR SLAM)',
        payload: '{\n  "goal_pose": {\n    "header": { "frame_id": "map" },\n    "pose": { "position": { "x": 8.52, "y": 0.84, "z": 0.0 }, "orientation": { "z": 0.707, "w": 0.707 } }\n  },\n  "planner_id": "GridBased",\n  "controller_id": "DWBLocalPlanner",\n  "current_velocity_m_s": 0.22\n}'
      },
      'ui': {
        topic: '/ui',
        type: 'penpal_interfaces/msg/UiState',
        node: 'touchscreen_ui_node (Touch LCD on TB3)',
        payload: '{\n  "display_mode": "TOPIC_SUGGESTION_POPUP",\n  "recipient_selected": "Room 3 (Walter)",\n  "active_face_expression": "HAPPY_WARM",\n  "battery_percentage": 94,\n  "last_button_pressed": "BTN_SUGGEST_TOPIC"\n}'
      },
      'topic_prompts': {
        topic: '/topic_prompts',
        type: 'penpal_interfaces/msg/TopicAudio',
        node: 'topic_audio_player_node (Raspberry Pi 4B)',
        payload: '{\n  "header": { "stamp": { "sec": 1787842773, "nanosec": 124000 } },\n  "prompt_id": "topic_gardening_04",\n  "audio_file": "/var/penpal/audio/prompts/topic_tomatoes.wav",\n  "tts_engine": "Local TTS Server",\n  "text_transcript": "You could ask Walter about his tomato plants in the courtyard garden!",\n  "status": "PLAYBACK_READY"\n}'
      }
    };

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        const key = card.dataset.topicKey || 'auto_navi';
        const data = topicSchemas[key] || topicSchemas['auto_navi'];
        inspector.textContent = `// ROS2 Node: ${data.node}\n// Topic: ${data.topic} [${data.type}]\n\n${data.payload}`;
      });
    });
  };

  // --- 4. Global Delegated Click Handlers (Works on Page & Deck Mode) ---
  function initGlobalDelegations() {
    document.addEventListener('click', (e) => {
      // Audio Topic Sandbox Button
      const topicBtn = e.target.closest('#gen-topic-btn, .topic-gen-btn');
      if (topicBtn) {
        topicBtn.disabled = true;
        const box = topicBtn.closest('.topic-sandbox') || document;
        const topicText = box.querySelector('.topic-text, #sandbox-topic-text');
        const topicMeta = box.querySelector('.topic-meta, #sandbox-topic-meta');

        if (topicText) topicText.style.opacity = '0.3';
        if (topicMeta) topicMeta.textContent = '⚡ Loading .wav audio prompt...';

        setTimeout(() => {
          const lang = localStorage.getItem('preferredLang') || 'en';
          const pool = lang === 'ja' ? topicsJa : topicsEn;
          let nextIdx;
          do {
            nextIdx = Math.floor(Math.random() * pool.length);
          } while (nextIdx === lastTopicIdx && pool.length > 1);
          lastTopicIdx = nextIdx;

          // Update ALL topic text elements (both on page and deck slides)
          document.querySelectorAll('.topic-text, #sandbox-topic-text').forEach(el => {
            el.textContent = pool[nextIdx];
            el.style.opacity = '1';
          });

          document.querySelectorAll('.topic-meta, #sandbox-topic-meta').forEach(el => {
            el.textContent = lang === 'ja'
              ? '✓ 収録済み .wav 音声プロンプト (TTS音声サーバー作成)'
              : '✓ Curated .wav Audio Prompt (TTS Audio Server)';
          });

          topicBtn.disabled = false;
        }, 280);
        return;
      }

      // Q&A Accordion Click
      const qaHeader = e.target.closest('.qa-question');
      if (qaHeader) {
        const card = qaHeader.closest('.qa-card');
        if (card) {
          const container = card.closest('.qa-grid') || card.parentElement;
          const isOpen = card.classList.contains('open');
          container.querySelectorAll('.qa-card').forEach(c => c.classList.remove('open'));
          if (!isOpen) card.classList.add('open');
        }
        return;
      }

      // Watch Demo CTA / Nav Buttons Click Handler
      const demoBtn = e.target.closest('a[href="#demo"], a[href$="#demo"], .watch-demo-btn, button[data-action="watch-demo"]');
      if (demoBtn) {
        e.preventDefault();
        if (document.body.classList.contains('presentation-active') && typeof window.goToSlideById === 'function') {
          window.goToSlideById('demo');
          setTimeout(() => {
            const activeSlide = document.querySelector('.deck-slide.active-slide');
            const vid = activeSlide ? activeSlide.querySelector('video') : null;
            if (vid) {
              vid.currentTime = 0;
              vid.play().catch(() => {});
            }
          }, 300);
        } else {
          const demoSec = document.getElementById('demo');
          if (demoSec) {
            demoSec.scrollIntoView({ behavior: 'smooth' });
            const vid = demoSec.querySelector('video');
            if (vid) {
              setTimeout(() => {
                vid.currentTime = 0;
                vid.play().catch(() => {});
              }, 450);
            }
          }
        }
        return;
      }
    });
  }

  // --- 5. Interactive Hardware Anatomy Explorer ---
  window.initAnatomyExplorer = function () {
    const tabs = document.querySelectorAll('.anatomy-tab-btn');
    const img = document.getElementById('anatomy-main-img');
    const title = document.getElementById('anatomy-title');
    const desc = document.getElementById('anatomy-desc');
    if (!tabs.length || !img) return;

    const views = {
      'view1': {
        src: 'Robot_anatomy_2.png',
        titleEn: 'Perspective View: Exterior Mail Hatch & LiDAR',
        titleJa: '外観パースペクティブ：メールハッチ & LiDAR',
        descEn: 'Shows the compact TurtleBot3 Burger structure with top-mounted 360° LiDAR and custom 3D-printed mail capsule.',
        descJa: '上部に360° LiDARを配置し、カスタム3Dプリントメールカプセルを搭載したコンパクトなTurtleBot3 Burger構造。'
      },
      'view2': {
        src: 'Robot_anatomy_3.png',
        titleEn: 'Actuation Assembly: Dual SG90 MicroServos',
        titleJa: 'アクチュエーション機構：MicroServo SG90 × 2',
        descEn: 'Driven by an onboard Arduino Uno R3 to smoothly swing open and latch the mail compartment when delivering notes.',
        descJa: '車載Arduino Uno R3によって駆動され、手紙の配達時にメールコンパートメントをスムーズに開閉・ラッチします。'
      },
      'view3': {
        src: 'Robot_anatomy_4.png',
        titleEn: 'Compute & Audio Stack: Raspberry Pi 4B + Mic/Speaker',
        titleJa: '計算・音声スタック：Raspberry Pi 4B + マイク/スピーカー',
        descEn: 'Raspberry Pi 4B runs ROS2 nodes, handles USB audio encoding for voice postcards, and plays friendly arrival chimes and topic audio.',
        descJa: 'Raspberry Pi 4BがROS2ノードを実行し、音声ポストカードのUSB録音エンコードと到着チャイム・トピック音声の再生を行います。'
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const v = views[tab.dataset.view] || views['view1'];
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = v.src;
          img.style.opacity = '1';
          const lang = localStorage.getItem('preferredLang') || 'en';
          if (title) title.textContent = lang === 'ja' ? v.titleJa : v.titleEn;
          if (desc) desc.textContent = lang === 'ja' ? v.descJa : v.descEn;
        }, 150);
      });
    });
  };

  // --- 6. Interactive Step-by-Step Flow Runner ---
  window.initFlowRunner = function (containerId, stepsData) {
    const container = document.getElementById(containerId);
    if (!container || !stepsData) return;

    const nodes = container.querySelectorAll('.flow-step-node');
    const titleEl = container.querySelector('.flow-step-h4');
    const descEl = container.querySelector('.flow-step-p');
    const actionEl = container.querySelector('.flow-step-action-text');

    function selectStep(idx) {
      nodes.forEach((n, i) => n.classList.toggle('active', i === idx));
      const step = stepsData[idx];
      if (!step) return;
      const lang = localStorage.getItem('preferredLang') || 'en';
      if (titleEl) titleEl.textContent = lang === 'ja' ? step.titleJa : step.titleEn;
      if (descEl) descEl.textContent = lang === 'ja' ? step.descJa : step.descEn;
      if (actionEl) actionEl.textContent = lang === 'ja' ? step.actionJa : step.actionEn;
    }

    nodes.forEach((node, idx) => {
      node.addEventListener('click', () => selectStep(idx));
    });

    selectStep(0);
  };

  // --- 7. Presentation Deck Mode Engine ---
  function initPresentationDeck() {
    if (!document.getElementById('presentation-deck')) {
      const deck = document.createElement('div');
      deck.id = 'presentation-deck';
      deck.innerHTML = `
        <div class="deck-header">
          <div class="deck-brand">
            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--coral);"></span>
            <span>Community Courier — Final Presentation</span>
          </div>
          <div class="deck-meta">
            <div class="deck-timing-pill" title="Presentation Schedule: 10m Pitch + 2m Demo + 3m Q&A">
              ⏱ <strong>10m</strong> Pitch · <strong>2m</strong> Demo · <strong>3m</strong> Q&A
            </div>
            <span class="deck-timer" id="deck-timer">00:00</span>
            <span id="deck-slide-num">1 / 1</span>
            <button class="presentation-bar-btn" id="deck-close-btn" style="padding:5px 14px;">✕ Exit <span class="key-badge">Esc</span></button>
          </div>
        </div>
        <div class="deck-slides-container" id="deck-slides-target"></div>
        <div class="deck-controls">
          <button class="deck-nav-btn" id="deck-prev-btn">◀ Previous <span class="key-badge">←</span></button>
          <div class="deck-progress-dots" id="deck-dots-target"></div>
          <button class="deck-nav-btn" id="deck-next-btn">Next ▶ <span class="key-badge">→ / Space</span></button>
        </div>
      `;
      document.body.appendChild(deck);
    }

    let slides = [];
    let currentSlide = 0;
    let timerInterval = null;
    let startTime = null;

    function buildSlides() {
      const sections = document.querySelectorAll('section');
      const target = document.getElementById('deck-slides-target');
      const dotsTarget = document.getElementById('deck-dots-target');
      if (!target || !sections.length) return;

      target.innerHTML = '';
      dotsTarget.innerHTML = '';
      slides = [];

      sections.forEach((sec, idx) => {
        const slide = document.createElement('div');
        const secId = sec.id || ('sec-' + idx);
        slide.className = 'deck-slide slide-' + secId + (idx === 0 ? ' active-slide' : '');
        slide.innerHTML = `<div class="inner">${sec.innerHTML}</div>`;

        // Ensure all reveal elements are immediately active and visible in the slide
        slide.querySelectorAll('.reveal, .reveal-stagger, .card, .explore-card, .rm-stop, .qa-card, .stat-counter-card').forEach(el => {
          el.classList.add('active');
          el.style.opacity = '1';
          el.style.transform = 'none';
        });

        target.appendChild(slide);
        slides.push(slide);

        const dot = document.createElement('div');
        dot.className = 'deck-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsTarget.appendChild(dot);
      });

      updateSlideHUD();
    }

    function updateSlideHUD() {
      const slideNum = document.getElementById('deck-slide-num');
      const prevBtn = document.getElementById('deck-prev-btn');
      const nextBtn = document.getElementById('deck-next-btn');
      const dots = document.querySelectorAll('.deck-dot');

      if (slideNum) slideNum.textContent = `${currentSlide + 1} / ${slides.length}`;
      if (prevBtn) prevBtn.disabled = currentSlide === 0;
      if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;

      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    function goToSlide(idx) {
      if (idx < 0 || idx >= slides.length) return;
      slides.forEach((s, i) => {
        if (i !== idx) {
          s.querySelectorAll('video').forEach(v => {
            try { v.pause(); } catch (_) {}
          });
        }
        s.classList.toggle('active-slide', i === idx);
      });
      currentSlide = idx;
      updateSlideHUD();
    }

    window.goToSlideById = function (secId) {
      const idx = slides.findIndex(s => s.classList.contains('slide-' + secId));
      if (idx !== -1) {
        goToSlide(idx);
        return true;
      }
      return false;
    };

    function startTimer() {
      startTime = Date.now();
      const timerEl = document.getElementById('deck-timer');
      timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const mins = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const secs = String(elapsed % 60).padStart(2, '0');
        if (timerEl) timerEl.textContent = `${mins}:${secs}`;
      }, 1000);
    }

    function stopTimer() {
      clearInterval(timerInterval);
    }

    window.openPresentationMode = function () {
      buildSlides();
      document.body.classList.add('presentation-active');
      goToSlide(0);
      startTimer();
    };

    window.closePresentationMode = function () {
      document.body.classList.remove('presentation-active');
      stopTimer();
    };

    document.getElementById('deck-close-btn')?.addEventListener('click', window.closePresentationMode);
    document.getElementById('deck-prev-btn')?.addEventListener('click', () => goToSlide(currentSlide - 1));
    document.getElementById('deck-next-btn')?.addEventListener('click', () => goToSlide(currentSlide + 1));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'p' || e.key === 'P') {
        if (!e.target.matches('input, textarea')) {
          if (document.body.classList.contains('presentation-active')) {
            window.closePresentationMode();
          } else {
            window.openPresentationMode();
          }
        }
      } else if (document.body.classList.contains('presentation-active')) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
          e.preventDefault();
          goToSlide(currentSlide + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          goToSlide(currentSlide - 1);
        } else if (e.key === 'Escape') {
          window.closePresentationMode();
        }
      }
    });

    if (!document.getElementById('floating-deck-btn')) {
      const floatBtn = document.createElement('button');
      floatBtn.id = 'floating-deck-btn';
      floatBtn.className = 'floating-deck-trigger';
      floatBtn.innerHTML = '▶ <span>Presentation Deck</span> <span class="key-badge" style="color:#ffffff;border-color:rgba(255,255,255,0.3);">P</span>';
      floatBtn.addEventListener('click', window.openPresentationMode);
      document.body.appendChild(floatBtn);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initScrollEngine();
    initGlobalDelegations();
    initPresentationDeck();
  });
})();

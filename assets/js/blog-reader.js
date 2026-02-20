/* ═══════════════════════════════════════════════
   AIQ — Blog Article Reader (Text-to-Speech)
   Uses the Web Speech API for client-side TTS.
   ═══════════════════════════════════════════════ */

(function () {
    'use strict';

    const btn = document.getElementById('listenBtn');
    if (!btn) return;

    const synth = window.speechSynthesis;
    if (!synth) {
        btn.style.display = 'none';
        return;
    }

    let utterance = null;
    let isPaused = false;
    let isPlaying = false;

    /* ─── Icons ─── */
    const ICON_PLAY =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
    const ICON_PAUSE =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
    const ICON_STOP =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>';

    const labelPlay = 'Listen to Article';
    const labelPause = 'Pause';
    const labelResume = 'Resume';

    /* ─── Extract readable text from article ─── */
    function getArticleText() {
        const content = document.querySelector('.article-content');
        if (!content) return '';

        const cloned = content.cloneNode(true);

        // Remove elements we don't want read aloud
        cloned.querySelectorAll('.back-to-blog, .article-cta, #listenBtn, .listen-bar').forEach(function (el) {
            el.remove();
        });

        return cloned.textContent
            .replace(/\s+/g, ' ')
            .trim();
    }

    /* ─── Pick the best male voice available ─── */
    function pickVoice() {
        const voices = synth.getVoices();
        if (!voices.length) return null;

        // Preference list: natural-sounding male English voices
        const preferred = [
            'Google UK English Male',
            'Microsoft David',
            'Microsoft Mark',
            'Google US English',
            'Daniel',
            'Alex',
            'David',
            'Mark',
        ];

        // 1. Try exact match from preference list
        for (const name of preferred) {
            const v = voices.find(function (voice) {
                return voice.name.indexOf(name) !== -1 && voice.lang.indexOf('en') === 0;
            });
            if (v) return v;
        }

        // 2. Fallback: any English male voice
        const male = voices.find(function (v) {
            return v.lang.indexOf('en') === 0 &&
                (v.name.toLowerCase().indexOf('male') !== -1 ||
                    v.name.indexOf('David') !== -1 ||
                    v.name.indexOf('Daniel') !== -1 ||
                    v.name.indexOf('Mark') !== -1 ||
                    v.name.indexOf('James') !== -1);
        });
        if (male) return male;

        // 3. Fallback: any English voice
        const english = voices.find(function (v) {
            return v.lang.indexOf('en') === 0;
        });
        if (english) return english;

        return voices[0];
    }

    /* ─── Update button state ─── */
    function setButton(icon, label, state) {
        btn.querySelector('.listen-icon').innerHTML = icon;
        btn.querySelector('.listen-label').textContent = label;
        btn.setAttribute('data-state', state);
    }

    /* ─── Stop handler ─── */
    const stopBtn = document.getElementById('listenStopBtn');

    function stopSpeech() {
        synth.cancel();
        isPlaying = false;
        isPaused = false;
        setButton(ICON_PLAY, labelPlay, 'idle');
        if (stopBtn) stopBtn.classList.remove('visible');
    }

    /* ─── Main click handler ─── */
    btn.addEventListener('click', function () {
        if (!isPlaying && !isPaused) {
            // Start fresh
            const text = getArticleText();
            if (!text) return;

            utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.95;
            utterance.pitch = 1;
            utterance.volume = 1;

            const voice = pickVoice();
            if (voice) utterance.voice = voice;

            utterance.onend = function () {
                stopSpeech();
            };

            utterance.onerror = function () {
                stopSpeech();
            };

            synth.speak(utterance);
            isPlaying = true;
            isPaused = false;
            setButton(ICON_PAUSE, labelPause, 'playing');
            if (stopBtn) stopBtn.classList.add('visible');

        } else if (isPlaying && !isPaused) {
            // Pause
            synth.pause();
            isPaused = true;
            isPlaying = true;
            setButton(ICON_PLAY, labelResume, 'paused');

        } else if (isPaused) {
            // Resume
            synth.resume();
            isPaused = false;
            isPlaying = true;
            setButton(ICON_PAUSE, labelPause, 'playing');
        }
    });

    if (stopBtn) {
        stopBtn.addEventListener('click', stopSpeech);
    }

    // Chrome requires voices to be loaded async
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = function () { /* voices loaded */ };
    }

    // Cancel speech on page unload
    window.addEventListener('beforeunload', function () {
        synth.cancel();
    });

})();

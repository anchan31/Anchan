class BalloonPopGame {
    constructor() {
        this.totalBalloons = 8;
        this.poppedCount = 0;
        this.balloons = [];
        this.gameCompleted = false;
        this.supportsVibrate = typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function';

        this.init();
    }

    init() {
        this.createBalloons();
        this.bindEvents();
        this.updateCounter();
    }

    createBalloons() {
        const container = document.getElementById('balloon-container');
        container.innerHTML = '';

        for (let i = 1; i <= this.totalBalloons; i++) {
            const balloon = document.createElement('div');
            balloon.className = `balloon balloon-${i}`;
            balloon.dataset.balloonId = i;

            // Use pointer events for faster taps on mobile
            const handlePointer = (e) => {
                e.preventDefault();
                this.popBalloon(e.currentTarget);
            };
            balloon.addEventListener('pointerdown', handlePointer, { passive: false });

            container.appendChild(balloon);
            this.balloons.push(balloon);
        }
    }

    popBalloon(balloon) {
        if (balloon.classList.contains('popped') || this.gameCompleted) {
            return;
        }

        // Add pop animation
        balloon.classList.add('popped');
        this.poppedCount++;

        // Create pop sound effect (optional)
        this.playPopSound();
        this.vibrate(30);

        // Update counter
        this.updateCounter();

        // Create small confetti burst at balloon location
        this.createConfettiBurst(balloon);

        // Check if game is complete
        if (this.poppedCount >= this.totalBalloons) {
            setTimeout(() => {
                this.completeGame();
            }, 500);
        }
    }

    updateCounter() {
        const remaining = this.totalBalloons - this.poppedCount;
        document.getElementById('balloonCount').textContent = `Balloons Left: ${remaining}`;
    }

    completeGame() {
        this.gameCompleted = true;

        // Mark container as done and show completion message centered
        const gameRoot = document.getElementById('balloon-game');
        gameRoot.classList.add('done');
        document.getElementById('gameMessage').style.display = 'block';

        // Create celebration confetti
        this.createCelebrationConfetti();

        // Play celebration sound (optional)
        this.playCelebrationSound();
        this.vibrate([20, 30, 20]);

        // Smooth scroll into view and focus the button for accessibility
        try {
            gameRoot.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                const btn = document.getElementById('goToNextSite');
                if (btn) btn.focus();
            }, 300);
        } catch (_) { }
    }

    createConfettiBurst(balloon) {
        const rect = balloon.getBoundingClientRect();
        const colors = ['#ff4081', '#667eea', '#4ecdc4', '#f9ca24', '#6c5ce7'];

        for (let i = 0; i < 8; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = rect.left + (rect.width / 2) + 'px';
            confetti.style.top = rect.top + (rect.height / 2) + 'px';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';

            document.body.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }
    }

    createCelebrationConfetti() {
        for (let i = 0; i < 18; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.animationDelay = '0s';
                confetti.style.animationDuration = (Math.random() * 1.2 + 1.6) + 's';

                document.body.appendChild(confetti);

                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 2600);
            }, i * 100);
        }
    }

    playPopSound() {
        // Create a simple pop sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gain = audioContext.createGain();

            oscillator.connect(gain);
            gain.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gain.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Audio not supported or blocked
        }
    }

    playCelebrationSound() {
        // Create celebration sound sequence
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

            notes.forEach((freq, index) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gain = audioContext.createGain();

                    oscillator.connect(gain);
                    gain.connect(audioContext.destination);

                    oscillator.frequency.value = freq;
                    oscillator.type = 'sine';

                    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.3);
                }, index * 150);
            });
        } catch (e) {
            // Audio not supported or blocked
        }
    }

    bindEvents() {
        // Continue button event
        document.getElementById('goToNextSite').addEventListener('click', () => {
            // Navigate to next scene using a relative path
            window.location.href = "../Scene2/Buddhu/buddhu.html";
        });
    }

    vibrate(pattern) {
        try {
            if (this.supportsVibrate) {
                navigator.vibrate(pattern);
            }
        } catch (_) { }
    }
}

// Initialize the game when page loads
window.addEventListener('load', () => {
    new BalloonPopGame();
});

// Prevent context menu on balloons (optional)
document.addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('balloon')) {
        e.preventDefault();
    }
});

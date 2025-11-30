// Romantic Birthday Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Data from the application
    const romanticMessages = [
        "Happy birthday to the love of my life! You light up my world with your smile and fill my heart with endless joy.",
        "Every day with you is a blessing, and I am grateful for you every single day. You make life beautiful.",
        "You are my sunshine, my heart, and my everything. Happy birthday, beautiful! Here's to many more years together.",
        "Your love completes me in every way, and I cherish our time together more than anything in this world.",
        "Happy birthday, my darling! Your presence makes every day brighter and more beautiful than I ever imagined.",
        "To the woman who stole my heart - you are my greatest treasure and my deepest love. Happy birthday!",
        "Every moment with you writes a new chapter of our enchanting story. May your birthday sparkle with wonder and love.",
        "You are my dream come true, my fairy tale ending, and my happily ever after. Happy birthday, my love!"
    ];

    const loveQuotes = [
        "Love is composed of a single soul inhabiting two bodies. - Aristotle",
        "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
        "You are my today and all of my tomorrows. - Leo Christopher",
        "I love you not only for what you are, but for what I am when I am with you.",
        "You make my heart sing with happiness and my soul dance with joy."
    ];

    const giftMessages = [
        "You are the greatest gift in my life!",
        "Every day with you is like unwrapping a present!",
        "My heart is yours forever and always!",
        "You make every ordinary moment extraordinary!"
    ];

    // Initialize variables
    let currentMessageIndex = 0;
    let currentQuoteIndex = 0;
    let isTyping = false;
    let musicPlaying = false;

    // Initialize all features
    initMessageRotation();
    initGiftBox();
    initBirthdayCake();
    initQuotesCarousel();
    initLoveLetter();
    initBalloons();
    initMusicControls();
    initPersonalization();
    initConfetti();


// Ensure this is called **once the DOM is loaded**:
document.addEventListener('DOMContentLoaded', initCountupTimer);

    

// Call this function after your DOM is ready
initCountupTimer();


    // Message Rotation
    function initMessageRotation() {
        const messageElement = document.getElementById('message-0');
        const prevBtn = document.getElementById('prev-message');
        const nextBtn = document.getElementById('next-message');

        if (!messageElement || !prevBtn || !nextBtn) return;

        function showMessage(index) {
            messageElement.style.opacity = '0';
            setTimeout(() => {
                messageElement.textContent = romanticMessages[index];
                messageElement.style.opacity = '1';
            }, 250);
        }

        prevBtn.addEventListener('click', () => {
            currentMessageIndex = (currentMessageIndex - 1 + romanticMessages.length) % romanticMessages.length;
            showMessage(currentMessageIndex);
        });

        nextBtn.addEventListener('click', () => {
            currentMessageIndex = (currentMessageIndex + 1) % romanticMessages.length;
            showMessage(currentMessageIndex);
        });

        // Auto-rotate messages every 10 seconds
        setInterval(() => {
            currentMessageIndex = (currentMessageIndex + 1) % romanticMessages.length;
            showMessage(currentMessageIndex);
        }, 10000);
    }

    // Gift Box - FIXED
    function initGiftBox() {
        const giftBox = document.getElementById('giftBox');
        const giftMessage = document.getElementById('giftMessage');
        
        if (!giftBox || !giftMessage) {
            console.log('Gift box elements not found');
            return;
        }

        let isOpened = false;

        console.log('Gift box initialized, adding click listener');

        giftBox.addEventListener('click', function(e) {
            console.log('Gift box clicked!');
            e.preventDefault();
            
            if (!isOpened) {
                console.log('Opening gift box...');
                giftBox.classList.add('opened');
                
                setTimeout(() => {
                    console.log('Showing gift message...');
                    giftMessage.classList.remove('hidden');
                    giftMessage.style.display = 'block';
                    triggerConfetti();
                }, 800);
                
                isOpened = true;
            }
        });

        // Make sure the gift box is clickable
        giftBox.style.cursor = 'pointer';
        giftBox.style.userSelect = 'none';
    }

    // Birthday Cake - FIXED
    function initBirthdayCake() {
        const candles = document.querySelectorAll('.candle');
        
        if (!candles.length) {
            console.log('No candles found');
            return;
        }

        let blownOutCount = 0;
        console.log('Found', candles.length, 'candles');

        candles.forEach((candle, index) => {
            candle.style.cursor = 'pointer';
            candle.style.userSelect = 'none';
            
            candle.addEventListener('click', function(e) {
                console.log('Candle', index + 1, 'clicked!');
                e.preventDefault();
                
                if (!candle.classList.contains('blown-out')) {
                    candle.classList.add('blown-out');
                    blownOutCount++;
                    console.log('Candles blown out:', blownOutCount);
                    
                    // Add visual effect
                    const flame = candle.querySelector('.flame');
                    if (flame) {
                        flame.style.opacity = '0';
                        flame.style.transform = 'scale(0)';
                    }
                    
                    if (blownOutCount === candles.length) {
                        setTimeout(() => {
                            alert('🎉 Happy Birthday! All your wishes will come true! 🎉');
                            triggerConfetti();
                        }, 500);
                    }
                }
            });
        });
    }

    // Quotes Carousel
    function initQuotesCarousel() {
        const quoteCarousel = document.querySelector('.quote-carousel');
        const dots = document.querySelectorAll('.dot');

        if (!quoteCarousel || !dots.length) return;

        // Create quote elements for all quotes
        quoteCarousel.innerHTML = '';

        loveQuotes.forEach((quote, index) => {
            const quoteDiv = document.createElement('div');
            quoteDiv.className = 'quote';
            quoteDiv.innerHTML = `<p>"${quote}"</p>`;
            if (index === 0) quoteDiv.classList.add('active');
            quoteCarousel.appendChild(quoteDiv);
        });

        const allQuotes = document.querySelectorAll('.quote');

        function showQuote(index) {
            allQuotes.forEach(quote => quote.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            if (allQuotes[index]) allQuotes[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentQuoteIndex = index;
                showQuote(currentQuoteIndex);
            });
        });

        // Auto-rotate quotes every 8 seconds
        setInterval(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % loveQuotes.length;
            showQuote(currentQuoteIndex);
        }, 8000);
    }

    // Love Letter Typewriter Effect
    function initLoveLetter() {
        const letterContent = document.getElementById('letterContent');
        
        if (!letterContent) return;

        const loveLetterText = "On this special day, I want you to know how deeply you are loved. Every sunrise brings me joy knowing I get to spend another day with you. Your laughter fills my heart with warmth, your smile brightens my darkest days, and your love gives my life meaning. You are not just my girlfriend, you are my best friend, my confidante, and my greatest love. Happy birthday to the most amazing woman in the world. I promise to love you today, tomorrow, and for all the days that follow.";
        
        let i = 0;
        
        function typeWriter() {
            if (i < loveLetterText.length && !isTyping) {
                isTyping = true;
                letterContent.innerHTML = loveLetterText.substring(0, i + 1) + '<span class="cursor">|</span>';
                i++;
                setTimeout(() => {
                    isTyping = false;
                    typeWriter();
                }, 50 + Math.random() * 50); // Vary typing speed slightly
            }
        }

        // Start typewriter effect when letter section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && i === 0) {
                    setTimeout(() => typeWriter(), 1000);
                }
            });
        });

        const loveLetterSection = document.querySelector('.love-letter-section');
        if (loveLetterSection) {
            observer.observe(loveLetterSection);
        }
    }

    // Interactive Balloons - FIXED
    function initBalloons() {
        const balloons = document.querySelectorAll('.balloon');
        const balloonMessage = document.getElementById('balloonMessage');

        if (!balloons.length || !balloonMessage) {
            console.log('Balloons or balloon message element not found');
            return;
        }

        console.log('Found', balloons.length, 'balloons');

        balloons.forEach((balloon, index) => {
            balloon.style.cursor = 'pointer';
            balloon.style.userSelect = 'none';
            
            balloon.addEventListener('click', function(e) {
                console.log('Balloon', index + 1, 'clicked!');
                e.preventDefault();
                
                if (!balloon.classList.contains('popped')) {
                    balloon.classList.add('popped');
                    const message = balloon.getAttribute('data-message');
                    
                    console.log('Balloon message:', message);
                    
                    balloonMessage.textContent = message;
                    balloonMessage.classList.remove('hidden');
                    balloonMessage.style.display = 'block';
                    
                    // Add popping effect
                    balloon.style.opacity = '0.3';
                    balloon.style.transform = 'scale(0.1)';
                    balloon.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        balloonMessage.classList.add('hidden');
                        balloonMessage.style.display = 'none';
                    }, 3000);
                    
                    triggerConfetti();
                }
            });
        });
    }

    // Music Controls
    function initMusicControls() {
        const musicBtn = document.getElementById('musicToggle');
        
        if (!musicBtn) return;

        musicBtn.addEventListener('click', () => {
            musicPlaying = !musicPlaying;
            if (musicPlaying) {
                musicBtn.textContent = '🔇 Stop Music';
                musicBtn.style.background = '#FF9A8D';
            } else {
                musicBtn.textContent = '🎵 Play Music';
                musicBtn.style.background = '#FF6F61';
            }
        });
    }

    // Personalization
    function initPersonalization() {
        const personalizeBtn = document.getElementById('personalizeBtn');
        const modal = document.getElementById('personalizationModal');
        const closeModal = document.getElementById('closeModal');
        const saveBtn = document.getElementById('savePersonalization');
        const nameInput = document.getElementById('girlfriendName');
        const messageInput = document.getElementById('customMessage');

        if (!personalizeBtn || !modal) return;

        personalizeBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.add('hidden');
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });

        if (saveBtn && nameInput && messageInput) {
            saveBtn.addEventListener('click', () => {
                const newName = nameInput.value.trim();
                const customMessage = messageInput.value.trim();

                if (newName) {
                    // Update hero subtitle
                    const heroSubtitle = document.querySelector('.hero-subtitle');
                    if (heroSubtitle) {
                        heroSubtitle.textContent = `To ${newName}, the Love of My Life`;
                    }
                }

                if (customMessage) {
                    // Add custom message to the beginning of romantic messages array
                    romanticMessages.unshift(customMessage);
                    currentMessageIndex = 0;
                    const messageElement = document.getElementById('message-0');
                    if (messageElement) {
                        messageElement.textContent = customMessage;
                    }
                }

                modal.classList.add('hidden');
                
                // Show confirmation
                setTimeout(() => {
                    alert('✨ Personalization saved! Your special touches have been added! ✨');
                }, 500);
            });
        }
    }

    // Confetti Animation
    function initConfetti() {
        // Trigger confetti every 30 seconds
        setInterval(triggerConfetti, 30000);
        
        // Initial confetti after 3 seconds
        setTimeout(triggerConfetti, 3000);
    }

    function triggerConfetti() {
        const confettiContainer = document.getElementById('confettiContainer');
        
        if (!confettiContainer) return;

        const colors = ['#FF6F61', '#FF9A8D', '#F7C6C7', '#EAB8C9', '#FFD700', '#FF1493'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 4000);
        }
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(section);
    });

    // Hero section should always be visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }

    // Random love notes that appear occasionally
    const randomLoveNotes = [
        "💖 You're amazing!",
        "🌟 You light up my world!",
        "💝 Love you more each day!",
        "🦋 You make me smile!",
        "💕 Forever yours!"
    ];

    function showRandomLoveNote() {
        const note = document.createElement('div');
        note.className = 'love-note';
        note.textContent = randomLoveNotes[Math.floor(Math.random() * randomLoveNotes.length)];
        note.style.cssText = `
            position: fixed;
            top: ${Math.random() * 50 + 20}%;
            left: ${Math.random() * 80 + 10}%;
            background: rgba(255, 255, 255, 0.9);
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 14px;
            color: #FF6F61;
            font-weight: 500;
            z-index: 1000;
            animation: fadeInOut 4s ease-in-out;
            pointer-events: none;
            box-shadow: 0 4px 15px rgba(255, 111, 97, 0.3);
        `;

        document.body.appendChild(note);
        
        setTimeout(() => {
            if (note.parentNode) {
                note.parentNode.removeChild(note);
            }
        }, 4000);
    }

    // Show random love notes every 15-25 seconds
    setInterval(showRandomLoveNote, Math.random() * 10000 + 15000);

    // Add CSS for love notes animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(20px) scale(0.8); }
            20%, 80% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-20px) scale(0.8); }
        }
    `;
    document.head.appendChild(style);

    // Easter eggs - Special clicks
    let clickCount = 0;
    document.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 50) {
            alert('🎉 You found the secret! You clicked 50 times! Here\'s an extra special message: You are absolutely incredible and deserve all the love in the world! 🎉');
            triggerConfetti();
        }
    });

    console.log('🎉 Happy Birthday Beautiful! 🎂💖');
    console.log('All interactive elements initialized');
});
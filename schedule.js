document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.getElementById('confetti-container');
    const finalMatchCard = document.querySelector('.final-match');

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        confetti.style.backgroundColor = Math.random() > 0.5 ? 'var(--red-prime)' : 'var(--white-prime)';
        confetti.style.width = Math.random() * 8 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

        confettiContainer.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }

    // Fungsi baru untuk membuat efek sparkle
    function createSparkle() {
        if (!finalMatchCard) return;

        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Posisi sparkle di dalam kartu final secara acak
        const cardRect = finalMatchCard.getBoundingClientRect();
        const topOffset = Math.random() * cardRect.height;
        const leftOffset = Math.random() * cardRect.width;

        sparkle.style.top = topOffset + 'px';
        sparkle.style.left = leftOffset + 'px';
        
        // Ukuran sparkle acak
        const size = Math.random() * 3 + 2; // 2-5px
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';

        // Durasi animasi acak
        sparkle.style.animationDuration = (Math.random() * 1 + 1.5) + 's';

        finalMatchCard.appendChild(sparkle);

        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    }

    // Generate a burst of confetti on page load
    for (let i = 0; i < 70; i++) {
        createConfetti();
    }

    // Trigger confetti on hover over final match
    if (finalMatchCard) {
        finalMatchCard.addEventListener('mouseenter', () => {
            for (let i = 0; i < 30; i++) {
                createConfetti();
            }
        });
        
        // Mulai efek sparkle terus-menerus
        setInterval(createSparkle, 200); // Buat sparkle baru setiap 200ms
    }

    // Continuous subtle confetti effect (optional)
    setInterval(() => {
        if (confettiContainer.children.length < 50) {
            createConfetti();
        }
    }, 500);
});
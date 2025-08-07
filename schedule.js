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
// --- Logika untuk menampilkan nama peserta saat hover ---
document.addEventListener('DOMContentLoaded', function() {
    // Data nama peserta untuk setiap tim
    const teamRosters = {
        "たこやき": ["Yudi", "Reza", "Istohari", "Aldi", "Rifki", "Ade", "Hendri"],
        "すきやき": ["Reza", "Ferdi", "Rafi", "Lathif", "Damar", "Andriyan", "Wildan", "Dani"],
        "さしみ": ["Sendi", "Saiful", "Jamal", "Rendi", "Syafiq", "Imam", "Farhan"],
        "おにぎり": ["Alfin", "Alek", "Arya", "Nizar", "Ade", "Puji", "Yasin", "Febi", "Edi"],
        "おやこどん": ["Arya", "Ponco", "Alamsyah", "Mahda", "Gammabiolie", "Bagas", "Prasya"],
        "からあげ": ["Yunan", "Tawa", "Dede", "Aditya", "Kurniawan", "Rizki", "Aditya", "Apriyanto"],
        "ハンバーグ": ["Fia", "Ika", "Malikha", "Hadi", "Nogi", "Indriani", "Bekti", "Pahmi"],
        "おこのみやき": ["Oban", "Ajad", "Sohibin", "Ridho", "Bima", "Fadillah", "Windu"],
        "うどん": ["Fikri", "Todi", "Ardi", "Yudha", "Marshel", "Rizal", "Putra", "Dzuhrianto"],
        "ぎゅうどん": ["Saleh", "Husni", "Nizar", "Adin", "Agus", "Encep", "Fakih", "Faris"],
        "ぎょうざ": ["Ramanda", "Grafi", "Yodi", "Hendrik", "Goga", "Yogi", "Rafli", "Aldi"],
        "ラーメン": ["Dhidan", "Saepul", "Khusnul", "Dani", "Cahsono", "Yudistira", "Eka", "Fitrio"],
        "てんぷら": ["Aldi", "Marcelino", "Iqbal", "Niko", "Kholil", "Alek", "Syamsul", "Fandi"],
        "すし": ["Sugiarto", "Tiara", "Siva", "Adit", "Sindi", "Thoya", "Kaka", "Wisnu"],
        "スタッフ": ["Wili Kojouchou", "Didi Buchou", "RCR Ridwan", "DMI Fajri", "CP Bayu", "Pembinaan Eggy", "Pembinaan Andika", "Pembinaan Milki"],
        "わたり": ["Indri", "Caca", "Lina", "Desti", "Ellis", "Zahwa", "Susi"]
    };

    const teamElements = document.querySelectorAll('.team');

    teamElements.forEach(teamElement => {
        let tooltip; // Variabel untuk menyimpan elemen tooltip

        teamElement.addEventListener('mouseenter', (event) => {
            const teamName = teamElement.textContent.trim();
            const roster = teamRosters[teamName];

            if (roster) {
                // Buat elemen tooltip
                tooltip = document.createElement('div');
                tooltip.classList.add('team-roster-tooltip');

                // Buat daftar nama
                const rosterList = roster.map(name => `<li>${name}</li>`).join('');
                tooltip.innerHTML = `<h4>Tim ${teamName}</h4><ul>${rosterList}</ul>`;

                // Atur posisi tooltip
                const rect = event.target.getBoundingClientRect();
                tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                tooltip.style.left = `${rect.left + window.scrollX}px`;

                document.body.appendChild(tooltip);
            }
        });

        teamElement.addEventListener('mouseleave', () => {
            // Hapus tooltip saat kursor keluar
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });
});
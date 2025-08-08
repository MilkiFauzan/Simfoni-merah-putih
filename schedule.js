document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.getElementById('confetti-container');
    const finalMatchCards = document.querySelectorAll('.final-match');
    const teamElements = document.querySelectorAll('.team');

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

    // Fungsi untuk membuat dan meletakkan confetti
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
        confetti.addEventListener('animationend', () => confetti.remove());
    }

    // Fungsi untuk membuat dan meletakkan sparkle di dalam sebuah elemen container
    function createSparkle(container) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        const cardRect = container.getBoundingClientRect();
        const topOffset = Math.random() * cardRect.height;
        const leftOffset = Math.random() * cardRect.width;
        sparkle.style.top = topOffset + 'px';
        sparkle.style.left = leftOffset + 'px';
        const size = Math.random() * 3 + 2;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        sparkle.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        container.appendChild(sparkle);
        sparkle.addEventListener('animationend', () => sparkle.remove());
    }

    // Awal: Memulai efek confetti dan sparkle
    if (confettiContainer) {
        for (let i = 0; i < 70; i++) {
            createConfetti();
        }
        setInterval(() => {
            if (confettiContainer.children.length < 50) {
                createConfetti();
            }
        }, 500);
    }
    
    // Mulai efek sparkle terus-menerus di semua kartu final
    if (finalMatchCards.length > 0) {
        finalMatchCards.forEach(card => {
            setInterval(() => {
                createSparkle(card);
            }, 300);
        });
    }

    // Event listener untuk tooltip
    teamElements.forEach(teamElement => {
        let tooltip;
        teamElement.addEventListener('mouseenter', (event) => {
            const teamName = teamElement.textContent.trim();
            const roster = teamRosters[teamName];
            if (roster) {
                tooltip = document.createElement('div');
                tooltip.classList.add('team-roster-tooltip');
                const rosterList = roster.map(name => `<li>${name}</li>`).join('');
                tooltip.innerHTML = `<h4>Tim ${teamName}</h4><ul>${rosterList}</ul>`;
                const rect = event.target.getBoundingClientRect();
                tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
                tooltip.style.left = `${rect.left + window.scrollX}px`;
                document.body.appendChild(tooltip);
            }
        });
        teamElement.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });

    // Modal Gambar (seperti kode Anda)
    const showImageBtn = document.getElementById("showImageBtn");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close");
    const imageURL = "Bagan-turnamen-voli.png";

    if (showImageBtn) {
        showImageBtn.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = imageURL;
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
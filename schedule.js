document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.getElementById('confetti-container');
    const finalMatchCards = document.querySelectorAll('.final-match');
    const teamElements = document.querySelectorAll('.team');
document.addEventListener('DOMContentLoaded', () => {
    const confettiContainer = document.getElementById('confetti-container');
    const finalMatchCards = document.querySelectorAll('.final-match');
    const teamElements = document.querySelectorAll('.team');

    // --- Kode baru untuk animasi pemenang ---
    const winnerAnimationContainer = document.getElementById('winner-animation-container');
    const winnerNameElement = document.getElementById('winner-name');

    // Mencari kartu pertandingan final dengan teks "Final"
    const finalMatchCard = Array.from(finalMatchCards).find(card => {
        const matchNumber = card.querySelector('.match-number');
        return matchNumber && matchNumber.textContent.trim() === 'Final';
    });

    if (finalMatchCard) {
        const finalTeam1 = finalMatchCard.querySelector('.team:nth-of-type(1)').textContent.trim();
        const finalTeam2 = finalMatchCard.querySelector('.team:nth-of-type(2)').textContent.trim();
        const finalScores = finalMatchCard.querySelectorAll('.set-score');

        let score1 = 0;
        let score2 = 0;

        // Menghitung skor set untuk menentukan pemenang
        finalScores.forEach(scoreElement => {
            const scoreText = scoreElement.textContent.trim();
            const [team1Score, team2Score] = scoreText.split('-').map(Number);
            
            if (team1Score > team2Score) {
                score1++;
            } else if (team2Score > team1Score) {
                score2++;
            }
        });
        
        const winner = score1 > score2 ? finalTeam1 : finalTeam2;

        if (winner) {
            winnerNameElement.textContent = winner;
            winnerAnimationContainer.style.display = 'block';

            setTimeout(() => {
                winnerAnimationContainer.classList.add('show');
                setTimeout(() => {
                    winnerAnimationContainer.classList.remove('show');
                    setTimeout(() => {
                        winnerAnimationContainer.style.display = 'none';
                    }, 500);
                }, 5000); // Durasi pop-up 5 detik
            }, 500);
        }
    }
    // --- Akhir kode baru untuk animasi pemenang ---

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

    // Memulai efek confetti dan sparkle
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
                document.body.appendChild(tooltip);
                
                const teamRect = teamElement.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                
                let top = teamRect.top - tooltipRect.height - 10;
                let left = teamRect.left + (teamRect.width / 2) - (tooltipRect.width / 2);

                if (top < 0) {
                    top = teamRect.bottom + 10;
                    tooltip.classList.add('bottom-tooltip');
                    tooltip.style.top = top + 'px';
                    tooltip.style.left = left + 'px';
                } else {
                    tooltip.style.top = top + 'px';
                    tooltip.style.left = left + 'px';
                }
            }
        });
        
        teamElement.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });

    // Modal logic
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const showImageBtn = document.getElementById("showImageBtn");
    const closeBtn = document.getElementsByClassName("close")[0];

    showImageBtn.onclick = function() {
        modal.style.display = "block";
        modalImage.src = "assets/bagan.jpg";
    }

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});

    // --- Kode baru untuk animasi pemenang ---
    const winnerAnimationContainer = document.getElementById('winner-animation-container');
    const winnerNameElement = document.getElementById('winner-name');

    // Tentukan pemenang dari pertandingan final
    const finalMatch = document.querySelector('.final-match .match-number:last-of-type');
    let winner = null;
    if (finalMatch) {
        // Ambil nama tim pemenang, diasumsikan pemenang ada di tim pertama jika skor set lebih banyak
        const finalTeam1 = finalMatch.parentElement.querySelector('.team:nth-of-type(1)').textContent.trim();
        const finalTeam2 = finalMatch.parentElement.querySelector('.team:nth-of-type(2)').textContent.trim();
        const finalScores = finalMatch.parentElement.querySelectorAll('.set-score');

        let score1 = 0;
        let score2 = 0;

        // Hitung skor set
        for (let i = 0; i < finalScores.length; i++) {
            const score = finalScores[i].textContent.trim().split('-');
            const team1Score = parseInt(score[0]);
            const team2Score = parseInt(score[1]);

            if (team1Score > team2Score) {
                score1++;
            } else if (team2Score > team1Score) {
                score2++;
            }
        }
        
        // Tentukan pemenang berdasarkan skor set tertinggi
        winner = score1 > score2 ? finalTeam1 : finalTeam2;

        if (winner) {
            winnerNameElement.textContent = winner;
            winnerAnimationContainer.style.display = 'block'; // Tampilkan container
            
            // Atur waktu untuk animasi
            setTimeout(() => {
                winnerAnimationContainer.classList.add('show');
                // Setelah 5 detik, sembunyikan animasi
                setTimeout(() => {
                    winnerAnimationContainer.classList.remove('show');
                    setTimeout(() => {
                        winnerAnimationContainer.style.display = 'none';
                    }, 500); // Tunggu sampai transisi selesai
                }, 5000);
            }, 500);
        }
    }
    // --- Akhir kode baru untuk animasi pemenang ---


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
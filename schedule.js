document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi skor semua pertandingan menjadi "0 - 0" saat halaman dimuat
    document.querySelectorAll('.match .score').forEach(scoreDiv => {
        scoreDiv.textContent = '0 - 0';
    });

    // Nonaktifkan semua tombol di awal kecuali untuk Ronde 1
    const rounds = ['round2', 'round3', 'round4'];
    rounds.forEach(roundId => {
        const roundElement = document.getElementById(roundId);
        if (roundElement) {
            const buttons = roundElement.querySelectorAll('.match-actions button');
            buttons.forEach(button => button.disabled = true);
        }
    });
});

function setWinner(matchId, winnerTeamId) {
    const matchElement = document.getElementById(matchId);
    const winnerTeamElement = document.getElementById(winnerTeamId);
    // Temukan elemen tim lawan
    const loserTeamElement = Array.from(matchElement.querySelectorAll('.team')).find(
        team => team.id !== winnerTeamId
    );
    const scoreElement = matchElement.querySelector('.score');
    const buttons = matchElement.querySelectorAll('.match-actions button');

    // Pastikan pertandingan belum selesai (untuk menghindari double-klik)
    if (winnerTeamElement.classList.contains('winner') || loserTeamElement.classList.contains('winner')) {
        return; 
    }

    // Set skor (contoh: 2-1 untuk pemenang, 1-2 untuk yang kalah)
    const winnerScore = 2; 
    const loserScore = 1;  
    
    // Perbarui teks skor
    scoreElement.textContent = `${winnerScore} - ${loserScore}`;

    // Tandai pemenang dan kalah dengan kelas CSS
    winnerTeamElement.classList.add('winner');
    loserTeamElement.classList.add('loser'); 
    matchElement.classList.add('winner-highlight'); // Sorot pertandingan yang sudah selesai

    // Nonaktifkan tombol setelah pemenang dipilih
    buttons.forEach(button => {
        button.disabled = true;
    });

    // Pindahkan pemenang ke pertandingan berikutnya
    advanceWinner(matchId, winnerTeamElement.textContent);
}

function advanceWinner(currentMatchId, winnerName) {
    // Peta untuk menentukan pertandingan dan slot tim berikutnya
    const matchMap = {
        'match1-1': 'team2-1a',
        'match1-2': 'team2-1b',
        'match1-3': 'team2-2a',
        'match1-4': 'team2-2b',
        'match1-5': 'team2-3a',
        'match1-6': 'team2-3b',
        'match1-7': 'team2-4a',
        'match1-8': 'team2-4b',
        'match2-1': 'team3-1a',
        'match2-2': 'team3-1b',
        'match2-3': 'team3-2a',
        'match2-4': 'team3-2b',
        'match3-1': 'team4-1a',
        'match3-2': 'team4-1b',
    };

    const nextTeamId = matchMap[currentMatchId];

    if (nextTeamId) {
        const nextTeamElement = document.getElementById(nextTeamId);
        if (nextTeamElement) {
            nextTeamElement.textContent = winnerName;
            
            // Periksa apakah kedua tim di pertandingan berikutnya sudah ditentukan
            const nextMatchId = nextTeamElement.closest('.match').id;
            const teamA = document.getElementById(nextMatchId + 'a');
            const teamB = document.getElementById(nextMatchId + 'b');

            // Jika kedua slot tim sudah terisi DAN tidak lagi menunjukkan placeholder "Pemenang MXX-Y"
            if (teamA && teamB && !teamA.textContent.includes('Pemenang') && !teamB.textContent.includes('Pemenang')) {
                const nextMatchButtons = document.getElementById(nextMatchId).querySelectorAll('.match-actions button');
                nextMatchButtons.forEach(button => button.disabled = false); // Aktifkan tombol untuk pertandingan berikutnya
            }
        }
    } else if (currentMatchId === 'match4-1') {
        // Jika ini adalah pertandingan final, umumkan juara dan panggil confetti
        const championElement = document.getElementById('champion');
        championElement.textContent = winnerName + " - Juara!";
        championElement.classList.add('champion-winner'); 
        triggerConfetti(); 
    }
}

function triggerConfetti() {
    const confettiContainer = document.querySelector('.confetti-container');
    // Warna-warna cerah untuk confetti
    const colors = ['#f39c12', '#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#1abc9c', '#f1c40f', '#e67e22', '#c0392b']; 

    for (let i = 0; i < 150; i++) { // Jumlah confetti yang lebih banyak
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw'; // Posisi horizontal acak
        confetti.style.width = (Math.random() * 5 + 5) + 'px'; // Ukuran acak
        confetti.style.height = (Math.random() * 5 + 5) + 'px';
        confetti.style.animationDelay = Math.random() * 3 + 's'; // Penundaan animasi acak
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's'; // Durasi animasi acak
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Rotasi awal acak
        confettiContainer.appendChild(confetti);

        // Hapus elemen confetti setelah animasinya selesai untuk performa yang lebih baik
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}
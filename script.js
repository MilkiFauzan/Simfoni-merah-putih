document.addEventListener('DOMContentLoaded', function() {

    // Memilih semua elemen yang memiliki kelas 'animasi'
    const elemenAnimasi = document.querySelectorAll('.animasi');

    // Opsi untuk Intersection Observer
    // threshold: 0.1 berarti animasi akan terpicu ketika 10% dari elemen terlihat
    const options = {
        root: null, // null berarti viewport browser
        rootMargin: '0px',
        threshold: 0.1
    };

    // Membuat observer baru
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            // Jika elemen masuk ke dalam viewport
            if (entry.isIntersecting) {
                // Tambahkan kelas 'aktif' untuk memicu transisi CSS
                entry.target.classList.add('aktif');
                
                // Hentikan pengamatan pada elemen ini agar animasi tidak berulang
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Memberitahu observer untuk mengamati setiap elemen yang dipilih
    elemenAnimasi.forEach(elemen => {
        observer.observe(elemen);
    });

});
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('confetti-container');
  const CONFETTI_COUNT = 200; // Jumlah confetti
  const COLORS = ['#FF0000', '#FFFFFF']; // Warna merah dan putih

  // Fungsi untuk membuat satu kepingan confetti
  const createConfetti = () => {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    // Properti acak untuk setiap kepingan
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const xPosition = Math.random() * 100 + 'vw';
    const animationDuration = (Math.random() * 4) + 3 + 's'; // Durasi antara 3-7 detik
    const fallDelay = Math.random() * 5 + 's'; // Penundaan jatuh yang berbeda-beda
    const width = Math.floor(Math.random() * 8) + 8 + 'px'; // Lebar antara 8-16px
    const height = Math.floor(Math.random() * 10) + 10 + 'px'; // Tinggi antara 10-20px

    // Terapkan gaya ke elemen
    confetti.style.backgroundColor = color;
    confetti.style.left = xPosition;
    confetti.style.width = width;
    confetti.style.height = height;
    confetti.style.animationDuration = animationDuration;
    confetti.style.animationDelay = fallDelay;

    // Tambahkan confetti ke wadah
    container.appendChild(confetti);

    // Hapus confetti dari HTML setelah animasinya selesai
    setTimeout(() => {
      confetti.remove();
    }, 7000); // Harus lebih lama dari durasi animasi terlama
  };

  // Langsung jalankan pembuatan confetti sebanyak CONFETTI_COUNT
  for (let i = 0; i < CONFETTI_COUNT; i++) {
    createConfetti();
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('confetti-container');
  const statusDisplay = document.getElementById('status');
  const COLORS = ['#FF0000', '#FFFFFF'];

  // Variabel untuk melacak status confetti
  let isConfettiActive = true;

  // Fungsi untuk membuat satu kepingan confetti
  const createConfetti = () => {
    // Hanya buat confetti jika statusnya aktif
    if (!isConfettiActive) return;

    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    // Properti acak
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const xPosition = Math.random() * 100 + 'vw';
    const fallDelay = Math.random() * 5;
    const animationDuration = (Math.random() * 3) + 4 + 's';
    
    // Terapkan gaya
    confetti.style.backgroundColor = color;
    confetti.style.left = xPosition;
    confetti.style.animationDelay = fallDelay + 's';
    confetti.style.animationDuration = animationDuration;

    container.appendChild(confetti);

    // Hapus elemen setelah selesai jatuh
    setTimeout(() => {
      confetti.remove();
    }, (parseFloat(animationDuration) + fallDelay) * 1000);
  };

  // --- KUNCI UTAMA SIKLUS ---

  // 1. Atur interval untuk membuat confetti secara cepat
  //    Interval ini akan selalu berjalan, tetapi hanya akan
  //    menghasilkan confetti jika isConfettiActive = true.
  setInterval(createConfetti, 100);

  // 2. Atur interval untuk mengubah status setiap 10 detik
  setInterval(() => {
    // Balikkan status (dari true ke false, atau sebaliknya)
    isConfettiActive = !isConfettiActive;
    
    // Perbarui teks status di layar
    statusDisplay.textContent = `Status: Konfeti ${isConfettiActive ? 'Aktif' : 'Berhenti'}`;
  }, 10000); // 10000 ms = 10 detik
});
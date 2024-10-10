// book-summary.js

// Ambil elemen input dan semua kartu artikel
const searchInput = document.getElementById('searchInput');
const cardArticles = document.querySelectorAll('.card__article');

// Tambahkan event listener untuk menangani input pencarian
searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase(); // Ambil nilai input dan ubah menjadi huruf kecil

    // Iterasi melalui semua kartu artikel
    cardArticles.forEach(function (card) {
        const title = card.querySelector('.card__title').textContent.toLowerCase(); // Ambil judul dan ubah menjadi huruf kecil

        // Cek apakah judul berisi nilai pencarian
        if (title.includes(searchValue)) {
            card.style.display = ''; // Tampilkan kartu jika cocok
        } else {
            card.style.display = 'none'; // Sembunyikan kartu jika tidak cocok
        }
    });
});
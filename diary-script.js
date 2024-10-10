function saveEntry() {
    const diaryInput = document.getElementById('diaryInput');
    const diaryEntries = document.getElementById('diaryEntries');

    // Cek apakah input kosong
    if (diaryInput.value.trim() === '') {
        alert('Please enter some text before saving.');
        return;
    }

    const newEntry = document.createElement('div');

    // Buat entri dengan tanggal dan waktu
    const date = new Date();
    const formattedDate = date.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });

    newEntry.className = 'diary-entry';
    newEntry.innerHTML = `
        <strong>${formattedDate}</strong>
        <p>${diaryInput.value}</p>
        <button onclick="removeEntry(this)">Remove</button>
    `;
    diaryEntries.appendChild(newEntry);

    // Simpan entri ke localStorage
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.push({
        date: formattedDate,
        content: diaryInput.value
    });
    localStorage.setItem('diaryEntries', JSON.stringify(entries));

    // Kosongkan kolom input
    diaryInput.value = '';
}

// Fungsi untuk memuat entri dari localStorage
function loadEntries() {
    const diaryEntries = document.getElementById('diaryEntries');
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    entries.forEach((entry, index) => {
        const newEntry = document.createElement('div');
        newEntry.className = 'diary-entry';
        newEntry.innerHTML = `
            <strong>${entry.date}</strong>
            <p>${entry.content}</p>
            <button onclick="removeEntry(this, ${index})">Remove</button>
        `;
        diaryEntries.appendChild(newEntry);
    });
}

// Fungsi untuk menghapus entri
function removeEntry(button, index) {
    const entryElement = button.parentElement;
    entryElement.remove();

    // Hapus dari localStorage
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
}

// Panggil loadEntries saat halaman dimuat
window.onload = function() {
    loadEntries();
};
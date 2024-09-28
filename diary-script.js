function saveEntry() {
    const diaryInput = document.getElementById('diaryInput');
    const diaryEntries = document.getElementById('diaryEntries');
    const newEntry = document.createElement('div');

    // Create entry with date and time
    const date = new Date();
    const formattedDate = date.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });

    newEntry.className = 'diary-entry';
    newEntry.innerHTML = `<strong>${formattedDate}</strong><p>${diaryInput.value}</p>`;
    diaryEntries.appendChild(newEntry);

    // Save entry to localStorage
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.push({
        date: formattedDate,
        content: diaryInput.value
    });
    localStorage.setItem('diaryEntries', JSON.stringify(entries));

    // Clear input field
    diaryInput.value = '';
}

// Function to load entries from localStorage
function loadEntries() {
    const diaryEntries = document.getElementById('diaryEntries');
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    entries.forEach(entry => {
        const newEntry = document.createElement('div');
        newEntry.className = 'diary-entry';
        newEntry.innerHTML = `<strong>${entry.date}</strong><p>${entry.content}</p>`;
        diaryEntries.appendChild(newEntry);
    });
}

// Call loadEntries on page load
window.onload = function() {
    loadEntries();
};
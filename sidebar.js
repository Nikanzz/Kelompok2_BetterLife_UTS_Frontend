document.addEventListener('DOMContentLoaded' , () => {
    const hamburger = document.querySelector('#hamburger');
    const featureList = document.querySelector('.feature-list');
    const menuBtn = document.querySelectorAll('a');
    const aside = document.querySelector('aside');

    hamburger.addEventListener('click', () => {
        featureList.classList.toggle('hidden');
        menuBtn.forEach(btn => {
            btn.classList.toggle('hidden');
        })
        hamburger.classList.toggle('hidden');
        aside.classList.toggle('hidden');
    })
})
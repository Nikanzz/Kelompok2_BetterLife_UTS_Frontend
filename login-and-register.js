document.addEventListener('DOMContentLoaded', () => {
    const registerLink = document.getElementById('register-link');
    const loginLink = document.getElementById('login-link');
    const registerView = document.querySelector('.register');
    const loginView = document.querySelector('.login');
    const login = document.querySelector('.login form');
    const register = document.querySelector('.register form');
    console.log(login)

    registerLink.addEventListener('click', () => {
        loginView.classList.add('active');
        registerView.classList.add('active');
    });

    loginLink.addEventListener('click', () => {
        loginView.classList.remove('active');
        registerView.classList.remove('active');
    });

    register.addEventListener('submit', () => {
        const username = register.querySelector('#username').value;
        const email = register.querySelector('#email').value;
        const password = register.querySelector('#password').value;
        if(username === '' || email === '' || password === ''){
            alert('Please fill in all fields correctly!');
        } else {
            alert('Registration successfull!');
            loginView.classList.remove('active');
            registerView.classList.remove('active');
        }
    })

    login.addEventListener('submit' , (e) => {
        e.preventDefault();
        const email = login.querySelector('#email').value;
        const password = login.querySelector('#password').value;
        if(email === '' || password === ''){
            alert('Please fill in all fields correctly!')
        } else {
            window.location.href = 'Home.html';
        }
    } )
});
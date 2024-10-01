document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.querySelector('#reset');
    const startButton = document.querySelector('#start');
    const pauseButton = document.querySelector('#pause');

    let focusSession = document.getElementById('focus-session');
    let breaksession = document.getElementById('break-session');
    let currentSession = 'focus';

    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');
    let workTime = 25; 
    let breakTime = 5; 
    let intervalId;
    let isPaused = false;

    resetButton.addEventListener('click' , reset);
    startButton.addEventListener('click' , start);
    pauseButton.addEventListener('click' , pause);

    window.onload = () => {
        seconds.innerHTML = '0' + seconds.innerHTML;
        focusSession.disabled = true;
        breaksession.disabled = true;
    }

    breaksession.addEventListener('click', () => {
        if (!breaksession.disabled && currentSession !== 'break'){
            changeSession();
        }
    })

    focusSession.addEventListener('click', () => {
        if (!focusSession.disabled && currentSession !== 'focus'){
            changeSession();
        }
    })

    function start(){
        document.getElementById('start').style.display = 'none';
        document.getElementById('reset').style.display = 'block';
        setActiveButton('focus');
        focusSession.disabled = false;
        breaksession.disabled = false;
        countDown();
        intervalId = setInterval(countDown, 1000);
    }

    function setActiveButton(session){
        if (session === 'focus'){
            focusSession.classList.add('active');
            breaksession.classList.remove('active');
        } else {
            breaksession.classList.add('active');
            focusSession.classList.remove('active');
        }
    }

    function changeSession(){
        if (currentSession === 'focus'){
            currentSession = 'break';
            minutes.innerHTML = breakTime;
        } else {
            currentSession = 'focus';
            minutes.innerHTML = workTime;
        }
        seconds.innerHTML = '00';
        setActiveButton(currentSession);
    }

    function countDown(){
        seconds.innerHTML = seconds.innerHTML - 1;
        if(seconds.innerHTML < 10 && seconds.innerHTML >= 0){
            seconds.innerHTML = '0' + seconds.innerHTML;
        }

        if(seconds.innerHTML < 0){
            seconds.innerHTML = 59;
            minutes.innerHTML--;
            if(minutes.innerHTML < 0){
                changeSession();
            }
        } 
    }

    function reset(){
        clearInterval(intervalId);
        minutes.innerHTML = workTime;
        seconds.innerHTML = '00';
        breakCount = 0;
        intervalId = undefined;
        isPaused = false;
        currentSession = 'focus';

        document.getElementById('pause-icon').style.display = 'block';
        document.getElementById('play-icon').style.display = 'none';

        document.getElementById('start').style.display = 'block';
        document.getElementById('reset').style.display = 'none';

        breaksession.classList.remove('active');
        focusSession.classList.remove('active');

        focusSession.disabled = true;
        breaksession.disabled = true;
    }

    function pause(){
        if(intervalId){
            if(isPaused) {
                intervalId = setInterval(countDown, 1000);
                document.getElementById('pause-icon').style.display = 'block';
                document.getElementById('play-icon').style.display = 'none';

                focusSession.disabled = false;
                breaksession.disabled = false;
            } else {
                clearInterval(intervalId);
                document.getElementById('play-icon').style.display = 'block';
                document.getElementById('pause-icon').style.display = 'none';

                focusSession.disabled = true;
                breaksession.disabled = true;
            }
            isPaused = !isPaused;
        }
    }
})
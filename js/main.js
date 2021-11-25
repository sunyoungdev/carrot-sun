import * as Sound from "./sound.js";

const timeZone = document.querySelector('.time-zone span');
const counter = document.querySelector('.counter span');
const gameField = document.querySelector('.game-field');
const modal = document.querySelector('.modal');
const gameBtn = document.querySelector('.game-btn');

let sec = 5;
let nIntervId;
let count = 0;
let isGameStart = false;


// handle game button
const play = () => {
    gameBtn.classList.remove('play');
    gameBtn.classList.add('stop');
    setTimer();
    isGameStart = true;
    Sound.playBg();
}
const stop = () => {
    gameBtn.classList.remove('stop');
    gameBtn.classList.add('play');
    stopTimer();
    isGameStart = false;
    Sound.stopBg();
}
gameBtn.addEventListener('click', (event) => {
    console.log(event.target)
    if (event.target.dataset.id === 'play') {
        // play button
        play();
        
    } else if (event.target.dataset.id === 'stop') {
        // stop button
        stop();
    }
})

// timer 
const setTimer = () => {
    // check if already an interval has been set up
    if (!nIntervId) {
        // countdown(); // Todo: countdown 즉시실행
        nIntervId = setInterval(countdown, 1000);
    }
}
const countdown = () => {
    timeZone.textContent = `
        00:${sec >= 10 ? sec : `0${sec}`} 
    `;
    if (sec === 0) {
        youLost();
        return;
    }
    sec--;
}
const stopTimer = () => {
    clearInterval(nIntervId);
    // release our intervalID from the variable
    nIntervId = null; 
}
const resetTimer = () => {
    setTimer();
    return sec = 5;
}

// get random x, y coordinates
const random = (max, min) => {
    const randomCoord = Math.floor(Math.random() * (max - min)) + min;
    return randomCoord;
}
const calculate = () => {
    const field = gameField.getBoundingClientRect();
    const maxX = field.width - 80;
    const maxY = field.height - 80;
    const min = 0;
    const randomX = random(maxX, min);
    const randomY = random(maxY, min);
    // console.log(randomX, randomY);

    return {randomX: randomX, randomY: randomY};
}

window.addEventListener('resize', () => {
    calculate();
})
// calculate();

// draw carrots, bugs randomly
function createCarrot() {
    const carrotBtn = document.createElement('button');
    carrotBtn.setAttribute('class', 'carrot');
    carrotBtn.innerHTML = `<img src="./img/carrot.png" alt="carrot">`;
    
    return carrotBtn;
}

function createBug() {
    const bugBtn = document.createElement('button');
    bugBtn.setAttribute('class', 'bug');
    bugBtn.innerHTML = `<img src="./img/bug.png" alt="bug">`;
    
    return bugBtn;
}

function onDraw(i, randomX, randomY) {
    const carrot = createCarrot();
    carrot.setAttribute('data-id', i);
    carrot.style.transform = `translate(${randomX}px, ${randomY}px)`;
    gameField.appendChild(carrot);
}

function onDrawBug(i, randomX, randomY) {
    const bug = createBug();
    bug.setAttribute('data-id', i);
    bug.style.transform = `translate(${randomX}px, ${randomY}px)`;
    gameField.appendChild(bug); 
}

function iteration() {
    for (let i = 0; i < 10; i++) {
        if (i < 5) {
            console.log(calculate());
            const randomX = calculate().randomX;
            const randomY = calculate().randomY;
            onDraw(i, randomX, randomY);
        } else {
            const randomX = calculate().randomX;
            const randomY = calculate().randomY;
            onDrawBug(i, randomX, randomY);
        }
        
    }
};
// iteration();

// clicking carrots - remove carrot / counter goes up
// clicking bugs - you lost
gameField.addEventListener('click', (event) => {
    // console.log(event.target.parentNode.classList.contains('carrot'));
    const toBeDeleted = event.target.parentNode;
    if (isGameStart){
        if (toBeDeleted.classList.contains('carrot')) {
            toBeDeleted.remove();
            onCount();
            Sound.carrotSound();
        } else if (toBeDeleted.classList.contains('bug')) {
            Sound.bugSound();
            youLost();
        }
    }
    
});

function onCount() {
    count++;
    counter.textContent = count;
    if (count === 5) {
        youWin();
    }
}

// you lost
const youLost = () => {
    modal.classList.add('active');
    modal.querySelector('strong').textContent = 'You Lost 🥲';
    stopTimer();
    Sound.stopBg();
    isGameStart = false;
};

const youWin = () => {
    modal.classList.add('active');
    modal.querySelector('strong').textContent = 'You Win ✨';
    stopTimer();
    Sound.stopBg();
    Sound.winSound();
    isGameStart = false;
}



// replay
modal.addEventListener('click', (event) => {
    // console.log(event.target.nodeName);
    if (event.target.nodeName === 'I') {
        modal.classList.remove('active');
        timeZone.textContent = '00:00';
        resetTimer();
        counter.textContent = 0;
        count = 0;
        gameField.querySelectorAll('button').forEach((button) => button.remove());
        iteration();
        Sound.playBg();
        isGameStart = true;
    }
})


// init
function init() {
    calculate();
    iteration();
};
init();
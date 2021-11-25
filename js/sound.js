const bgSound = new Audio('./sound/bg.mp3');
const bugPull = new Audio('./sound/bug_pull.mp3');
const carrotPull = new Audio('./sound/carrot_pull.mp3');
const gameWin = new Audio('./sound/game_win.mp3');
const alert = new Audio('./sound/alert.wav');

export function playBg() {
    playSound(bgSound);
}

export function stopBg() {
    stopSound(bgSound);
}

export function bugSound() {
    playSound(bugPull);
}

export function carrotSound() {
    playSound(carrotPull);
}

export function winSound() {
    playSound(gameWin);
}

export function pauseSound() {
    playSound(alert);
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}
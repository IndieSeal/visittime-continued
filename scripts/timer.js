const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

var hourClockAud = document.getElementById("hourClock"); 
hourClockAud.loop = false;

const MUSIC_MAX_VOLUME = 0.2;
const VOLUME_TRANSITION_SPEED = 0.1;
var musicAud = document.getElementById("snowMusic"); 
musicAud.loop = true;
musicAud.volume = 0;

var birdsAud = document.getElementById("birds"); 
birdsAud.loop = true;
birdsAud.volume = 1;

const decisecondsElement = document.getElementById("ten");
const secondsElement = document.getElementById("sec");
const minutesElement = document.getElementById("min");
const hoursElement = document.getElementById("hr");
const daysElement = document.getElementById("day");
const yearsElement = document.getElementById("year");

const startStopElement = document.getElementById("StartStop");
const restartElement = document.getElementById("Restart");

const timerElement = document.getElementById("timer");

// I wish this was C# to do setters and getters, but aight ;__;
var deciseconds = 0;
var isCounting = false;

var hasBeenEnabled = false;

startStopElement.onclick = startTimer;
restartElement.onclick = resetTimer;

window.addEventListener("load", async function() {
    deciseconds = Number(localStorage.getItem('Deciseconds'));
    //deciseconds = 35990; This was made for testing the timers

    updateText();
    updateStreak();
});

window.addEventListener('pointerdown', (e) => {
    if(hasBeenEnabled) return;
  
    if(birdsAud.paused) birdsAud.play();
    hasBeenEnabled = true;
});

function clamp(min, max, value){
    return Math.max(min, Math.min(value, max));
}

function lerp(currentPosition, targetPosition, value) {
  return (1 - value) * currentPosition + value * targetPosition;
}

function startTimer(){
    isCounting = true;
    sec();

    startStopElement.innerHTML = 'Pause';
    startStopElement.classList.add('stop');
    startStopElement.onclick = stopTimer;
}

function stopTimer(){
    isCounting = false;

    startStopElement.innerHTML = 'Start';
    startStopElement.classList.remove('stop');
    startStopElement.onclick = startTimer;
}

function resetTimer(){
    stopTimer();

    deciseconds = 0;
    localStorage.setItem('Deciseconds', deciseconds);

    updateText();
}

var lastTick = performance.now()

function tick(nowish) {
    let delta = clamp(0, 0.2, nowish - lastTick);
    
    lastTick = nowish;
    window.requestAnimationFrame(tick);

    if(!hasBeenEnabled) return;
    if(musicAud.paused) musicAud.play();

    musicAud.volume = clamp(0, MUSIC_MAX_VOLUME, lerp(musicAud.volume, isCounting ? MUSIC_MAX_VOLUME : 0, VOLUME_TRANSITION_SPEED * delta));
    birdsAud.volume = clamp(0, 1, lerp(birdsAud.volume, isCounting ? 0 : 1, VOLUME_TRANSITION_SPEED * delta));
}

window.requestAnimationFrame(tick)

function updateStreak() {
    var streak = Number(window.localStorage.getItem("vtStr"));
    if (!streak) var streak = 1;
    else streak++;

    document.getElementById("str").innerText = streak.toLocaleString();
    window.localStorage.setItem("vtStr", streak);
}

async function sec() {
    while (true) {
        await wait(100);
        if(!isCounting) return;

        deciseconds++;
        decisecondsElement.innerText = deciseconds.toLocaleString();
        if((deciseconds % 36000) == 0) hourClockAud.play();

        updateText();
        localStorage.setItem('Deciseconds', deciseconds);
    }
}

function updateText(){    
    updateClock();
    updateOverall();
}

function updateClock(){
    let deciDisplay = deciseconds%10;
    let seconds = Math.floor(deciseconds/10)%60;
    let minutes = Math.floor(deciseconds/600)%60;
    let hours = Math.floor(deciseconds/36000)%24;
    let days = Math.floor(deciseconds/864000)%365;
    let years = Math.floor(deciseconds/315360000);

    let dayString = days != 0 || years != 0 ? `${(days).toString().padStart(3, '0')}ᵈ:` : '';
    let yearString = years != 0 ? `${years.toString().padStart(2, '0')}y:` : '';

    timerElement.innerHTML = `${yearString}${dayString}${hours.toString().padStart(2, '0')}ʰ:${minutes.toString().padStart(2, '0')}ᵐ:${seconds.toString().padStart(2, '0')}ˢ.${deciDisplay}ᵈ`;
}

function updateOverall(){
    let seconds = Math.floor(deciseconds/10);
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    let days = Math.floor(hours/24);
    let years = Math.floor(days/365);

    decisecondsElement.innerText = deciseconds.toLocaleString();
    secondsElement.innerText = seconds.toLocaleString();
    minutesElement.innerText = minutes.toLocaleString();
    hoursElement.innerText = hours.toLocaleString();
    daysElement.innerText = days.toLocaleString();
    yearsElement.innerText = years.toLocaleString();
}
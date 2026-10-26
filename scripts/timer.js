const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const decisecondsElement = document.getElementById("ten");
const secondsElement = document.getElementById("sec");
const minutesElement = document.getElementById("min");
const hoursElement = document.getElementById("hr");
const daysElement = document.getElementById("day");
const yearsElement = document.getElementById("year");

const startStopElement = document.getElementById("StartStop");
const restartElement = document.getElementById("Restart");

var deciseconds = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var days = 0;
var years = 0;

var isCounting = false;

startStopElement.onclick = startTimer;
restartElement.onclick = resetTimer;

window.addEventListener("load", async function() {
    str();
});

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
    decisecondsElement.innerText = deciseconds.toLocaleString();

    seconds = 0;
    secondsElement.innerText = seconds.toLocaleString();

    minutes = 0;
    minutesElement.innerText = minutes.toLocaleString();

    hours = 0;
    hoursElement.innerText = hours.toLocaleString();

    days = 0;
    daysElement.innerText = days.toLocaleString();

    years = 0;
    yearsElement.innerText = years.toLocaleString();
}

function str() {
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

        if (deciseconds % 10 != 0) continue;

        seconds++;
        secondsElement.innerText = seconds.toLocaleString();
        if (seconds % 60 != 0) continue;

        minutes++;
        minutesElement.innerText = minutes.toLocaleString();
        if (minutes % 60 != 0) continue;
        
        hours++;
        hoursElement.innerText = hours.toLocaleString();
        if (hours % 24 != 0) continue;

        days++;
        daysElement.innerText = days.toLocaleString();
        if (days % 365 != 0) continue;

        years++;
        yearsElement.innerText = years.toLocaleString();
    }
}

window.addEventListener("click", function() {
    document.body.style.backgroundImg = "url(img/clock.svg)";
});
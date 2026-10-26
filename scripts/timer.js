const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const decisecondsElement = document.getElementById("ten");
const secondsElement = document.getElementById("sec");
const minutesElement = document.getElementById("min");
const hoursElement = document.getElementById("hr");
const daysElement = document.getElementById("day");

var deciseconds = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var days = 0;
var years = 0;

window.addEventListener("load", async function() {
    str();
    ten();
    sec();
});
function str() {
    var streak = Number(window.localStorage.getItem("vtStr"));
    if (!streak) var streak = 1;
    else streak++;

    document.getElementById("str").innerText = streak.toLocaleString();
    window.localStorage.setItem("vtStr", streak);
}
async function sec() {
    while (true) {
        await wait(1000);
        seconds++;
        secondsElement.innerText = seconds.toLocaleString();
        if (seconds % 60 == 0) {
            minutes++;
            minutesElement.innerText = minutes.toLocaleString();
            if (minutes % 60 == 0) {
                hours++;
                hoursElement.innerText = hours.toLocaleString();
                if (hours % 24 == 0) {
                    days++;
                    daysElement.innerText = days.toLocaleString();
                    if (days % 365 == 0) {
                        years++;
                        daysElement.innerText = years.toLocaleString();
                    }
                }
            }
        }
    }
}
async function ten() {
    while (true) {
        await wait(100);
        deciseconds++;
        decisecondsElement.innerText = deciseconds.toLocaleString();
    }
}
window.addEventListener("click", function() {
    document.body.style.backgroundImg = "url(img/clock.svg)";
});
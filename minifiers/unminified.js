const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
window.addEventListener("load", async function() {
    str();
    ten();
    sec();
});
function str() {
    var streak = Number(window.localStorage.getItem("vtStr"));
    if (streak) {
        streak++;
    } else {
        var streak = 1;
    }
    document.getElementById("str").innerText = streak;
    window.localStorage.setItem("vtStr", streak);
}
async function sec() {
    while (true) {
        await wait(1000);
        let cur = (Number(document.getElementById("sec").innerText)) + 1;
        document.getElementById("sec").innerText = cur;
        if (cur % 60 == 0) {
            let min = (Number(document.getElementById("min").innerText)) + 1;
            document.getElementById("min").innerText = min;
            if (min % 60 == 0) {
                let hr = Number(document.getElementById("hr").innerText) + 1;
                document.getElementById("hr").innerText = hr;
                if (hr % 24 == 0) {
                    let day = Number(document.getElementById("day").innerText) + 1;
                    document.getElementById("day").innerText = day;
                }
            }
        }
    }
}
async function ten() {
    while (true) {
        await wait(100);
        let cur = (Number(document.getElementById("ten").innerText)) + 1;
        document.getElementById("ten").innerText = cur;
    }
}
window.addEventListener("click", function() {
    document.body.style.backgroundImg = "url(img/clock.svg)";
});
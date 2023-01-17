const timeElement: HTMLDivElement = document.querySelector("#topbar .time") as HTMLDivElement;

const backgroundDiv: HTMLDivElement = document.querySelector("#background") as HTMLDivElement;
let   backgroundList: Array<HTMLDivElement> = [];

const dashDiv: HTMLDivElement = document.querySelector("#dash") as HTMLDivElement;

window.onload = (ev => {
    // # Clock
    setInterval(timeInterval, 1000);
    timeInterval();

    generateBackgrounds();
    backgroundList[0].classList.add("active");
    setInterval(backgroundInterval, 6000);

    generateDash();
});

function timeInterval() {
    let time = new Date();
    let hour = ('0' + time.getHours()).slice(-2);
    let minutes = ('0' + time.getMinutes()).slice(-2);
    timeElement.innerText = hour + ":" + minutes;
}


let currentBackground = 0;

function backgroundInterval() {
    backgroundList[currentBackground].classList.remove("active");
    currentBackground = (currentBackground - 1) < 0 ? backgroundList.length - 1 : currentBackground - 1;
    backgroundList[currentBackground].classList.add("active");
}

function generateBackgrounds() {
    for (let i = 0; i < config.backgrounds.length; i++) {
        const background = config.backgrounds[i];
        const div = document.createElement("div");
        const img = document.createElement("img");
        img.src = "assets/backgrounds/"+background;
        div.appendChild(img);
        backgroundList.push(div);
        backgroundDiv.appendChild(div);
    }
}

function generateDash() {
    for (const key in config.dash) {
        if (Object.prototype.hasOwnProperty.call(config.dash, key)) {
            const dashElement = config.dash[key];
            const a = document.createElement("a");
            a.href = dashElement.url;
            a.target = "_blank"
            const icon = document.createElement("img");
            icon.src = "assets/icons/"+dashElement.icon;
            a.appendChild(icon);
            dashDiv.appendChild(a);
        }
    }
}
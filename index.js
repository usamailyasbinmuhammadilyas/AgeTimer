let isDOBOpen = false;
let dateOfBirth;
const settingCogEl = document.getElementById("settingIcon");
const settingContentEL = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const lifeJourneyContainerEl = document.getElementById("lifeJourneyContainer");
const dobButtonEl = document.getElementById("dobButton");
const dobInputEl = document.getElementById("dobInput");
const resetButtonEl = document.getElementById("resetButton");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

const makeTwoDigitNumber = (number) => {
    return number > 9 ? number : `0${number}`;
}

const togleDateOfBirthSelector = () => {
    if (isDOBOpen) {
        settingContentEL.classList.add("hide");
    } else {
        settingContentEL.classList.remove("hide");
    }
    isDOBOpen = !isDOBOpen;
};

const updateAge = () => {
    const currentDate = new Date();
    const dateDiff = currentDate - dateOfBirth;
    const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365) % 12);
    const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24) % 30);
    const hour = Math.floor(dateDiff / (1000 * 60 * 60) % 24);
    const minute = Math.floor(dateDiff / (1000 * 60) % 60);
    const second = Math.floor(dateDiff / 1000 % 60);

    yearEl.innerHTML = makeTwoDigitNumber(year);
    monthEl.innerHTML = makeTwoDigitNumber(month);
    dayEl.innerHTML = makeTwoDigitNumber(day);
    hourEl.innerHTML = makeTwoDigitNumber(hour);
    minuteEl.innerHTML = makeTwoDigitNumber(minute);
    secondEl.innerHTML = makeTwoDigitNumber(second);
}

const localStorageGetter = () => {
    const year = localStorage.getItem('year')
    const month = localStorage.getItem('month')
    const day = localStorage.getItem('day')
    const hour = localStorage.getItem('hour')
    const minute = localStorage.getItem('minute')
    const second = localStorage.getItem('second')
    if (year && month && day && hour && minute && second) {
        dateOfBirth = new Date(year, month, day, hour, minute, second);
    }
    updateAge();
};

const contentToggler = () => {
    updateAge();
    if (dateOfBirth) {
        initialTextEl.classList.add("hide");
        lifeJourneyContainerEl.classList.remove("hide");
        setInterval(() => updateAge(), 1000);
    } else {
        lifeJourneyContainerEl.classList.add("hide");
        initialTextEl.classList.remove("hide");
    }
}

const setDOBHandler = () => {
    const dateString = dobInputEl.value;
    dateOfBirth = dateString ? new Date(dateString) : null;

    if (dateOfBirth) {
        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth() + 1);
        localStorage.setItem("day", dateOfBirth.getDate());
        localStorage.setItem("hour", dateOfBirth.getHours());
        localStorage.setItem("minute", dateOfBirth.getMinutes());
        localStorage.setItem("second", dateOfBirth.getSeconds());
    }

    contentToggler();
    setInterval(() => updateAge(), 1000);
};

const resetHandler = () => {
    dateOfBirth = null;
    localStorage.removeItem("year");
    localStorage.removeItem("month");
    localStorage.removeItem("day");
    localStorage.removeItem("hour");
    localStorage.removeItem("minute");
    localStorage.removeItem("second");

    lifeJourneyContainerEl.classList.add("hide");
    initialTextEl.classList.remove("hide");

    yearEl.innerHTML = "00";
    monthEl.innerHTML = "00";
    dayEl.innerHTML = "00";
    hourEl.innerHTML = "00";
    minuteEl.innerHTML = "00";
    secondEl.innerHTML = "00";
};

localStorageGetter();
contentToggler();

settingCogEl.addEventListener('click', togleDateOfBirthSelector);
dobButtonEl.addEventListener('click', setDOBHandler);
resetButtonEl.addEventListener('click', resetHandler);

const pianoKeys = document.querySelectorAll(".piano-keys .key");
const VolumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-checkbox input");
const volume = document.querySelector(".volume");

let audio = new Audio("tunes/a.wav");
let allKeys = [];

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => clickedKey.classList.remove("active"), 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click",() => playTune(key.dataset.key));
})

const pressedKey = (e) => {
    setTimeout(() =>  {if (allKeys.includes(e.key) ) playTune(e.key)}, 500);
}

const changeVolume = (e) => {
    audio.volume = e.target.value;
    if (e.type === "input") {
        volume.innerText = `${Math.floor(e.target.value * 100)}%`;
    } else if (e.type === "change") {
        volume.innerText = "Volume";
    }
}

const toggleKeys = () => {
    pianoKeys.forEach(key => {key.classList.toggle("hide")});
}

VolumeSlider.addEventListener("input", changeVolume);
VolumeSlider.addEventListener("change", changeVolume);
keysCheckbox.addEventListener("input", toggleKeys);
document.addEventListener("keypress", pressedKey);
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");
const colorBoxs = document.querySelectorAll(".color-box");
const colorDiv = document.querySelectorAll(".color");
const hexValue = document.querySelectorAll(".hex-value");

generateBtn.addEventListener("click",generatePalette);

paletteContainer.addEventListener("click", function(e) {
    if (e.target.classList.contains("copy-btn")) {
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target))
            .catch((err) => console.log(err));

    } else if (e.target.classList.contains("color")) {
        const hexValue = e.target.nextElementSibling.querySelector(".hex-value").textContent;
        navigator.clipboard
            .writeText(hexValue)
            .then(() => showCopySuccess(e.target.nextElementSibling.querySelector(".copy-btn")))
            .catch((err) => console.log(err));
    }
});

function showCopySuccess(element) {
    element.classList.remove("far","fa-copy");
    element.classList.add("fas","fa-check");
    element.style.color = "#48bb78";
    element.title = "Copied!";

    setTimeout(() => {
    element.classList.remove("fas","fa-check");
    element.classList.add("far","fa-copy");
    element.style.color = "";
    element.title = "copy to clipboard";
    },1500);
};

function generatePalette() {
    let colors = [];

    for(let i = 0;i < 5 ;i++) {
        colors.push(generateRandomColors());
    };

    updatePaletteDisplay(colors);
};

function generateRandomColors() {
    const letters = "0123456789abcdef";
    let color = "#";

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function updatePaletteDisplay(colors) {
    colorBoxs.forEach((box, index) => {
        const color = colors[index];

        colorDiv[index].style.backgroundColor = color;
        hexValue[index].textContent = color;
    });
}


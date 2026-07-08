let btn = document.querySelectorAll("button");
let display = document.querySelector("#display");

btn.forEach((button) => {
    button.addEventListener("click", () => appendToDisplay(button.textContent));
});

function appendToDisplay(input) {
    if (input === "=") {
        calculate();
    } else if (input === "AC") {
        allClear();
    } else if (input === "DE") {
        Delete();
    } else if (input === "SIN") {
        sin();
    } else if (input === "COS") {
        cos();
    } else if (input === "TAN") {
        tan();
    } else if (input === "√") {
        square();
    } else {
        display.value += input;
    };
};

function square() {
    display.value = Math.sqrt(display.value);
};

function tan() {
    display.value = Math.tan(display.value);
};

function cos() {
    display.value = Math.cos(display.value);
};

function sin() {
    display.value = Math.sin(display.value);
};

function Delete() {
    display.value = display.value.toString().slice(0,-1);
};

function allClear() {
    display.value = "";
};

function calculate() {
    try {
        if (display.value === "") {
            display.value = "";
        } else if (display.value === "Error") {
            display.value = "Error";
        } else {
            display.value = eval(display.value);
        }
    } catch (error) {
        display.value = "Error";
    };
};

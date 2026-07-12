const canvas = document.querySelector("canvas"),
  toolBtns = document.querySelectorAll(".tool"),
  strokeColorBtns = document.querySelectorAll(".stroke-colors .option"),
  fillColorBtns = document.querySelectorAll(".shape-fill-colors .option"),
  colorPicker = document.querySelector("#color-picker"),
  fillColorPicker = document.querySelector("#fill-color-picker"),
  sizeSlider = document.querySelector("#size-slider"),
  eraserSlider = document.querySelector("#eraser-slider"),
  clearBtn = document.querySelector(".clear-canvas"),
  fillColor = document.querySelector("#fill-color"),
  saveBtn = document.querySelector(".save-img"),
  eraserPreview = document.querySelector(".eraser-preview"),
  ctx = canvas.getContext("2d");

let prevMouseX,
  prevMouseY,
  snapshot,
  isDrawing = false,
  selectedTool = "brush",
  brushWidth = 5,
  eraserWidth = 15,
  borderColor = "#000",
  shapeFillColor = "#fff";

const fillCanvasWhite = () => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  fillCanvasWhite();
});

const drawRect = (e) => {
  const width = prevMouseX - e.offsetX;
  const height = prevMouseY - e.offsetY;
  ctx.fillStyle = shapeFillColor;
  ctx.strokeStyle = borderColor;
  if (fillColor.checked) ctx.fillRect(e.offsetX, e.offsetY, width, height);
  ctx.strokeRect(e.offsetX, e.offsetY, width, height);
};

const drawCircle = (e) => {
  ctx.beginPath();
  ctx.fillStyle = shapeFillColor;
  ctx.strokeStyle = borderColor;
  const radius = Math.sqrt(Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetY, 2));
  ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
  if (fillColor.checked) ctx.fill();
  ctx.stroke();
};

const drawTriangle = (e) => {
  ctx.beginPath();
  ctx.fillStyle = shapeFillColor;
  ctx.strokeStyle = borderColor;
  ctx.moveTo(prevMouseX, prevMouseY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();
  if (fillColor.checked) ctx.fill();
  ctx.stroke();
};

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX;
  prevMouseY = e.offsetY;
  ctx.beginPath();
  ctx.lineWidth = selectedTool === "eraser" ? eraserWidth : brushWidth;
  ctx.strokeStyle = borderColor;
  ctx.fillStyle = shapeFillColor;
  snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.putImageData(snapshot, 0, 0);

  if (selectedTool === "brush" || selectedTool === "eraser") {
    ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : borderColor;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  } else if (selectedTool === "circle") {
    drawCircle(e);
  } else if (selectedTool === "triangle") {
    drawTriangle(e);
  }
};

const updateEraserPreview = (e) => {
  if (selectedTool !== "eraser") {
    eraserPreview.style.display = "none";
    return;
  }
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  eraserPreview.style.display = "block";
  eraserPreview.style.width = `${eraserWidth}px`;
  eraserPreview.style.height = `${eraserWidth}px`;
  eraserPreview.style.left = `${x}px`;
  eraserPreview.style.top = `${y}px`;
};

canvas.addEventListener("mouseleave", () => {
  eraserPreview.style.display = "none";
});

toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tools-board .active").forEach((el) => el.classList.remove("active"));
    btn.classList.add("active");
    selectedTool = btn.id;
    if (selectedTool !== "eraser") eraserPreview.style.display = "none";
  });
});

sizeSlider.addEventListener("input", () => (brushWidth = sizeSlider.value));
eraserSlider.addEventListener("input", () => (eraserWidth = eraserSlider.value));

strokeColorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".stroke-colors .selected").forEach((el) => el.classList.remove("selected"));
    btn.classList.add("selected");
    borderColor = window.getComputedStyle(btn).backgroundColor;
  });
});

fillColorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".shape-fill-colors .selected").forEach((el) => el.classList.remove("selected"));
    btn.classList.add("selected");
    shapeFillColor = window.getComputedStyle(btn).backgroundColor;
  });
});

colorPicker.addEventListener("change", () => {
  colorPicker.parentElement.style.background = colorPicker.value;
  colorPicker.parentElement.click();
});

fillColorPicker.addEventListener("change", () => {
  fillColorPicker.parentElement.style.background = fillColorPicker.value;
  fillColorPicker.parentElement.click();
});

clearBtn.addEventListener("click", fillCanvasWhite);

saveBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = `${Date.now()}.jpg`;
  link.href = canvas.toDataURL("image/jpeg", 1.0);
  link.click();
});

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", (e) => {
  drawing(e);
  updateEraserPreview(e);
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
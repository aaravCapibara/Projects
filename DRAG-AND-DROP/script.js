const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
const newCardbtn = document.querySelector(".new-cardbtn");
const deleteCardbtn = document.querySelector(".delete-cardbtn");
const newCardValue = document.querySelector("#taskInput");

let cardCount = 4;

newCardbtn.addEventListener("click", addNewCard);
deleteCardbtn.addEventListener("click", deleteCard);

for (const card of cards) {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
}

for (const list of lists) {
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
}

function dragStart(e) {
    e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd() {
    this.classList.remove("dragging");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
}

function dragLeave(e) {
    this.classList.remove("over");
}

function dragDrop(e) {
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);
    this.appendChild(card);
    this.classList.remove("over");
}

function addNewCard() {
    const taskText = newCardValue.value.trim();

    if (taskText === "") {
        alert("Please add the right task in the input.");
        return;
    }

    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("draggable", "true");
    newCard.id = "card" + cardCount;
    newCard.textContent = taskText;

    newCard.addEventListener("dragstart", dragStart);
    newCard.addEventListener("dragend", dragEnd);

    const toDoList = document.getElementById("list1");
    toDoList.appendChild(newCard);

    cardCount++;
    newCardValue.value = "";
}

function deleteCard() {
    const taskText = newCardValue.value.trim();
    
    if (taskText === "") {
        alert("Please add the right task in the input.");
        return;
    }

    const allCards = document.querySelectorAll(".card");
    let found = false;

    for (const card of allCards) {
        if (card.textContent === taskText) {
            card.remove();
            found = true;
            break;
        }
    }

    if (!found) {
        alert("Please add the right task in the input.");
    }

    newCardValue.value = "";
}
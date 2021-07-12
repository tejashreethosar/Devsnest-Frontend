const board = document.querySelector("#board");
const total = document.querySelector("#total");
const remaining = document.querySelector("#remaining");
const selected = document.querySelector("#selected");

const CELL_COUNT = 100;
const state = {};
let CELL_REMAINING = CELL_COUNT;
let CELL_SELECTED = 0;

total.innerText = CELL_COUNT;                   //render the count of seats
remaining.innerText = CELL_REMAINING;
selected.innerText = CELL_SELECTED;

for (let i = 0; i < CELL_COUNT; i = i + 1) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", e => handleClick(e, i));
  board.appendChild(cell);
}

const handleClick = (e, index) => {
  const element = e.target;
  if (state[index] == "selected") {
    element.style.background = "maroon";
    delete state[index];
    CELL_SELECTED -= 1;
    CELL_REMAINING += 1;
  } 
  else {
    state[index] = "selected";
    element.style.background = "peru";
    CELL_SELECTED += 1;
    CELL_REMAINING -= 1;
  }

  remaining.innerText = CELL_REMAINING;
  selected.innerText = CELL_SELECTED;
};
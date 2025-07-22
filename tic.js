let boxes = document.querySelectorAll(".cell");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".popup");
let msg = document.querySelector("#msg");

let turnO = true; // true for O, false for X
let count = 0; // to track moves for draw

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    if (checkWinner()) return;

    if (count === 9) {
      gameDraw();
    }
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return true;
    }
  }
  return false;
}

function showWinner(winner) {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

function gameDraw() {
  msg.innerText = "Game is a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
}

function disableBoxes() {
  boxes.forEach((box) => {
    box.disabled = true;
  });
}

function enableBoxes() {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
}

function resetGame() {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
}

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
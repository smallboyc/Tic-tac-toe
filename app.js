const possibilities = [
  ["0", "1", "2"],
  ["3", "4", "5"],
  ["6", "7", "8"],
  ["0", "3", "6"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["0", "4", "8"],
  ["2", "4", "6"],
];

let playerOne = [];
let playerTwo = [];
let draw = [];
const info = document.querySelector(".info");
const cells = document.querySelectorAll(".cell");
const btn = document.querySelector("button");
let trys = 0;
let canIPlay = true;

cells.forEach((cell) => {
  cell.addEventListener("click", (e) => {
    e.preventDefault();
    if (canIPlay == true) {
      if (cell.id == 1) {
        info.textContent = "impossible de choisir la même case !";
        return;
      }
      cell.id = 1;
      if (trys % 2 == 0) {
        cell.textContent = "X";
        info.textContent = "";
        draw.push(cell.getAttribute("data-index"));
        playerOne.push(cell.getAttribute("data-index"));
      } else {
        cell.textContent = "O";
        info.textContent = "";
        draw.push(cell.getAttribute("data-index"));
        playerTwo.push(cell.getAttribute("data-index"));
      }
      trys++;
      result();
    }
  });
});

function result() {
  possibilities.forEach((el) => {
    const playerOneWon = isEqual(el, playerOne);
    const playerTwoWon = isEqual(el, playerTwo);
    if (playerOneWon) {
      Congrats("Victoire du Joueur X !");
    } else if (playerTwoWon) {
      Congrats("Victoire du Joueur O !");
    }
    if (draw.length === 9) {
      if (playerOneWon) {
        Congrats("Victoire du Joueur X !");
      } else if (playerTwoWon) {
        Congrats("Victoire du Joueur O !");
      } 
    }
  });
}

function isEqual(el, playerNumber) {
  let matching = el.filter((val) => playerNumber.includes(val)); //matching est un tableau retournant toutes les valeurs correspondantes.
  if (matching.length == el.length) return true;
  return false;
}

function Congrats(msg) {
  info.textContent = msg;
  btn.style.display = "block";
  canIPlay = false;
  reset();
}

function reset() {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    cells.forEach((cell) => {
      cell.textContent = "";
      info.textContent = "";
      cell.id = "";
    });
    btn.style.display = "none";
    playerOne = [];
    playerTwo = [];
    draw = [];
    trys = 0;
    canIPlay = true;
  });
}

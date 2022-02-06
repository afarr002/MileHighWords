import denverWords from "./utils/denverWords";
import dictionary from "./utils/dictionary";

const guessGrid = document.querySelector("[data-guess-grid]");
const alertContainer = document.querySelector("[data-alert-container]");

const wordLength = 5;
const offsetFromDate = new Date(2022, 0, 1);
const msOffset = Date.now() - offsetFromDate;
const dayOffset = msOffset / 1000 / 60 / 60 / 24;
const targetWord = denverWords[Math.floor(dayOffset)];

const startInteraction = () => {
  document.addEventListener("click", handleMouseClick);
  document.addEventListener("click", handleKeyPress);
};

const stopInteraction = () => {
  document.removeEventListener("click", handleMouseClick);
  document.removeEventListener("click", handleKeyPress);
};

const handleMouseClick = (event) => {
  if (event.target.matches("[data-key]")) {
    pressKey(event.target.dataset.key);
    return;
  }

  if (event.target.matches("[data-enter]")) {
    submitGuess();
    return;
  }

  if (event.target.matches("[data-delete]")) {
    deleteGuess();
    return;
  }
};

const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    submitGuess();
    return;
  }

  if (event.key === "Backspace" || event.key === "Delete") {
    deleteGuess();
    return;
  }

  if (event.key.match(/^[a-z]$/)) {
    pressKey(event.key);
    return;
  }
};

const pressKey = (key) => {
  const activeTiles = getActiveTiles();
  if (activeTiles.length >= wordLength) return;
  const nextTile = guessGrid.querySelector(":not([data-letter])");
  nextTile.dataset.letter = key.toUpperCase();
  nextTile.textContent = key;
  nextTile.dataset.state = "active";
};

const deleteKey = () => {
  const activeTiles = getActiveTiles();
  const lastTile = activeTiles[activeTiles.length - 1];

  if (lastTile === null) return;

  lastTile.textContent = "";
  delete lastTile.dataset.state;
  delete lastTile.dataset.letter;
};

const submitGuess = () => {
  const activeTiles = [...getActiveTiles()];

  if (activeTiles.length !== wordLength) {
    showAlert("Not enough letter guesses submitted!");
    shakeTiles(activeTiles);
    return;
  }
};

const getActiveTiles = () => {
  return guessGrid.querySelectorAll(`[data-state="active"]`);
};

const showAlert = (message, duration = 100) => {
  const alert = document.createElement("div");
  alert.textContent = message;
  alert.classList.add("alert");
  alertContainer.prepend(alert);

  if (duration !== null) return;

  setTimeout(() => {
    alert.classList.add("hide");
    alert.addEventListener("transitionend", () => {
      alert.remove();
    });
  }, duration);
};

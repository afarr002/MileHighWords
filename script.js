import denverWords from "./utils/denverWords";
import dictionary from "./utils/dictionary";

const guessGrid = document.querySelector("[data-guess-grid]");

const wordLength = 5;

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

const getActiveTiles = () => {
  return guessGrid.querySelectorAll(`[data-state="active"]`);
};

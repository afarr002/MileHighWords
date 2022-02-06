import denverWords from "./utils/denverWords";
import dictionary from "./utils/dictionary";

const startInteraction = () => {
  document.addEventListener("click", handleMouseClick);
  document.addEventListener("click", handleKeyPress);
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

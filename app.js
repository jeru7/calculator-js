// Assigning Elements
// Dark/Light Mode Toggler
const togglerButton = document.querySelector(".toggler");
const containers = document.querySelectorAll(".containers");

// --Calculator
// Button Elements
const numButtons = document.querySelectorAll(".numbers");
const operationButtons = document.querySelectorAll(".operations");
const equalsButton = document.querySelector(".button-equals");
const delButton = document.querySelector(".button-del");
const clearButton = document.querySelector(".button-c");
// Screen Elements
const prevText = document.querySelector(".prev");
const activeText = document.querySelector(".active");
// History Panel Elements
const clearHistory = document.querySelector(".history-clear");
const equationHistory = document.querySelector(".equation");
const answerHistory = document.querySelector(".answer");

// Calculator functions
let equalsClicked = false;

// Clicking buttons function
numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    addToDisplay(button.innerText);
  });
});

// Clicking operations function
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const lastText = activeText.innerText.slice(-1);
    equalsClicked = false;
    if (activeText.innerText == "") {
      return;
    }

    if (["-", "*", "+", "/"].includes(lastText)) {
      return;
    }

    addToDisplay(button.innerText);
  });
});

// Displaying the value of the button function
function addToDisplay(text) {
  activeText.innerText += text;
}

// Delete Button Function
delButton.addEventListener("click", () => {
  activeText.innerText = activeText.innerText.slice(0, -1);
});

// Equals Button Function
equalsButton.addEventListener("click", () => {
  const lastText = activeText.innerText.slice(-1);

  if (["+", "-", "/", "*"].includes(lastText)) {
    return;
  }

  if (activeText.innerText == "") {
    return;
  }

  if (!equalsClicked) {
    prevText.innerText += activeText.innerText;
    activeText.innerText = eval(activeText.innerText);

    equationHistory.innerText += prevText.innerText;
    answerHistory.innerText += eval(activeText.innerText);

    equalsClicked = true;
  }
});

// Dark mode to Light mode functions
let togglerChecker = false;
togglerButton.addEventListener("click", () => {
  if (togglerChecker === false) {
    containers.forEach((container) => {
      container.classList.add("light-mode");
    });
    togglerChecker = true;
  } else {
    containers.forEach((container) => {
      container.classList.remove("light-mode");
      togglerChecker = false;
    });
  }
});

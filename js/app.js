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
const displayHistory = document.querySelector(".history-display");
const equationHistory = document.querySelector(".equation");
const answerHistory = document.querySelector(".answer");
const historyTextContainer = document.createElement("div");

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
  if (activeText.innerText == "" && !prevText.innerText == "") {
    prevText.innerText = "";
  }
});

// Equals Button Function
equalsButton.addEventListener("click", () => {
  const operators = /[+\-*/]/;
  const lastText = activeText.innerText.slice(-1);

  if (operators.test(lastText)) {
    return;
  }

  if (activeText.innerText == "") {
    return;
  }

  if (!equalsClicked && activeText.innerText != "") {
    prevText.innerText = activeText.innerText;
    equalsClicked = true;
  }

  if (activeText.innerText != "") {
    const historyTextContainer = document.createElement("div");
    historyTextContainer.classList.add("history-text", "containers");

    const equationElement = document.createElement("p");
    equationElement.classList.add("equation");
    const answerElement = document.createElement("p");
    answerElement.classList.add("answer");
    if (operators.test(activeText.innerText) == true) {
      activeText.innerText = eval(activeText.innerText);
      equationElement.innerText = prevText.innerText;
      answerElement.innerText = eval(activeText.innerText);
      historyTextContainer.appendChild(equationElement);
      historyTextContainer.appendChild(answerElement);
      displayHistory.appendChild(historyTextContainer);
    }

    if (!["+", "-", "/", "*"].includes(activeText.innerText)) {
      return;
    }

    prevText.innerText = "";
    prevText.innerText = activeText.innerText;
    equalsClicked = true;
  }
});

// Clear Button Function
clearButton.addEventListener("click", () => {
  prevText.innerText = "";
  activeText.innerText = "";
});

// History Clear Function
clearHistory.addEventListener("click", () => {
  displayHistory.innerHTML = "";
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

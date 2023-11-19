class Calculator {
  // initializes the dom elements of the buttons and some containers
  constructor() {
    // calculator
    this.numbersBtn = document.querySelectorAll(".numbers");
    this.operatorsBtn = document.querySelectorAll(".operators");
    this.equalsBtn = document.querySelector(".button-equals");
    this.deleteBtn = document.querySelector(".button-del");
    this.clearBtn = document.querySelector(".button-c");
    this.prevText = document.querySelector("#previous-text");
    this.activeText = document.querySelector("#active-text");
    this.equalsClicked = false;
    this.containers = document.querySelectorAll(".containers");

    // light/dark toggler
    this.togglerBtn = document.querySelector(".toggler");

    // history panel
    this.historyClearBtn = document.querySelector(".history-clear");
    this.historyDisplay = document.querySelector(".history-display");
  }

  // initiate
  init() {
    this.addEvents();
  }

  // function that add events to the buttons
  addEvents() {
    this.numbersBtn.forEach((number) => {
      number.addEventListener("click", () => {
        const lastText = this.activeText.innerText.slice(-1);
        if (lastText === "." && number.innerText === ".") return;
        this.addToDisplay(number.innerText);
      });
    });

    this.operatorsBtn.forEach((operator) => {
      operator.addEventListener("click", () => {
        this.getOperators(operator.innerText);
      });
    });

    this.equalsBtn.addEventListener("click", () => this.equalsButton());
    this.deleteBtn.addEventListener("click", () => this.deleteButton());
    this.clearBtn.addEventListener("click", () => this.clearButton());
    this.historyClearBtn.addEventListener("click", () => this.clearHistory());
    this.togglerBtn.addEventListener("click", () => this.toggleDarkMode());
  }

  // function to display text on the screen
  addToDisplay(text) {
    if (this.activeText.innerText !== "Error") {
      this.activeText.innerText += text;
    } else {
      this.activeText.innerText = text;
    }
  }
  // function that checks the operators
  getOperators(text) {
    const lastText = this.activeText.innerText.slice(-1);
    this.equalsClicked = false;

    if (
      this.activeText.innerText === "" ||
      this.activeText.innerText === "Error"
    )
      return;
    if (["-", "*", "+", "/"].includes(lastText)) return;

    this.addToDisplay(text);
  }

  // function that perform the equals button
  equalsButton() {
    const operators = /[+\-*/]/;
    const lastText = this.activeText.innerText.slice(-1);

    // checks if the screen has a current error message
    if (this.activeText.innerText === "Error") {
      this.activeText.innerText = "";
      this.prevText.innerText = "";
    }

    // checks if the screen is empty
    if (this.activeText.innerText !== "") {
      if (operators.test(lastText)) {
        this.activeText.innerText = this.activeText.innerText.slice(0, -1);
        return;
      }

      if (!this.equalsClicked) {
        this.prevText.innerText = this.activeText.innerText;
        this.equalsClicked = true;
      }

      const equation = this.prevText.innerText;
      const answer = this.performOperation(this.activeText.innerText);

      // checks if the answer is valid
      if (answer !== null || answer !== "Error") {
        this.activeText.innerText = answer;
        this.displayHistory(equation, answer);
      }
      // display the active text to prev text
      this.prevText.innerText = this.activeText.innerText;
      this.equalsClicked = true;
    }
  }

  // perform the expression based on the operator
  performOperation(expression) {
    try {
      // checks if the user divides a number to 0
      if (/\/0(?!\.)/.test(expression)) {
        return "Error";
      }

      const result = new Function(`return ${expression}`)();

      if (!isFinite(result)) {
        return "Error";
      }
      return result;
    } catch (error) {
      console.error("Invalid expression", error);
      return "Error";
    }
  }

  // displays the equation and answer to the history panel
  displayHistory(equation, answer) {
    const historyTextContainer = document.createElement("div");
    historyTextContainer.classList.add("history-text", "containers");

    const equationElement = document.createElement("p");
    equationElement.classList.add("equation");
    equationElement.innerText = equation;

    const answerElement = document.createElement("p");
    answerElement.classList.add("answer");
    answerElement.innerText = answer;

    historyTextContainer.appendChild(equationElement);
    historyTextContainer.appendChild(answerElement);
    this.historyDisplay.appendChild(historyTextContainer);
  }

  // deletes a single character on the screen
  deleteButton() {
    this.activeText.innerText = this.activeText.innerText.slice(0, -1);

    // deletes the prev text value if the active text is already empty
    if (this.activeText.innerText === "") {
      this.prevText.innerText = "";
    }
  }

  // clears the calculator screen
  clearButton() {
    this.prevText.innerText = "";
    this.activeText.innerText = "";
  }

  // clears the history panel
  clearHistory() {
    this.historyDisplay.innerHTML = "";
  }

  // toggle light to dark mode
  toggleDarkMode() {
    this.containers.forEach((container) => {
      container.classList.toggle("light-mode");
    });
  }
}

// new instance of the Calculator
const calculator = new Calculator();

// calls the init which runs the addEvents
calculator.init();

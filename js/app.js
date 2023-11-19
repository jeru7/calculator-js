class Calculator {
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

    // light/dark toggler
    this.togglerBtn = document.querySelector(".toggler");

    // history panel
    this.historyClearBtn = document.querySelector(".history-clear");
    this.historyDisplay = document.querySelector(".history-display");
  }

  init() {
    this.addEvents();
  }

  addEvents() {
    this.numbersBtn.forEach((number) => {
      number.addEventListener("click", () =>
        this.addToDisplay(number.innerText)
      );
    });

    this.operatorsBtn.forEach((operator) => {
      operator.addEventListener("click", () => {
        this.getOperators(operator.innerText);
      });
    });

    this.equalsBtn.addEventListener("click", () => this.equalsButton());
    this.deleteBtn.addEventListener("click", () => this.deleteButton());
    this.clearBtn.addEventListener("click", () => this.clearButton());
  }

  addToDisplay(text) {
    if (this.activeText.innerText !== "Error") {
      this.activeText.innerText += text;
    } else {
      this.activeText.innerText = text;
    }
  }

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

  // TODO: Equals button clicked
  equalsButton() {
    const operators = /[+\-*/]/;
    const lastText = this.activeText.innerText.slice(-1);

    if (this.activeText.innerText === "Error") {
      this.activeText.innerText = "";
      this.prevText.innerText = "";
    }

    if (this.activeText.innerText !== "") {
      if (operators.test(lastText)) {
        this.activeText.innerText = this.activeText.innerText.slice(0, -1);
      }

      if (!this.equalsClicked) {
        this.prevText.innerText = this.activeText.innerText;
        this.equalsClicked = true;
      }

      const equation = this.prevText.innerText;
      const answer = this.performOperation(this.activeText.innerText);
      if (answer !== null) {
        this.activeText.innerText = answer;
        this.displayHistory(equation, answer);
      }
      this.prevText.innerText = "";
      this.prevText.innerText = this.activeText.innerText;
      this.equalsClicked = true;
    }
  }

  performOperation(expression) {
    try {
      if (/\/0(?!\.)/.test(expression)) {
        return "Error";
      }

      const result = new Function(`return ${expression}`)();
      return result;
    } catch (error) {
      console.error("Invalid expression", error);
      return null;
    }
  }

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
    this.displayHistory.appendChild(historyTextContainer);
  }

  deleteButton() {
    this.activeText.innerText = this.activeText.innerText.slice(0, -1);

    if (this.activeText.innerText === "" && !this.prevText.innerText === "") {
      this.prevText.innerText = "";
    }
  }

  clearButton() {
    this.prevText.innerText = "";
    this.activeText.innerText = "";
  }
}

const calculator = new Calculator();
calculator.init();

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

    this.equalsBtn.addEventListener("click", this.equalsButton());
  }

  addToDisplay(text) {
    this.activeText.innerText += text;
  }

  getOperator() {
    const lastText = this.activeText.innerText.slice(-1);
    this.equalsClicked = false;

    if (this.activeText === "") return;
    if (["-", "*", "+", "/"].includes(lastText)) return;

    this.addToDisplay(text);
  }
}

const calculator = new Calculator();
calculator.init();

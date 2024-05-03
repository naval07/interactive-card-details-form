// Modified features:
// - Instead of throwing an error to the user for wrong format they are forced to use a correct format
// - In card number field, exp. date and cvc they can only type nubmers
// - In card nubmer field the user needs to type exactly 16 numbers
// - In exp. date the user can only type 2 numbers
// - In cvc number the user can only type 3 numbers
// - In cardholder name field they can only type letters
// Extra features:
// - A blank space is automatically added after 4 typed numbers in the card number field

// ================== Dynamic Card features ==================

// Function to delete error alert
function resetInputStyle(inputField) {
  let container = inputField.parentElement;
  if (container.querySelector("small")) {
    errorMsg = container.querySelector("small");
    container.removeChild(errorMsg);
    for (c of container.children) {
      c.classList.remove("input-error");
    }
    // inputField.classList.remove("input-error");
  }
}

// Updating dynamically the displayed cardholder name
var cardHolderNameInput = document.getElementById("cardholder-name-input");
cardHolderNameInput.onkeyup = function () {
  document.getElementById("on-card-cardholder-name").innerHTML =
    cardHolderNameInput.value.toUpperCase();
  // Reset style in case of previous error
  resetInputStyle(cardHolderNameInput);
};

// Updating dynamically the displayed cardholder number
var cardNumInput = document.getElementById("card-number-input");
cardNumInput.onkeyup = function () {
  document.getElementById("on-card-number").innerHTML = cardNumInput.value;
  // Reset style in case of previous error
  resetInputStyle(cardNumInput);
};

// Updating dynamically the displayed card expiration date
var cardExpMonthInput = document.getElementById("exp-month-input");
var cardExpYearInput = document.getElementById("exp-year-input");

var cardExpDate = cardExpMonthInput.value + "/" + cardExpYearInput.value;

cardExpMonthInput.onkeyup = function () {
  document.getElementById("on-card-expiration-date").innerHTML =
    cardExpMonthInput.value + "/" + cardExpYearInput.value;
  // Reset style in case of previous error
  resetInputStyle(cardExpMonthInput);
};

cardExpYearInput.onkeyup = function () {
  document.getElementById("on-card-expiration-date").innerHTML =
    cardExpMonthInput.value + "/" + cardExpYearInput.value;
  // Reset style in case of previous error
  resetInputStyle(cardExpYearInput);
};

// Updating dynamically the displayed cvc
var cardCvcInput = document.getElementById("cvc-input");
cardCvcInput.onkeyup = function () {
  document.getElementById("on-card-cvc-number").innerHTML = cardCvcInput.value;
  // Reset style in case of previous error
  resetInputStyle(cardCvcInput);
};

// ================== Form input conditions ==================

// Function to set letters only on cardholder name input field
// Code adapted from https://awik.io/allow-numbers-input-field-javascript/
cardHolderNameInput.onkeydown = function (event) {
  if (!/^[a-zA-z ]$/.test(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }
};

// Function to set numbers only on card number input field and adding a space every 4 digits
cardNumInput.onkeydown = function (event) {
  // Code from https://awik.io/allow-numbers-input-field-javascript/
  if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }

  // Adding a space every 4 digits
  if (cardNumInput.value.match(/[0-9]/g)) {
    // Checking if amount of numbers are mult of 4 and not pressed backspace
    numLength = cardNumInput.value.match(/[0-9]/g).length;
    if (numLength % 4 == 0 && event.key !== "Backspace" && numLength < 16) {
      // Creating list of every 4 digits
      const fourNumberReg = /[0-9]{4}/g;
      try {
        fourNumberList = cardNumInput.value.match(fourNumberReg);
      } catch (e) {
        fourNumberList = [];
      }
      // Adding space if there is no space already as last digit
      if (
        fourNumberList.length >= 1 &&
        cardNumInput.value[cardNumInput.value.length - 1] !== " "
      ) {
        cardNumInput.value += " ";
      }
    }
  }
};

// Function to set numbers only on month input field
cardExpMonthInput.onkeydown = function (event) {
  if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }
};

// Function to set numbers only on year input field
cardExpYearInput.onkeydown = function (event) {
  if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }
};

// Function to set numbers only on CVC input field
cardCvcInput.onkeydown = function (event) {
  if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace") {
    event.preventDefault();
  }
};

// ================== Validate form function ==================
const form = document.getElementsByClassName("fields-container")[0];
form.addEventListener("submit", (event) => {
  if (!validateInputs()) {
    event.preventDefault();
  }
});

function validateInputs() {
  let submittable = true;
  if (!validateCardholder()) {
    submittable = false;
  }
  if (!validateCardNumber()) {
    submittable = false;
  }
  if (!validateMonth()) {
    submittable = false;
  }
  if (!validateYear()) {
    submittable = false;
  }
  if (!validateCvc()) {
    submittable = false;
  }
  return submittable;
}

// Function to create the error message
function setError(input, message) {
  input.setAttribute("class", "input-error");

  const container = input.parentElement;
  if (!container.querySelector("small")) {
    var errorElement = document.createElement("small");
    errorElement.setAttribute("class", "error-message-paragraph");
  } else {
    var errorElement = container.querySelector("small");
  }
  errorElement.innerText = message;
  container.appendChild(errorElement);
}

// ================== Invalid fields Error functions ==================
function validateCardholder() {
  chContainer = document.getElementsByClassName("cardholder")[0];

  // Getting error message
  var cardHolderNameInput = document.getElementById("cardholder-name-input");
  if (cardHolderNameInput.value.length == 0) {
    var message = "Can't be blank";
  } else if (cardHolderNameInput.value.length < 3) {
    var message = "Can't have less than 3 characters.";
  } else {
    // There is no errors
    return true;
  }

  // Create error message
  if (message) {
    setError(cardHolderNameInput, message);
    return false;
  }
}

function validateCardNumber() {
  cardNumberContainer = document.getElementsByClassName("card-number")[0];

  // Getting error message
  var cardNumInput = document.getElementById("card-number-input");
  if (cardNumInput.value.length == 0) {
    var message = "Can't be blank";
  } else if (cardNumInput.value.length < 19) {
    var message = "Wrong format. 16 numbers needed.";
  } else {
    // There is no errors
    return true;
  }

  // Create error message
  if (message) {
    setError(cardNumInput, message);
    return false;
  }
}

function validateMonth() {
  expDateContainer = document.getElementsByClassName("expiration-date")[0];

  // Getting error message
  var cardExpMonthInput = document.getElementById("exp-month-input");
  if (cardExpMonthInput.value.length == 0) {
    var message = "Can't be blank.";
  } else if (cardExpMonthInput.value.length < 2) {
    var message = "Needs to be 2 digit number.";
  } else if (
    Number(cardExpMonthInput.value) < 1 ||
    Number(cardExpMonthInput.value) > 12
  ) {
    var message = "Wrong month number.";
  } else {
    // There is no errors
    return true;
  }

  // Create error message
  if (message) {
    setError(cardExpMonthInput, message);
    return false;
  }
}

function validateYear() {
  expDateContainer = document.getElementsByClassName("expiration-date")[0];

  // Getting error message
  var cardExpYearInput = document.getElementById("exp-year-input");
  if (cardExpYearInput.value.length == 0) {
    var message = "Can't be blank.";
  } else if (cardExpYearInput.value.length < 2) {
    var message = "Needs to be 2 digit number.";
  } else {
    // There is no errors
    return true;
  }

  // Create error message
  if (message) {
    setError(cardExpYearInput, message);
    return false;
  }
}

function validateCvc() {
  cvcContainer = document.getElementsByClassName("cvc")[0];
  // Getting error message
  var cardCvcInput = document.getElementById("cvc-input");
  if (cardCvcInput.value.length == 0) {
    var message = "Can't be blank";
  } else if (cardCvcInput.value.length < 3) {
    var message = "Wrong format. 3 numbers needed.";
  } else {
    // There is no errors
    return true;
  }

  // Create error message
  if (message) {
    setError(cardCvcInput, message);
    return false;
  }
}

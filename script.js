
const radioBtns = document.querySelectorAll(".radio_container");
const myForm = document.querySelector(".my_form");
const repayement = document.getElementById("repayment");
const interestOnly = document.getElementById("interest_only");
const interestRate = document.getElementById("interest");
const mortgageTerm = document.getElementById("mortgage_term");
const mortgageAmount = document.getElementById("mortgage_amount");
const monthlyPaymentText = document.querySelector(".monthly_repayments");
const totalToPay = document.querySelector(".total");
const clearBtn = document.querySelector(".clear_btn");
const emptyResultContainer = document.querySelector(".empty_result_container");
const resultContainer = document.querySelector(".result_container");
const inputs = document.querySelectorAll(".input_grp input");
const inputGrps = document.querySelectorAll(".input_grp");
const errorMsgs = document.querySelectorAll(".error_msg");
const radioBtnInputs = document.querySelectorAll("input[type='radio']")

function showError(index){
  const symbol = inputGrps[index].lastElementChild;
  symbol.classList.add("error");
  errorMsgs[index].classList.remove("hidden");
}

function removeError(index) {
  const symbol = inputGrps[index].lastElementChild;
  symbol.classList.remove("error");
  errorMsgs[index].classList.add("hidden");
}

function showRadioError() {
  const radioErrorMsg = document.querySelector("fieldset .error_msg");
  radioErrorMsg.classList.remove("hidden");
}

function removeRadioError() {
  const radioErrorMsg = document.querySelector("fieldset .error_msg");
  radioErrorMsg.classList.add("hidden");
}

function checkForError() {
  let errorFound = false;
  inputs.forEach((input, index) => {
    if (input.value.trim() === "") {
      showError(index);
      errorFound = true;
    } 
  })
  let radioChecked = [...radioBtnInputs].some(input => input.checked)
  if (!radioChecked) {
    showRadioError();
    errorFound = true;
  }
  return errorFound;
}

function clearAll() {
  mortgageAmount.value = "";
  mortgageTerm.value = "";
  interestRate.value = "";
  monthlyPaymentText.textContent = "";
  totalToPay.textContent = "";
  emptyResultContainer.classList.remove("hidden");
  resultContainer.classList.add("hidden");
  radioBtnInputs.forEach((input) => {
    input.checked = false;
  })
  radioBtns.forEach((btn) => btn.classList.remove("clicked"));
  removeRadioError();
  inputs.forEach((input, index) => {
    removeError(index)
  })
}

function toggleActive(element) {
  radioBtns.forEach((btn) => btn.classList.remove("clicked"));
  element.classList.add("clicked");
}

function calculateRepayments() {
  let mortgageAmountValue = parseFloat(mortgageAmount.value);
  let interestRateValue = parseFloat(interestRate.value) / 100 / 12; /* Monthly Interest Rate  */
  let mortgageTermValue = parseInt(mortgageTerm.value);
  let mortgageTermMonths = mortgageTermValue * 12; 
  let monthlyPayment = 0

  emptyResultContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  
  if (repayement.checked) {
    let r = interestRateValue 
    monthlyPayment = 
    (mortgageAmountValue * r * (1 + r) ** mortgageTermMonths) / 
      ((1 + r) ** mortgageTermMonths - 1);
  } else if (interestOnly.checked) {
    monthlyPayment = mortgageAmountValue * interestRateValue
  }
   monthlyPaymentText.textContent = `£${monthlyPayment.toFixed(2)}`;
   totalToPay.textContent = `£${(monthlyPayment * mortgageTermMonths).toFixed(2)}`;
}

radioBtns.forEach((btn) => {
  btn.addEventListener("click", () => toggleActive(btn))
})

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkForError()) {
    return;
  }
  calculateRepayments();
});

clearBtn.addEventListener("click", clearAll);
inputs.forEach((input, index) => {
  input.addEventListener("focus", () => removeError(index))
})
radioBtns.forEach(container => {
  container.addEventListener("click", () => {
    const radioBtn = container.querySelector("input[type='radio']");
    if (radioBtn) {
      radioBtn.checked = true;
      removeRadioError();
    }
  })
})

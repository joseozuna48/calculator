let displayText = "";
let num1 = "";
let num2 = "";
let operator = "";

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}


function operate(operator, num1, num2) {
    let result = 0;
    switch (operator) {
        case "+":
            result = add(num1, num2);
            break;

        case "-":
            result = subtract(num1, num2);
            break;

        case "*":
            result = multiply(num1,num2);
            break;

        case "/":
            result = divide(num1,num2);
            break;
    }

    return result;
}

function numberListener(){
    let display = document.querySelector(".display");

    if(operator){
        num2 += this.dataset.value;
    }else{
        num1 += this.dataset.value;
    }

    displayText += this.dataset.value
    display.textContent = displayText;
}

let numbers = document.querySelectorAll(".number");

numbers.forEach(number=> number.addEventListener("click",numberListener) );




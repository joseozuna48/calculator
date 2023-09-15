let displayText = "0";
let num1 = "";
let num2 = "";
let operator = "";

let display = document.querySelector(".display");

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

    if(display.textContent == 0){
        displayText = "";
    }

    displayText += this.dataset.value;
    display.textContent = displayText;
}

function resetCalculator(){
    num1="";
    num2="";
    operator="";
    displayText = "0";

    display.textContent="0";
}

function deleteLast(){
    if(displayText.length !=1){
        displayText = displayText.slice(0,-1);
        display.textContent = displayText;
    }else{
        displayText = "0";
        display.textContent = displayText;
    }
}


let numbers = document.querySelectorAll(".number");
numbers.forEach(number=> number.addEventListener("click",numberListener) );

let reset = document.querySelector(".reset");
reset.addEventListener("click",resetCalculator);

let deleteKey = document.querySelector(".delete");
deleteKey.addEventListener("click",deleteLast);





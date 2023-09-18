let num1 = "";
let num2 = "";
let operator = "";
let result = "";
let clearDisplay = false;

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

    if(display.textContent == "0" || clearDisplay ){
        display.textContent = 0;
        clearDisplay = false;
    }

    if(operator){
        num2= num2 +""+ this.dataset.value;
        display.textContent = num2;
    }else{
        num1=  num1 + "" + this.dataset.value;
        display.textContent = num1;
    }
}

function resetCalculator(){
    num1="";
    num2="";
    operator="";
    result = "";

    display.textContent="0";
}

function deleteLast(){

    if(num2){
        num2 = num2.slice(0,-1);
        display.textContent = num2;

        if(num2=="")display.textContent = num1; 

    }else if(operator){
        operator = "";
        display.textContent = num1; 

    }else if(num1){
        num1 = num1.slice(0,-1);
        display.textContent = num1;

        if(num1 == "") display.textContent = 0;
    }
}

function operationListener(){
    // In  case we want to operate on a previous calculated value
    if(result){
        num1 = result;
    }

    if(!operator && num1){
        operator = this.dataset.value;
        clearDisplay = true;
    }
}

function equals(){
    if(operator && num1 && num2){
        let operation = operate(operator,+num1,+num2);
        resetCalculator();
        result = operation;
        display.textContent=result;
    }
    
}



let numbers = document.querySelectorAll(".number");
numbers.forEach(number=> number.addEventListener("click",numberListener) );

let reset = document.querySelector(".reset");
reset.addEventListener("click",resetCalculator);

let deleteKey = document.querySelector(".delete");
deleteKey.addEventListener("click",deleteLast);

let operators = document.querySelectorAll(".operator");
operators.forEach(operation=> operation.addEventListener("click",operationListener) );

let equal = document.querySelector(".equals");
equal.addEventListener("click",equals);




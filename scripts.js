let num1 = "";
let num2 = "";
let operator = "";
let result = "";
let clearDisplay = false;

let history = document.querySelector(".history");
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
            result = multiply(num1, num2);
            break;

        case "/":
            result = divide(num1, num2);
            break;
    }

    return (result % 1 != 0) ? result.toFixed(2) : result;
}

function numberListener(value) {
    if (operator) {
        if (num2 == "0") num2 = "";
        num2 = num2 + value;
        display.textContent = `${num1} ${operator} ${num2}`;

    } else {
        if (num1 == "0") num1 = "";//Prevents numbers starting with 0
        num1 = num1 + "" + value;
        display.textContent = num1;

        //In case we computed a result and we wont use that number for successive calculations
        history.textContent = "";
        result = "";
    }
}

function resetCalculator() {
    num1 = "";
    num2 = "";
    operator = "";
    result = "";

    display.textContent = "0";
    history.textContent = "";
}

function deleteLast() {

    if (num2) {
        num2 = num2.slice(0, -1);

        if (num2 == "") {
            history.textContent = "";
        };

        display.textContent = `${num1} ${operator} ${num2}`;

    } else if (operator) {
        operator = "";
        display.textContent = num1;

    } else if (num1) {
        num1 = num1.slice(0, -1);
        display.textContent = num1;

        if (num1 == "") display.textContent = 0;

    } else if (result) {//In case the number we want to delete is the result of a previous operation
        resetCalculator();
    }
}

function operationListener(operation) {

    //Adds negative 
    if(operation =="-" && (!num1 || !num2) ){
        
        if(!num1){
            num1="-";
        }else if( operator && !num2 ){
            num2 ="-";
        }

        display.textContent = `${num1} ${operator} ${num2}`;
    }

    //In the user wants to operate with the initial 0 value
    if (!num1) num1 = "0";


    // In  case we want to operate on a previous calculated value
    if (result) {
        num1 = result;
        history.textContent = `ans = ${num1}`;
    }


    if (!operator && (num1 && num1!="-" ) ) {
        operator = operation;
        display.textContent = `${num1} ${operator} ${num2}`;

    } else if (operator && num1 && (num2 && num2!="-" ) ) {

        equals();
        operator = operation;
        //we use result value because equals assigns the value to the result variable
        //and currently num1 == ""
        display.textContent = `${result} ${operator}`;

    } 

}

function equals() {
    if (operator && num1 && num2) {

        let historyString = `${num1} ${operator} ${num2}`;
        let operation = operate(operator, +num1, +num2);

        resetCalculator();

        if(isFinite(operation)){
            result = operation + "";
            display.textContent = result;
        }else{
            result = "";
            display.textContent = "Can't do that 😡"
        }

        history.textContent = historyString;

    } else if (result) {
        num1 = result;
        history.textContent = `ans = ${num1}`;
    }

}

function addDecimal() {

    if (operator) {

        if (num2 == "") {
            num2 = "0."
        } else {
            if (!num2.includes(".")) num2 += ".";
        }

    } else {

        if (num1 == "") {
            num1 = "0."
        } else {
            if (!num1.includes(".")) num1 += ".";
        }
    }

    display.textContent = `${num1} ${operator} ${num2}`;
}



let numbers = document.querySelectorAll(".number");
numbers.forEach(number => number.addEventListener("click",(event)=>{
    numberListener(event.target.dataset.value);
}  ));

let reset = document.querySelector(".reset");
reset.addEventListener("click", resetCalculator);

let deleteKey = document.querySelector(".delete");
deleteKey.addEventListener("click", deleteLast);

let operators = document.querySelectorAll(".operator");
operators.forEach(operation => operation.addEventListener("click",(event)=>{
    operationListener(event.target.dataset.value);
}));

let equal = document.querySelector(".equals");
equal.addEventListener("click", equals);

let decimal = document.querySelector(".decimal");
decimal.addEventListener("click", addDecimal);


document.addEventListener("keydown",(event)=>{
    if(event.key >= 0 && event.key <=9){
        numberListener(event.key);
    }

    switch(event.key){
        case '+':
        case '-':
        case '*':
        case '/':
            operationListener(event.key);
        break;

        case 'Enter':
            equals();
            break;

        case '.':
            addDecimal();
            break;

        case 'Backspace':
            deleteLast();
        break;

        case 'Escape':
            resetCalculator();
            break;
    }
})


//change theme

function set_theme(theme_name){
    localStorage.setItem('theme', theme_name);
    document.documentElement.className = theme_name;
}

function change_theme(){
    if (localStorage.getItem('theme') === 'theme_1') {
        set_theme('theme_2');
    }
    else if (localStorage.getItem('theme') === 'theme_2') {
        set_theme('theme_3');
    }
    else if (localStorage.getItem('theme') === 'theme_3') {
        set_theme('theme_1');
    }
}

set_theme('theme_1')

//END change theme

function updateScreen(input){
    document.getElementById("value").textContent = input;
}

let display = [];
let all_values = [];
let new_value = 0;
let dot = 0;
let operator = [];
let number = 0;
let j = 0;

document.addEventListener("keydown", () => {board(event.key)});

function board(code) {
    if (0 <= code && code <= 9)
        calcul(code);
    if (code == '+' || code == '-' || code == '/')
        calcul(code);
    if (code == '*')
        calcul('x');
    if (code == 'Enter')
        calcul('=');
    if (code == 'Backspace')
        calcul('DEL');
}

function calcul(value) {
    if (value == "RESET") {
        display = "0";
        all_values = [];
        new_value = 0;
        operator = [];
        dot = 0;
    }
    else if (value == "DEL") {
        if (display.length == 1)
            display = "0";
        else
            display = display.slice(0, display.length - 1);
    }
    else if (value == "=") {
        new_value = number;
        all_values[j] = new_value;
        calculator(all_values, operator);
        display = "0";
        all_values = [];
        new_value = 0;
        operator = [];
        dot = 0;
        j = 0;
        return;
    }
    else if (value == "+" || value == "-" || value == "x" || value == "/") {
        new_value = number;
        all_values[j] = new_value;
        j++;
        operator += value;
        dot = 0;
        updateScreen(display);
        display = [];
        return;
    }
    else if (value == ".") {
        if (dot == 1)
            return;
        else if (display == 0) {
            display += "0";
            display += ".";
            dot = 1;
        }
        else {
            display += value;
            dot = 1;
        }
    }
    else if (display == "0") {
        display = value;
    }
    else {
        if (display.length > 10){
            updateScreen("Error");
            return;
        }
        display += value;
    }
    if (display == "00.")
        display = "0."
    updateScreen(display);
    number = parseFloat(display);
}

function calculator(all_values, operator) {
    let i = 0;
    let result = parseFloat(all_values[0]);

    while (operator[i])
    {
        if (operator[i] == "+")
        result += parseFloat(all_values[i+1]);
        else if (operator[i] == "-")
            result -= all_values[i+1];
        else if (operator[i] == "x")
            result *= all_values[i+1];
        else if (operator[i] == "/")
            result /= all_values[i+1];
        i++;
    }
    let str = result.toString();
    if (str.length > 10) {
        updateScreen("Error");
        return;
    }
    updateScreen(str);
}

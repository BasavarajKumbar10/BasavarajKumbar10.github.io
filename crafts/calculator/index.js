const display = document.getElementById('display');
const buttonsContainer = document.getElementById('buttons_container');

const NUMBER_TYPE = 'numbers';
const OPERATOR_TYPE = 'ACTIONS';
const ACTIONS = {
    sub:"-",
    add:"+",
    mulitply:"X",
    divide: "/",
    allClear: 'AC',
    equals: '=',
    clear: '<-'
};
Object.freeze(ACTIONS)

const numbersList = [0, 1, 2, 3, 4 ,5 ,6, 7, 8,9];
let result = {
    operand1: '',
    operand2: '',
    operation: '',
    output: '',
};



// events
function onButtonClick(value, type){
   console.log('clicked',value, type);
   const { operand1, operand2, operation, output} = result;
   switch(type) {
        case NUMBER_TYPE:
        if(operation) {
            result =  {
                ...result,
                operand2: `${operand2}${value}`
            }
        } else {
            result =  {
                ...result,
                operand1: `${operand1}${value}`
            } 
        }
           
            break;
        case OPERATOR_TYPE:
            if(value === ACTIONS.equals || operation){
                const total = calculate();
                result = {
                    ...result,
                    operand1: total, 
                    operand2: '',
                    output: total,
                    operation: '',
                }
            } if(value === ACTIONS.clear){
                if(operation) {
                    result = {
                        ...result,
                        operand2: operand2.slice(0, operand2.length - 1)
                    }
                } else {
                    result = {
                        ...result,
                        operand1: operand1.slice(0, operand2.length - 1)
                    }
                }
            } else {
                result = {
                    ...result,
                    operation: value,
                }
            }
            break;
        
   }
   updateDisplay();
}
// events - end

function calculate(){
    const { operand1, operand2, operation, output } = result;
    if(!operand1 || !operand2) {
        return output;
    }
    switch(operation) {
        case ACTIONS.add:
        return parseInt(operand1) + parseInt(operand2);
        case ACTIONS.sub:
        return parseInt(operand1) - parseInt(operand2);
        case ACTIONS.mulitply:
        return parseInt(operand1) * parseInt(operand2);
        case ACTIONS.divide:
        return parseInt(operand1) / parseInt(operand2);

    }
}

function updateDisplay() {
    let value = "";
    const { operand1, operand2, operation, output } = result;
    if(result.operation === '='){
        value = result.output;
    } else if(result.operation  === ACTIONS.allClear) {
        value = '';
        result = {
            operand1: '',
            operand2: '',
            operation: '',
            output: '',
        }
    } else {
        value = `${operand1} ${operation} ${operand2}`;
    }
    display.innerHTML = String(value).trim() || '0';
}

function addNumberButtons() {
    return numbersList
    .map(btn => `<button id="${btn}" onclick="onButtonClick('${btn}', '${NUMBER_TYPE}')">${btn}</button>`);
}

function addOperatorButtons() {
    return Object.values(ACTIONS)
    .map(btn => `<button id="${btn}" onclick="onButtonClick('${btn}', '${OPERATOR_TYPE}')">${btn}</button>`);
}

function showButtons() {
    const numberButtons = addNumberButtons();
    const operatorButtons = addOperatorButtons();
    buttonsContainer.innerHTML = [...numberButtons, ...operatorButtons].reverse().join('');

}


updateDisplay();
showButtons();

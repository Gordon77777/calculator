class calculation {
    elements = [];
    answer = null;
}

window.addEventListener('DOMContentLoaded', (event) => {

    const calculatorButtons = document.querySelectorAll('button[data-type="operation"], button[data-type="number"]');

    let calculationChange = false;

    let calculationCurrent = new calculation;
    let calculationHistory = [];

    calculatorButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            handleButtonClickEvent(event.target.dataset.type, event.target.dataset.value);
            console.log(calculationCurrent);
            console.log(calculationHistory);
        })
    });

    function handleButtonClickEvent(type, value) {
        calculationChange = false;

        if (type === 'operation') {
            processOperationButtonClick(value);
        } else {
            processNumberButtonClick(value);
        }

        if (calculationChange) {
            setCalculatorHtml();
        }
    }

    function processOperationButtonClick(operation) {
        switch (operation) {
            case 'delete':
                processDeleteButtonClick();
                break;

            case 'ac':
                processClearCalculationClick();
                break;

            case 'equals':
                processEqualsButtonClick();
                break;

            case 'history':
                processFullscreenHistoryButtonClick();
                break;

            case '+':
                processMathOperatorButtonClick('+');
                break;

            case '-':
                processMathOperatorButtonClick('-');
                break;
            default:
                break;
        }
    }

    function processNumberButtonClick(number) {
        elementsLength = calculationCurrent.elements.length;
        if (elementsLength === 0 || typeof calculationCurrent.elements[elementsLength - 1] !== 'number') {
            calculationCurrent.elements.push(Math.floor(number));
            calculationChange = true;
        }
    }

    function processDeleteButtonClick() {
        if (calculationCurrent.answer === null) {
            calculationCurrent.elements.pop();
            calculationChange = true;
        }
    }

    function processClearCalculationClick() {
        if (calculationCurrent.elements.length > 0) {
            calculationCurrent = new calculation;
            calculationChange = true;
        }
    }

    function processEqualsButtonClick() {
        // Contains 2 numbers and an operation at a minimum
        if (calculationCurrent.length > 2) {
            // if the last element of the current calculation is an operation, strip it from the end of the array
            // This needs clarification ...
            if (typeof calculationCurrent[calculationCurrent.length - 1] !== 'number') {
                calculationCurrent.elements.pop();
            }
            calculationCurrent.answer = calculateAnswer();
            calculationHistory.push(calculationCurrent);
            calculationCurrent = new calculation;
            calculationChange = true;
        }
    }

    function processFullscreenHistoryButtonClick() {

    }

    function processMathOperatorButtonClick(operator) {
        if (typeof calculationCurrent[calculationCurrent.length - 1] === 'number') {
            calculationCurrent.elements.push(operator);
            calculationChange = true;
        } else {
            // New calculation with no number elements, so start the current calculation with the previous answer.
            if (calculationHistory.length > 0 && calculationCurrent.elements.length === 0) {
                let previousAnswer = calculationHistory[calculationHistory.length - 1].answer;
                calculationCurrent.elements.push(previousAnswer);
                calculationCurrent.elements.push(operator);
                calculationChange = true;
            }
        }
    }

    function calculateAnswer() {
        let answer = calculationCurrent.elements[0];

        for (let i = 0; i < calculationCurrent.elements.length; i++) {
            if (typeof (calculationCurrent.elements[i]) !== 'number') {
                switch (calculationCurrent.elements[i]) {
                    case '+':
                        answer = answer + calculationCurrent.elements[i + 1];
                        break;
                    case '-':
                        answer = answer - calculationCurrent.elements[i + 1];
                        break;
                    default:
                        break;
                }
            }
        }

        return answer;
    }

    function setCalculatorHtml(viewType = 'calculator') {
        if (viewType === 'history') {

        } else {

        }
        // set html based on current state of variables
    }
});

window.addEventListener('DOMContentLoaded', (event) => {

    const operationButtons = document.querySelectorAll('button[data-type="operation"]');
    const numberButtons = document.querySelectorAll('button[data-type="number"]');
    const calculationBlueprint = {
        elements: [],
        answer: null
    }
    let calculationCurrent = calculationBlueprint;
    let calculationHistory = [];

    // Initialise buttons
    operationButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            handleOperationButtonClickEvent(event.target.dataset.value);
        })
    });

    numberButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            handleNumberButtonClickEvent(event.target.dataset.value);
        })
    });

    function handleOperationButtonClickEvent(operation) {
        switch (operation) {
            case 'delete':
                handleDeleteButtonClick();
                break;

            case 'ac':
                handleClearCalculationClick();
                break;

            case 'equals':
                handleEqualsButtonClick();
                break;

            case 'history':
                handleFullscreenHistoryButtonClick();
                break;

            case '+':
                handleMathOperatorButtonClick('+');
                break;

            case '-':
                handleMathOperatorButtonClick('-');
                break;
            default:
                break;
        }
    }

    function handleNumberButtonClickEvent(number) {
        elementsLength = calculationCurrent.elements.length;

        if (elementsLength === 0 || typeof calculationCurrent.elements[elementsLength - 1] !== 'number') {
            calculationCurrent.elements.push(number);
            // change html
        }
    }

    function handleDeleteButtonClick() {
        if (calculationCurrent.answer === null) {
            calculationCurrent.elements.pop();
            // document.querySelectorAll('button[data-type="operation"]');
            // change html
        }
    }

    function handleClearCalculationClick() {
        calculationCurrent = calculationBlueprint;
        // change html
    }

    function handleEqualsButtonClick() {
        // Contains 2 numbers and an operation at a minimum
        if (calculationCurrent.length > 2) {
            // if the last element of the current calculation is an operation, strip it from the end of the array
            // This needs clarification ...
            if (typeof calculationCurrent[calculationCurrent.length - 1] !== 'number') {
                calculationCurrent.elements.pop();
            }
            calculationCurrent.answer = calculateAnswer();
            calculationHistory.push(calculationCurrent);
            // change html
            calculationCurrent = calculationBlueprint;
        }
    }

    function handleFullscreenHistoryButtonClick() {

    }

    function handleMathOperatorButtonClick(operator) {
        if (typeof calculationCurrent[calculationCurrent.length - 1] === 'number') {
            calculationCurrent.elements.push(operator);
        } else {
            // New calculation with no number elements, so start the current calculation with the previous answer.
            if (calculationHistory.length > 0 && calculationCurrent.elements.length === 0) {
                let previousAnswer = calculationHistory[calculationHistory.length - 1].answer;
                calculationCurrent.elements.push(previousAnswer);
                calculationCurrent.elements.push(operator);
            }
        }
        // change html
    }

    function calculateAnswer() {
        let answer = calculationCurrent.elements[0];

        for (let i = 0; i < calculationCurrent.elements.length; i++) {
            // Is an operator - not a number, therefore calculate the result 
            // of the current answer, the operator and element after the operator.
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
});

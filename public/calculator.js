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

            case '=':
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
        } else {
            if (typeof calculationCurrent.elements[elementsLength - 1] === 'number') {
                let newNumber = calculationCurrent.elements[elementsLength - 1] + '';
                newNumber += number;
                calculationCurrent.elements[elementsLength - 1] = Math.floor(newNumber);
                calculationChange = true;
            }
        }
    }

    function processDeleteButtonClick() {
        if (calculationCurrent.answer === null && calculationCurrent.elements.length > 0) {
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
        if (calculationCurrent.elements.length > 2) {
            // if the last element of the current calculation is an operation, strip it from the end of the array
            // This needs clarification ...
            if (typeof calculationCurrent.elements[calculationCurrent.elements.length - 1] !== 'number') {
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
        if (typeof calculationCurrent.elements[calculationCurrent.elements.length - 1] === 'number') {
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
                        answer += calculationCurrent.elements[i + 1];
                        break;
                    case '-':
                        answer -= calculationCurrent.elements[i + 1];
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
            let calculationArea = document.getElementById('calculation-area-container');
            let calculationHistoryArea = document.getElementById('history-container');
            let newCalculationAreaHtml = buildCalculationHtml(calculationCurrent);
            let newCalculationHistoryHtml = buildCalculationHistoryHtml(calculationCurrent);

            calculationArea.innerHTML = newCalculationAreaHtml;
            calculationHistoryArea.innerHTML = newCalculationHistoryHtml;

            let calculationHistoryEntries = document.getElementsByClassName('historical-calculation-container');
            if (calculationHistoryEntries.length) {
                Array.from(calculationHistoryEntries).forEach((element) => {
                    element.scrollLeft = element.offsetWidth + element.offsetWidth;
                });
            }

            calculationArea.scrollLeft = calculationArea.offsetWidth;
        }
    }

    function buildCalculationHtml(calculation) {
        let calculationHtml = '';
        calculation.elements.forEach(element => {
            if (typeof element === 'number') {
                calculationHtml += `<span class="number">${element}</span>`;
            } else {
                calculationHtml += `<span class="operator">${element}</span>`;
            }
        });
        if (calculation.answer) {
            calculationHtml += `<span class="equals">=</span><span class="answer">${calculation.answer}</span>`;
        }

        return calculationHtml;
    }

    function buildCalculationHistoryHtml() {
        let calculationHistoryHtml = '';
        calculationHistory.forEach(calculation => {
            let calculationHtml = buildCalculationHtml(calculation);
            calculationHistoryHtml += `<div class="historical-calculation-container">${calculationHtml}</div>`;
        });

        return calculationHistoryHtml;
    }
});

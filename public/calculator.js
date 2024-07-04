window.addEventListener('DOMContentLoaded', (event) => {

    const operation_buttons = document.querySelectorAll('button[data-type="operation"]');
    const number_buttons = document.querySelectorAll('button[data-type="number"]');
    const calculation_blueprint = {
        elements: [],
        answer: null
    }
    let calculation_current = calculation_blueprint;
    let calculation_history = [];

    // Initialise buttons
    operation_buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            handleOperationButtonClickEvent(event.target.dataset.value);
        })
    });

    number_buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            handleNumberButtonClickEvent(event.target.dataset.value);
        })
    });

    function handleOperationButtonClickEvent(operation) {
        switch (operation) {
            case 'delete':
                // delete the last digit or operation from the data array.
                break;
            case 'ac':
                // set the current calculation to the default blank state.
                break;
            case 'equals':
                // - if the current calculation length > 2
                //         - if the last element of the current calculation is an operation
                //             - strip it from the end
                // (THIS IS A QUESTION THAT NEEDS TO BE ASKED AFTER SUBMISSION)
                //         - calculate the answer.
                //         - set the answer.
                //         - push the current calculation to the history.
                //         - set the current calculation to the default blank state.
                break;
            case 'history':
                // show fullscreen history, build html.
                break;
            case '+':
                // - if the last element of the calculation is a number
            //         - push the operation onto the end of the current calculation.
            //     - else
            //         - if the length of the history > 0 AND length of the current_calculation is 0
            //             - Push the last calculation history's number onto the current calculation and push the operation onto the end of the current
            //               calculation.
                break;
            case '-':
                
                break;
            default:
                break;
        }
    }

    function handleNumberButtonClickEvent(number) {
        console.log(number);
        //     - if the last element of the current calculation is an operation OR the length of the current calculation is 0
//         - push the number onto the end of the current calculation.
    }
});

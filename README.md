# calculator
Using node v20.9.0

To view, run:

npm install
node index.js

---------------------
Basic calculator:

2 objects:

- calculation current
- calculation history

    - each of these 2 objects is made up of an array containing:
        - elements => array of operations and numbers i.e [1, '+', '3', '-']
        - answer => the answer, defaults to null

On click of an operation:
- delete:   delete the last digit or operation from the data array.
- ac:       set the current calculation to the default blank state.
- history:  show fullscreen history, build html.
- equals:
    - if the current calculation length > 2
        - if the last element of the current calculation is an operation
            - strip it from the end
        - calculate the answer.
        - set the answer.
        - push the current calculation to the history.
        - set the current calculation to the default blank state.

- plus or minus:
    - if the last element of the calculation is a number
        - push the operation onto the end of the current calculation.
    - else
        - if the length of the history > 0 AND length of the current_calculation is 0
            - Push the last calculation history's number onto the current calculation and push the operation onto the end of the current
              calculation.

- number:
    - if the last element of the current calculation is an operation OR the length of the current calculation is 0
        - push the number onto the end of the current calculation.

const slider = document.getElementById('myRange');
const output = document.getElementById('value');

let newBoardSize = Number(slider.value);
let newNumberOfSquares = newBoardSize * newBoardSize;
let oldNumberOfSquares = newNumberOfSquares;

for(let i = 1; i <= newNumberOfSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    const grid = document.querySelector('#grid');
    grid.appendChild(square);
    let squareLength = 100 / newBoardSize;
    square.setAttribute('style', `width: ${squareLength}%; height: ${squareLength}%; border: none;`);
}

slider.oninput = function() {
    output.textContent = this.value + ' x ' + this.value;
    let newBoardSize = Number(this.value);
    let newNumberOfSquares = newBoardSize * newBoardSize;

    let cntHelp = 0;
    let oldSquaresList = document.querySelectorAll('.square');
    oldSquaresList = Array.from(oldSquaresList);
    oldSquaresList.forEach((square) => {
        cntHelp++;
        if(cntHelp <= newNumberOfSquares) {
            let squareLength = 100 / newBoardSize;
            square.setAttribute('style', `width: ${squareLength}%; height: ${squareLength}%; border: none;`);
        } else {
            square.remove();
        }
    });

    if(newNumberOfSquares > oldNumberOfSquares) {
        for(let i = oldNumberOfSquares + 1; i <= newNumberOfSquares; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            const grid = document.querySelector('#grid');
            grid.appendChild(square);
            let squareLength = 100 / newBoardSize;
            square.setAttribute('style', `width: ${squareLength}%; height: ${squareLength}%; border: none`);        
        }
    }

    oldNumberOfSquares = newNumberOfSquares;
}

function blackButtonFunction() {
    let clicksNumber = 0;
    const blackButton = document.getElementById('black');
    blackButton.addEventListener('click', () => {
        // let squaresList = document.querySelectorAll('.square');
        // squaresList = Array.from(squaresList);
        // squaresList.forEach((square) => {
        //     square.addEventListener('dragstart', () => {
        //         square.style.backgroundColor = 'black';
        //     });
        // });

        const grid = document.querySelector('#grid');
        let isDrawing = false;

        function draw(event) {
            if(isDrawing === true) {
                event.target.style.backgroundColor = 'black';
            }
        }

        grid.addEventListener('mousedown', function startDraw(event) {
            isDrawing = true;
            draw(event);
        });
        grid.addEventListener('mousemove', draw);
        grid.addEventListener('mouseup', function stopDraw() {
            isDrawing = false;
        });
    });
}

blackButtonFunction();
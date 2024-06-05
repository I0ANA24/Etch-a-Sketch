///display the board size under the slider
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

///grid button global
const gridButton = document.getElementById('grid-button');
let existGrid = 0;
gridButton.addEventListener('click', (event) => {
    if(!existGrid) {
        existGrid = 1;
        event.target.style.border = '2px solid rgb(15, 66, 204)';
        event.target.style.color = 'rgb(20, 51, 137)';
        event.target.style.boxShadow = '0px 0px 20px rgb(15, 66, 204)';
        let squaresList = document.querySelectorAll('.square');
        squaresList = Array.from(squaresList); 
        squaresList.forEach((square) => {
            square.style.border = '1px solid black';
        });
    } else {
        existGrid = 0;
        event.target.style.border = '2px solid rgb(15, 66, 204)';
        event.target.style.color = 'rgb(20, 51, 137)';
        event.target.style.boxShadow = '0 0 0 black';
        event.target.addEventListener('mouseover', (event2) => {
            event2.target.style.border = '2px solid rgb(15, 66, 204)';
            event2.target.style.color = 'rgb(20, 51, 137)';
        });
        event.target.addEventListener('mouseout', (event2) => {
            event2.target.style.border = '2px solid black';
            event2.target.style.color = 'black';
        });
        let squaresList = document.querySelectorAll('.square');
        squaresList = Array.from(squaresList);
        squaresList.forEach((square) => {
            square.style.border = 'none';
        });
    }
});

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

    if(existGrid == 1) {
        let squaresList = document.querySelectorAll('.square');
        squaresList = Array.from(squaresList);
        squaresList.forEach((square) => {
            square.style.border = '1px solid black';
        });
    }
    blackButtonFunction();
    //gridButtonFunction();  
}

function blackButtonFunction() {
    let clicksNumber = 0;
    const blackButton = document.getElementById('black');
    blackButton.addEventListener('click', () => {
        clicksNumber++;//////////////aici
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

function gridButtonFunction() {
    const gridButton = document.getElementById('grid-button');
    let existGrid = 0;
    let squaresList = document.querySelectorAll('.square');
    squaresList = Array.from(squaresList);
    gridButton.addEventListener('click', (event) => {
        if(!existGrid) {
            existGrid = 1;
            event.target.style.border = '2px solid rgb(15, 66, 204)';
            event.target.style.color = 'rgb(20, 51, 137)';
            event.target.style.boxShadow = '0px 0px 20px rgb(15, 66, 204)';
            squaresList.forEach((square) => {
                square.style.border = '1px solid black';
            });
        } else {
            existGrid = 0;
            event.target.style.border = '2px solid rgb(15, 66, 204)';
            event.target.style.color = 'rgb(20, 51, 137)';
            event.target.style.boxShadow = '0 0 0 black';
            event.target.addEventListener('mouseover', (event2) => {
                event2.target.style.border = '2px solid rgb(15, 66, 204)';
                event2.target.style.color = 'rgb(20, 51, 137)';
            });
            event.target.addEventListener('mouseout', (event2) => {
                event2.target.style.border = '2px solid black';
                event2.target.style.color = 'black';
            });
            squaresList.forEach((square) => {
                square.style.border = 'none';
            });
        }
    });
}

blackButtonFunction();
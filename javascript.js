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

//----------------------- black button -----------------------
const blackButton = document.getElementById('black');
let existBlack = 0;
blackButton.addEventListener('click', (event) => {
    if(!existBlack) {
        existBlack = 1;
        removeEraserEffect('black');
        event.target.style.border = '2px solid rgb(15, 66, 204)';
        event.target.style.color = 'rgb(20, 51, 137)';
        event.target.style.boxShadow = '0px 0px 20px rgb(15, 66, 204)';

        const grid = document.querySelector('#grid');
        let isDrawing = false;

        function draw(event) {
            if(isDrawing === true && existBlack) {
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
    } else {
        removeBlackEffect('black');
        const grid = document.querySelector('#grid');
        let isDrawing = false;

        function draw(event) {
            if(isDrawing === true) {
                event.target.style.backgroundColor = 'black';
            }
        }

        grid.addEventListener('mousedown', function startDraw(event) {
            isDrawing = false;
            draw(event);
        });
        grid.addEventListener('mousemove', draw);
        grid.addEventListener('mouseup', function stopDraw() {
            isDrawing = false;
        });
    }
});

//----------------------- eraser button -----------------------
const eraserButton = document.getElementById('eraser');
let existEraser = 0;
eraserButton.addEventListener('click', (event) => {
    if(!existEraser) {
        existEraser = 1;
        removeBlackEffect('eraser');
        event.target.style.border = '2px solid rgb(15, 66, 204)';
        event.target.style.color = 'rgb(20, 51, 137)';
        event.target.style.boxShadow = '0px 0px 20px rgb(15, 66, 204)';
        
        const grid = document.querySelector('#grid');
        let isDrawing = false;

        function draw(event) {
            if(isDrawing === true && existEraser) {
                event.target.style.backgroundColor = 'white';
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
    } else {
        removeEraserEffect('eraser');

        const grid = document.querySelector('#grid');
        let isDrawing = false;

        function draw(event) {
            if(isDrawing === true) {
                event.target.style.backgroundColor = 'black';
            }
        }

        grid.addEventListener('mousedown', function startDraw(event) {
            isDrawing = false;
            draw(event);
        });
        grid.addEventListener('mousemove', draw);
        grid.addEventListener('mouseup', function stopDraw() {
            isDrawing = false;
        });
    }
});

//----------------------- grid button -----------------------
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
            square.style.border = '0.1px solid gray';
        });
    } else {
        removeGridEffect();

        let squaresList = document.querySelectorAll('.square');
        squaresList = Array.from(squaresList);
        squaresList.forEach((square) => {
            square.style.border = 'none';
        });
    }
});

//----------------------- clear button -----------------------
const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', (event) => {
    let squaresList = document.querySelectorAll('.square');
    squaresList = Array.from(squaresList);
    squaresList.forEach((square) => {
        square.style.backgroundColor = 'white';
    });
    event.target.addEventListener('mouseover', (event2) => {
        event2.target.style.border = '2px solid rgb(15, 66, 204)';
        event2.target.style.color = 'rgb(20, 51, 137)';
    });
    event.target.addEventListener('mouseout', (event2) => {
        event2.target.style.border = '2px solid black';
        event2.target.style.color = 'black';
    });
    removeEraserEffect('clear');
});

//----------------------- slider -----------------------
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
            square.style.border = '0.1px solid gray';
        });
    }

    removeEraserEffect('slider');
}

//----------------------- remove black effect -----------------------
function removeBlackEffect(from) {
    if(existBlack === 1){
        existBlack = 0;
        if(from === 'black') {
            blackButton.style.border = '2px solid rgb(15, 66, 204)';
            blackButton.style.color = 'rgb(20, 51, 137)';
            blackButton.style.boxShadow = '0 0 0 black';
        } else {
            blackButton.style.border = '2px solid black';
            blackButton.style.color = 'black';
            blackButton.style.boxShadow = '0 0 0 black';
        }
        blackButton.addEventListener('mouseover', (event2) => {
            if(existBlack === 0) {
                event2.target.style.border = '2px solid rgb(15, 66, 204)';
                event2.target.style.color = 'rgb(20, 51, 137)';
                event2.target.style.boxShadow = '0 0 0 black';
            }
        });
        blackButton.addEventListener('mouseout', (event2) => {
            if(existBlack === 0) {
                event2.target.style.border = '2px solid black';
                event2.target.style.color = 'black';
                event2.target.style.boxShadow = '0 0 0 black';
            }
        });
    }
}

//----------------------- remove eraser effect -----------------------
function removeEraserEffect(from) {
    existEraser = 0;
    if(from === 'eraser') {
        eraserButton.style.border = '2px solid rgb(15, 66, 204)';
        eraserButton.style.color = 'rgb(20, 51, 137)';
        eraserButton.style.boxShadow = '0 0 0 black';
    } else {
        eraserButton.style.border = '2px solid black';
        eraserButton.style.color = 'black';
        eraserButton.style.boxShadow = '0 0 0 black';
    }
    eraserButton.addEventListener('mouseover', (event2) => {
        if(existEraser === 0) {
            event2.target.style.border = '2px solid rgb(15, 66, 204)';
            event2.target.style.color = 'rgb(20, 51, 137)';
        }
    });
    eraserButton.addEventListener('mouseout', (event2) => {
        if(existEraser === 0) {
            event2.target.style.border = '2px solid black';
            event2.target.style.color = 'black';
        }
    });
}

//----------------------- remove grid effect -----------------------

function removeGridEffect() {
    existGrid = 0;
    gridButton.style.border = '2px solid rgb(15, 66, 204)';
    gridButton.style.color = 'rgb(20, 51, 137)';
    gridButton.style.boxShadow = '0 0 0 black';
    gridButton.addEventListener('mouseover', (event2) => {
        if(existGrid === 0) {
            event2.target.style.border = '2px solid rgb(15, 66, 204)';
            event2.target.style.color = 'rgb(20, 51, 137)';
        }
    });
    gridButton.addEventListener('mouseout', (event2) => {
        if(existGrid === 0) {
            event2.target.style.border = '2px solid black';
            event2.target.style.color = 'black';
        }
    });
}
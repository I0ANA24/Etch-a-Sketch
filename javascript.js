for(let i = 1; i <= 16 * 16; i++) {
    const square = document.createElement('div');
    square.classList.add("square")
    const divContainer = document.querySelector('#grid');
    divContainer.appendChild(square);
}
const colors = document.getElementsByClassName('color');
const buttonContainer = document.getElementById('button-container');
const pixelBoard = document.getElementById('pixel-board');
const pixels = document.getElementsByClassName('pixel');
const input = document.createElement('input');
const sizeButton = document.createElement('button');
const resetButton = document.createElement('button');
let selectedColor = 'rgb(0 0 0)';
let sizeOfBoard;

function generateColorsOfPalette() {
  const colorsOfPalette = ['black'];
  for (let index = 0; index < 3; index += 1) {
    const randomColor = `rgb(${Math.floor((Math.random() * 255))}, ${Math.floor((Math.random() * 255))}, ${Math.floor((Math.random() * 255))})`;
    colorsOfPalette.push(randomColor);
  }
  for (let index = 0; index < 4; index += 1) {
    colors[index].style.backgroundColor = colorsOfPalette[index];
  }
}

generateColorsOfPalette();

input.id = 'board-size';
sizeButton.id = 'generate-board';
sizeButton.innerHTML = 'VQV';

buttonContainer.appendChild(input);
buttonContainer.appendChild(sizeButton);

function addColorToPixel(event) {
  event.target.style.backgroundColor = selectedColor;
}

function generatePixelBoard() {
  for (let index = 0; index < sizeOfBoard; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixelBoard.appendChild(pixel);
    for (let index2 = 0; index2 < pixels.length; index2 += 1) {
      pixels[index2].addEventListener('click', addColorToPixel);
    }
  }
}

function defineSizeOfBoard() {
  const size = input.value;
  sizeOfBoard = size * size;
  pixelBoard.style.width = `${(size * 40) + (40 * 0.35)}px`;
  pixelBoard.style.height = `${(size * 40) + 10}px`;
  generatePixelBoard();
}

sizeButton.addEventListener('click', defineSizeOfBoard);

window.onload = colors[0].classList.add('selected');

function addClassSelected(event) {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function getColor(event) {
  selectedColor = window.getComputedStyle(event.target, null).getPropertyValue('background-color');
}

for (let index = 0; index < colors.length; index += 1) {
  colors[index].addEventListener('click', addClassSelected);
  colors[index].addEventListener('click', getColor);
}

resetButton.id = 'clear-board';
resetButton.innerHTML = 'Limpar';

buttonContainer.appendChild(resetButton);

function resetColor() {
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = '';
  }
}

resetButton.addEventListener('click', resetColor);

window.onload = function generateInitialPixelBoard() {
  for (let index = 0; index < 25; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixelBoard.appendChild(pixel);
    for (let index2 = 0; index2 < pixels.length; index2 += 1) {
      pixels[index2].addEventListener('click', addColorToPixel);
    }
  }
}

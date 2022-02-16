const colors = document.getElementsByClassName('color');

function generateColorsOfPalette() {
  const colorsOfPalette = ['black'];
  for (let index = 0; index < 3; index += 1) {
    const randomColor = `rgb(${Math.floor((Math.random() * 255))}, ${Math.floor((Math.random() * 255))}, ${Math.floor((Math.random() * 255))})`;
    colorsOfPalette.push(randomColor);
  }
  for (let index = 0; index < 4; index += 1) {
    colors[index].id = (colorsOfPalette[index]);
    colors[index].style.backgroundColor = colorsOfPalette[index];
  }
}

generateColorsOfPalette();

const pixelBoard = document.getElementById('pixel-board');

function generatePixelBoard() {
  for (let index = 0; index < 25; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixelBoard.appendChild(pixel);
  }
}

generatePixelBoard();

window.onload = colors[0].classList.add('selected');

function addClassSelected(event) {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

let selectedColor = 'rgb(0 0 0)';

function getColor(event) {
  selectedColor = window.getComputedStyle(event.target, null).getPropertyValue('background-color');
}

for (let index = 0; index < colors.length; index += 1) {
  colors[index].addEventListener('click', addClassSelected);
  colors[index].addEventListener('click', getColor);
}

const pixels = document.getElementsByClassName('pixel');

function addColorToPixel(event) {
  event.target.style.backgroundColor = selectedColor;
}

for (let index = 0; index < pixels.length; index += 1) {
  pixels[index].addEventListener('click', addColorToPixel);
}

const buttonContainer = document.getElementById('button-container');
const resetButton = document.createElement('button');
resetButton.id = 'clear-board';
resetButton.innerHTML = 'Limpar';

buttonContainer.appendChild(resetButton);

function resetColor() {
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = '';
  }
}

resetButton.addEventListener('click', resetColor);

const input = document.createElement('input');
const sizeButton = document.createElement('button');
input.id = 'board-size';
sizeButton.id = 'generate-board';
sizeButton.innerHTML = 'VQV';

buttonContainer.appendChild(input);
buttonContainer.appendChild(sizeButton);

const colors = document.getElementsByClassName('color');
const buttonContainer = document.getElementById('button-container');
const main = document.getElementById('main-content');
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
// propriedades type e min colocadas com ajuda do Tiago na mentoria.
input.type = 'number';
input.min = 1;
sizeButton.id = 'generate-board';
sizeButton.innerHTML = 'VQV';
buttonContainer.appendChild(input);
buttonContainer.appendChild(sizeButton);

function addColorToPixel(event) {
  // eslint-disable-next-line no-param-reassign
  event.target.style.backgroundColor = selectedColor;
}

function generatePixelBoard() {
  const pixelBoard = document.getElementById('pixel-board');
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
  let size = input.value;
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.innerHTML = '';
  if (input.value === '') {
    alert('Board inválido!');
  }
  if (size < 5) {
    size = 5;
  }
  if (size > 50) {
    size = 50;
  }
  sizeOfBoard = size * size;
  pixelBoard.style.width = `${(size * 40) + (size * 2)}px`;
  pixelBoard.style.height = `${(size * 40) + (size * 2)}px`;
  generatePixelBoard();
}

sizeButton.addEventListener('click', defineSizeOfBoard);

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

window.onload = colors[0].classList.add('selected');

window.onload = function generateInitialPixelBoard() {
  const initialPixelBoard = document.createElement('section');
  initialPixelBoard.id = 'pixel-board';
  main.appendChild(initialPixelBoard);
  for (let index = 0; index < 25; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    initialPixelBoard.appendChild(pixel);
    for (let index2 = 0; index2 < pixels.length; index2 += 1) {
      pixels[index2].addEventListener('click', addColorToPixel);
    }
  }
};

/*
Com ajuda do Tiago na mentoria, retirei essa parte do código do início da função defineSizeOfBoard onde eu pegava o elemento, deletava, criava um novo, colocava um id e depois pegava o recem-criado novamente para aí sim seguir na função...troquei isso tudo por definir o innerHTML do elemento para uma string vazia!
const oldPixelBoard = document.getElementById('pixel-board');
oldPixelBoard.remove();
const newPixelBoard = document.createElement('section');
newPixelBoard.id = 'pixel-board';
main.appendChild(newPixelBoard);
*/

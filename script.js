const colors = document.getElementsByClassName('color');

function generateColorsOfPalette(color1, color2, color3, color4) {
  const colorsOfPalette = [color1, color2, color3, color4];
  for (let index = 0; index < 4; index += 1) {
    colors[index].id = (colorsOfPalette[index]);
    colors[index].style.backgroundColor = colorsOfPalette[index];
  }
}

generateColorsOfPalette('black', 'darkcyan', 'yellowgreen', 'brown');

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

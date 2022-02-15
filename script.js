const colors = document.getElementsByClassName('color');

function generateColorsOfPalette(color1, color2, color3, color4) {
  const colorsOfPalette = [color1, color2, color3, color4];
  for (let index = 0; index < 4; index += 1) {
    colors[index].id = (colorsOfPalette[index]);
    colors[index].style.background = colorsOfPalette[index];
  }
}

generateColorsOfPalette('black', 'darkblue', 'darkgreen', 'darkmagenta');

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

for (let index = 0; index < colors.length; index += 1) {
  colors[index].addEventListener('click', addClassSelected);
}

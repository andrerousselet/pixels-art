const colors = document.getElementsByClassName('color');
const buttonContainer = document.getElementById('button-container');
const main = document.getElementById('main-content');

let selectedColor = 'rgb(0 0 0)';

// Função que cria cor aleatória no padrão rgb para ser usada dentro da função generateColorsOfPalette.
function generateRandomColor() {
  const array = [];
  for (let index = 0; index < 3; index += 1) {
    const randomNum = Math.floor((Math.random() * 256));
    array.push(randomNum);
  }
  const color = `rgb(${array[0]}, ${array[1]} ,${array[2]})`;
  return color;
}

// Primeiro, cria array com a cor preta no índice [0]. Em seguida, insere mais 3 cores aleatórias
// (usando função generateRandomColor). Por fim, usa outro loop para definir as cores de background
// dos elementos colors.
function generateColorsOfPalette() {
  const colorsOfPalette = ['black'];
  for (let index = 0; index < 3; index += 1) {
    colorsOfPalette.push(generateRandomColor());
  }
  for (let index = 0; index < 4; index += 1) {
    colors[index].style.backgroundColor = colorsOfPalette[index];
  }
}

// Atribui à variável selectedColor a cor de fundo do elemento clicado.
function getColor(event) {
  selectedColor = event.target.style.backgroundColor;
}

const input = document.createElement('input');
input.id = 'board-size';
input.type = 'number';
input.min = 1;
buttonContainer.appendChild(input);

const sizeButton = document.createElement('button');
sizeButton.id = 'generate-board';
sizeButton.innerHTML = 'VQV';
buttonContainer.appendChild(sizeButton);

const resetButton = document.createElement('button');
resetButton.id = 'clear-board';
resetButton.innerHTML = 'Limpar';
buttonContainer.appendChild(resetButton);

// Função de callback que atrubui a cor selecionada (após clicar na paleta),
// ao pixel no quadro de pixels (escolhido - clicado)
function addColorToPixel(event) {
  const clickedPixel = event.target;
  clickedPixel.style.backgroundColor = selectedColor;
}

// Função chamada dentro de defineSizeOfBoard (abaixo) que preenhce o quadro de pixels,
// usando um loop para gerar o número de pixels necessários (através da variável sizeofBoard),
// adicionando a cada um a classe pixel e também um escutador de eventos que chama a função addColorToPixel.
function generatePixelBoard(pixelBoard, sizeOfBoard) {
  for (let index = 0; index < sizeOfBoard; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixelBoard.appendChild(pixel);
    pixel.addEventListener('click', addColorToPixel);
  }
}

// Captura o valor do input em uma variável e, através de três checagens, define o tamanho
// máximo e mínimo (altura/largura) do quadro de pixels ou a mensagem dentro do alert.
// Depois atrubui à variável sizeOfBoard o valor do quadrado de size (esta variável será usada na
// função generatePixelBoard posteriormente)
// Também define a altura e largura do quadro, connsiderando os tamanhos dos pixels (40px) junto
// com a soma das bordas (1px para cada lado).
function defineSizeOfBoard() {
  let size = input.value;
  const pixelBoard = document.getElementById('pixel-board');
  pixelBoard.innerHTML = '';
  if (!input.value) {
    alert('Board inválido!');
  }
  if (size < 5) {
    size = 5;
  }
  if (size > 50) {
    size = 50;
  }
  const sizeOfBoard = size * size;
  pixelBoard.style.width = `${(size * 40) + (size * 2)}px`;
  pixelBoard.style.height = `${(size * 40) + (size * 2)}px`;
  generatePixelBoard(pixelBoard, sizeOfBoard);
}

// Primeiro remove a classe selected de todas as cores da paleta e depois adiciona
// a mesma classe ao elemento clicado.
function addClassSelected(event) {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

// Adiciona escutadores de eventos às cores da paleta.
function addListenersToPalette() {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].addEventListener('click', addClassSelected);
    colors[index].addEventListener('click', getColor);
  }
}

// Função que gera o quadro de pixels inicial, com os tamanhos prédefinidos do exercício
// (5 pixels de 40px de altura e largura + 10px de bordas = 210px de altura/largura >>definidos no CSS<<).
// Dentro do loop que gera os pixels, tbm adiciona à cada um o escutador de eventos que chama a função
// addColorToPixel.
function generateInitialPixelBoard() {
  const initialPixelBoard = document.createElement('section');
  initialPixelBoard.id = 'pixel-board';
  main.appendChild(initialPixelBoard);
  for (let index = 0; index < 25; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    initialPixelBoard.appendChild(pixel);
    pixel.addEventListener('click', addColorToPixel);
  }
}

// Adiciona a classe selected na primeira cor da paleta assim que a página é carregada
// (chamando a função dentro de window.onload).
function addSelectedToFirstColor() {
  colors[0].classList.add('selected');
}

function resetColor() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = '';
  }
}

// Chama funções no carregameto da página
window.onload = () => {
  generateInitialPixelBoard();
  generateColorsOfPalette();
  addListenersToPalette();
  addSelectedToFirstColor();
  sizeButton.addEventListener('click', defineSizeOfBoard);
  resetButton.addEventListener('click', resetColor);
};

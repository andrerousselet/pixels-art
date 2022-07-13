const colors = document.getElementsByClassName('color');
const buttonContainer = document.getElementById('button-container');
const main = document.getElementById('main-content');

const input = document.createElement('input');
const sizeButton = document.createElement('button');
const resetButton = document.createElement('button');

const PIXEL_BOARD = 'pixel-board';
let selectedColor = 'rgb(0 0 0)';
let sizeOfBoard;

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

input.id = 'board-size';
// propriedades type e min colocadas com ajuda do Tiago na mentoria.
input.type = 'number';
input.min = 1;
sizeButton.id = 'generate-board';
sizeButton.innerHTML = 'VQV';
buttonContainer.appendChild(input);
buttonContainer.appendChild(sizeButton);

// Função de callback que atrubui a cor selecionada (após clicar na paleta),
// ao pixel no quadro de pixels (escolhido - clicado)
function addColorToPixel(event) {
  const clickedPixel = event.target;
  clickedPixel.style.backgroundColor = selectedColor;
}

// Função chamada dentro de defineSizeOfBoard (abaixo) que preenhce o quadro de pixels,
// usando um loop para gerar o número de pixels necessários (através da variável sizeofBoard),
// adicionando a cada um a classe pixel e também um escutador de eventos que chama a função addColorToPixel.
function generatePixelBoard() {
  const pixelBoard = document.getElementById(PIXEL_BOARD);
  for (let index = 0; index < sizeOfBoard; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixelBoard.appendChild(pixel);
    // for (let index2 = 0; index2 < pixels.length; index2 += 1) {
    //   pixels[index2].addEventListener('click', addColorToPixel);
    // }
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
  const pixelBoard = document.getElementById(PIXEL_BOARD);
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

// Ao clicar no botão sizeButton, a função defineSizeOfBoard é chamada.
sizeButton.addEventListener('click', defineSizeOfBoard);

// Primeiro remove a classe selected de todas as cores da paleta e depois adiciona
// a mesma classe ao elemento clicado.
function addClassSelected(event) {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

// Atribui à variável selectedColor a cor de fundo do elemento clicado.
function getColor(event) {
  // selectedColor = window.getComputedStyle(event.target, null).getPropertyValue('background-color');
  // console.log(selectedColor);
  selectedColor = event.target.style.backgroundColor;
  // console.log(event.target.style.backgroundColor);
}

// Adiciona escutadores de eventos às cores da paleta.
function addListenersToPalette() {
  for (let index = 0; index < colors.length; index += 1) {
    colors[index].addEventListener('click', addClassSelected);
    colors[index].addEventListener('click', getColor);
  }
}

resetButton.id = 'clear-board';
resetButton.innerHTML = 'Limpar';
buttonContainer.appendChild(resetButton);

function resetColor() {
  const pixels = document.getElementsByClassName('pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = '';
  }
}

// Função que gera o quadro de pixels inicial, com os tamanhos prédefinidos do exercício
// (5 pixels de 40px de altura e largura + 10px de bordas = 210px de altura/largura >>definidos no CSS<<).
// Dentro do loop que gera os pixels, tbm adiciona à cada um o escutador de eventos que chama a função
// addColorToPixel.
function generateInitialPixelBoard() {
  const initialPixelBoard = document.createElement('section');
  initialPixelBoard.id = PIXEL_BOARD;
  main.appendChild(initialPixelBoard);
  for (let index = 0; index < 25; index += 1) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    initialPixelBoard.appendChild(pixel);
    // for (let index2 = 0; index2 < pixels.length; index2 += 1) {
    //   pixels[index2].addEventListener('click', addColorToPixel);
    // }
    pixel.addEventListener('click', addColorToPixel);
  }
}

// Adiciona a classe selected na primeira cor da paleta assim que a página é carregada
// (chamando a função dentro de window.onload).
function addSelectedToFirstColor() {
  colors[0].classList.add('selected');
}

// Chama funções no carregameto da página.
window.onload = () => {
  addListenersToPalette();
  generateInitialPixelBoard();
  generateColorsOfPalette();
  addSelectedToFirstColor();
  resetButton.addEventListener('click', resetColor);
};

/*
Com ajuda do Tiago na mentoria, retirei essa parte do código do início da função defineSizeOfBoard onde eu pegava o elemento, deletava, criava um novo, colocava um id e depois pegava o recem-criado novamente para aí sim seguir na função...troquei isso tudo por definir o innerHTML do elemento para uma string vazia!
const oldPixelBoard = document.getElementById('pixel-board');
oldPixelBoard.remove();
const newPixelBoard = document.createElement('section');
newPixelBoard.id = 'pixel-board';
main.appendChild(newPixelBoard);
*/

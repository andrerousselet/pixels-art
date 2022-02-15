const divs = document.getElementsByClassName('color');

function generateColorOfDivs(color1, color2, color3, color4) {
  const coresDaPaleta = [color1, color2, color3, color4];
  for (let index = 0; index < 4; index += 1) {
    divs[index].id = (coresDaPaleta[index]);
    divs[index].style.background = coresDaPaleta[index];
  }
}

generateColorOfDivs('black', 'darkblue', 'darkgreen', 'darkmagenta');

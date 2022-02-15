const coresDaPaleta = ['black', 'darkblue', 'darkgreen', 'darkmagenta'];
const divs = document.getElementsByClassName('color');

for (let index = 0; index < 4; index += 1) {
  divs[index].classList.add(coresDaPaleta[index]);
  divs[index].style.background = coresDaPaleta[index];
}

const selectionBox = document.querySelector('.selection-box');
const playArea = document.querySelector('.play-area');
const resultSection = document.querySelector('.result');
const selectionButtonX = document.querySelector('.selection-button-x')
const selectionButtonO = document.querySelector('.selection-button-o')
const spanElements = document.querySelectorAll('section span')
const slider = document.querySelector('.slider');
const playerX = document.querySelector('.playerX')
const playerO = document.querySelector('.playerO')


function hidingAndShow(hide, show) {
    hide.classList.add('hide')
    hide.classList.remove('show')
    show.classList.add('show')
    show.classList.remove('hide')
}
function OTurnAnimation() {
    slider.style.left = '50%'
    playerX.classList.remove('active')
    playerO.classList.add('active' , 'player')
}
function XTurnAnimation() {
    slider.style.left = '2%'
    playerO.classList.remove('active')
    playerX.classList.add('active')
}

window.onload = () => {
    for (let i = 0; i < spanElements.length; i++) {
        const element = spanElements[i];
        element.setAttribute('onclick' , 'clickedElem(this)')
    }
   
    selectionButtonX.onclick = () => {
        hidingAndShow(selectionBox, playArea)
        XTurnAnimation()
    }
    selectionButtonO.onclick = () => {
        hidingAndShow(selectionBox, playArea)
        OTurnAnimation()
    }
}

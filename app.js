const selectionBox = document.querySelector('.selection-box');
const playArea = document.querySelector('.play-area');
const resultSection = document.querySelector('.result');
const selectionButtonX = document.querySelector('.selection-button-x')
const selectionButtonO = document.querySelector('.selection-button-o')
const slider = document.querySelector('.slider');
const playerX = document.querySelector('.playerX')
const playerO = document.querySelector('.playerO')
const spanElements = document.querySelectorAll('section span')

let playerSign = 'X'
function hidingAndShow(hide, show) {
    hide.classList.add('hide')
    hide.classList.remove('show')
    show.classList.add('show')
    show.classList.remove('hide')
}
function OTurnAnimation() {
    slider.style.left = '50%'
    playerX.classList.remove('active')
    playerO.classList.add('active', 'player')
}
function XTurnAnimation() {
    slider.style.left = '2%'
    playerO.classList.remove('active')
    playerX.classList.add('active')
}

window.onload = () => {
    for (let i = 0; i < spanElements.length; i++) {
        const element = spanElements[i];
        element.setAttribute('onclick', 'clickedElem(this)')
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

let cross = '<i class="fa-solid fa-xmark"></i>'
let circle = '<i class="fa-regular fa-circle"></i>'

function clickedElem(element) {
    if (playerO.classList.contains('player')) {
        element.innerHTML = circle
        XTurnAnimation()
        playerO.classList.remove('player')
    }
    else {
        element.innerHTML = cross
        OTurnAnimation()
    }
    element.style.pointerEvents = 'none'
    botClick()
}


function botClick() {
    const array = []
    for (let i = 0; i < spanElements.length; i++) {
        const element = spanElements[i];
        if (element.childElementCount == 0) {
            array.push(i)
        }
    }
    setTimeout(() => {
        let randomClick = array[Math.floor(Math.random() * array.length)]
        if (array.length > 0) {
            if (playerO.classList.contains('player')) {
                spanElements[randomClick].innerHTML = circle
                XTurnAnimation()
                playerO.classList.remove('player')
            }
            else {
                spanElements[randomClick].innerHTML = cross
                OTurnAnimation()
            }
            spanElements[randomClick].style.pointerEvents = 'none'
        }
    }, 500)
}

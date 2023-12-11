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
        playerSign = 'O'
        element.setAttribute('id', playerSign)
        playerO.classList.remove('player')
        XTurnAnimation()
    }
    else {
        element.innerHTML = cross
        element.setAttribute('id', playerSign)
        OTurnAnimation()
    }
    element.style.pointerEvents = 'none'
    botClick()
    checkingWinner()
}


function botClick() {
    playerSign = 'O'
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

                spanElements[randomClick].setAttribute('id', playerSign)
                playerO.classList.remove('player')
            }
            else {
                spanElements[randomClick].innerHTML = cross
                playerSign = 'X'
                spanElements[randomClick].setAttribute('id', playerSign)
                OTurnAnimation()
            }
            spanElements[randomClick].style.pointerEvents = 'none'
            playerSign = 'X'
        }
    }, 500)
}


function returningIds(className) {
    return document.querySelector('.box' + className).id
}

function checking3SameIds(val1, val2, val3, sign) {
    if (returningIds(val1) == sign &&
        returningIds(val2) == sign &&
        returningIds(val3) == sign) {
        return true
    }
}

function checkingWinner() {
    if (
        checking3SameIds(1, 2, 3, playerSign) ||
        checking3SameIds(4, 5, 6, playerSign) ||
        checking3SameIds(7, 8, 9, playerSign) ||
        checking3SameIds(1, 4, 7, playerSign) ||
        checking3SameIds(2, 5, 8, playerSign) ||
        checking3SameIds(3, 6, 9, playerSign) ||
        checking3SameIds(1, 5, 9, playerSign) ||
        checking3SameIds(3, 5, 7, playerSign)
    ) {
        alert('The Winner is ' + playerSign) ;
    }
}
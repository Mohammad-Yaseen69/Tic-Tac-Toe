const selectionBox = document.querySelector('.selection-box');
const playArea = document.querySelector('.play-area');
const resultSection = document.querySelector('.result');
const selectionButtonX = document.querySelector('.selection-button-x')
const selectionButtonO = document.querySelector('.selection-button-o')
const slider = document.querySelector('.slider');
const playerX = document.querySelector('.playerX')
const playerO = document.querySelector('.playerO')
const spanElements = document.querySelectorAll('section span')
const winner = document.querySelector('.winner')

let playerSign = 'X'
let runBot = true;

// Creating Function for showing and hiding elements

function hidingAndShow(hide, show) {
    hide.classList.add('hide')
    hide.classList.remove('show')
    show.classList.add('show')
    show.classList.remove('hide')
}

// Creating Function for animaiton when turn change to O
function OTurnAnimation() {
    slider.style.left = '50%'
    playerX.classList.remove('active')
    playerO.classList.add('active', 'player')
}

// Creating Function for animation when turn change to X
function XTurnAnimation() {
    slider.style.left = '2%'
    playerO.classList.remove('active')
    playerX.classList.add('active')
}

// Adding function for both selection Buttons and adding clickedElem function to the span elements 

window.onload = () => {
    for (let i = 0; i < spanElements.length; i++) {
        const element = spanElements[i];
        element.setAttribute('onclick', 'clickedElem(this)')
    }

    selectionButtonX.onclick = () => {
        hidingAndShow(selectionBox, playArea)
        XTurnAnimation()
        spanElements.forEach(element => {
            element.style.pointerEvents = 'auto'
            element.id = null
        })
    }
    selectionButtonO.onclick = () => {
        hidingAndShow(selectionBox, playArea)
        OTurnAnimation()
        spanElements.forEach(element => {
            element.style.pointerEvents = 'auto'
            element.id = null
        })
    }
}

// Function for user click

let cross = '<i class="fa-solid fa-xmark"></i>'
let circle = '<i class="fa-regular fa-circle"></i>'

function clickedElem(element) {
    if (playerO.classList.contains('player')) { // if the turn is 0
        element.innerHTML = circle;
        playerSign = 'O';
        element.setAttribute('id', playerSign);
        playerO.classList.remove('player');
        XTurnAnimation();
    } else {                                  //if the turn is X
        element.innerHTML = cross;
        playerSign = 'X'
        element.setAttribute('id', playerSign);
        OTurnAnimation();
    }
    element.style.pointerEvents = 'none';
    botClick(runBot);
    showingResult()
}

// Function for bot click

function botClick(runBot) {
    if (runBot) {
        const array = []; // all the unclick / unselected spam elemenets to the array
        for (let i = 0; i < spanElements.length; i++) {
            const element = spanElements[i];
            if (element.childElementCount == 0) {
                array.push(i);
            }
        }
        setTimeout(() => {
            let randomClick = array[Math.floor(Math.random() * array.length)]; // making a random index for bot click
            if (array.length > 0) {
                if (playerO.classList.contains('player')) {
                    spanElements[randomClick].innerHTML = circle;
                    XTurnAnimation();
                    playerSign = 'O';
                    spanElements[randomClick].setAttribute('id', playerSign);
                    playerO.classList.remove('player');
                }
                else {
                    spanElements[randomClick].innerHTML = cross;
                    playerSign = 'X';
                    spanElements[randomClick].setAttribute('id', playerSign);
                    OTurnAnimation();
                }
                spanElements[randomClick].style.pointerEvents = 'none';
                showingResult()
            }
        }, 500);
    }
}

// Returning the ids of elements

function returningIds(className) {
    return document.querySelector('.box' + className).id
}

// Function for checking Winner

function checkingWinner() {
    const winningCombinations = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Row
        [1, 4, 7], [2, 5, 8], [3, 6, 9], //Column
        [1, 5, 9], [3, 5, 7] //Diagonal
    ]

    for (const combination of winningCombinations) {
        const [val1, val2, val3] = combination;
        if (
            returningIds(val1) === playerSign &&
            returningIds(val2) === playerSign &&
            returningIds(val3) === playerSign
        ) {
            winner.innerHTML = playerSign
            runBot = false
            return true;
        }
    }
    return false;
}

// Function for checking Draw

function checkingDraw() {
    if (!checkingWinner()) {
        for (let i = 0; i < spanElements.length; i++) {
            const element = spanElements[i];
            if (element.childElementCount === 0) {
                return false;
            }
        }

        return true;
    }
    return false;
}

// Showing result

function showingResult() {
    const drawElem = document.querySelector('.winner-h1')
    if (checkingWinner()) {
        setTimeout(() => {
            hidingAndShow(playArea, resultSection)
        }, 500)
    }
    if (checkingDraw()) {
        hidingAndShow(playArea, resultSection)
        drawElem.innerHTML = 'Its a draw'
    }
}

function replayBtn() {
    hidingAndShow(resultSection, selectionBox)
    spanElements.forEach(element => {
        element.innerHTML = ''
    })
    location.reload()
}
'use strict'

var gBoardSize = 4
var gNums = []
var gCurrNum
var gTimerInterval
var gGameOver

function init() {
    clearInterval(gTimerInterval)

    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

    var elSpan = document.querySelector('div .timer')
        elSpan.innerText = '0.000'

    gCurrNum = 1
    createNums()
    createBoard()
    gGameOver = false
}

function setLevel(boardSize) {
    console.log('boardSize:', boardSize)
    gBoardSize = boardSize
    init()
}


function createNums() {

    for (var i = 1; i <= gBoardSize ** 2; i++) {
        gNums.push(i)
    }
}

function createBoard() {
    var strHTML = ''

    for (var i = 0; i < gBoardSize; i++) {
        strHTML += '\n <tr>'

        for (var j = 0; j < gBoardSize; j++) {
            var randomNum = getRandomNum()

            strHTML += `\n\t <td onclick="cellClicked(${randomNum}, this)"> ${randomNum} </td>`
        }
        strHTML += '\n </tr>'
    }

    // console.log('strHTML:', strHTML)

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function getRandomNum() {
    // console.log('gNums:', gNums)
    var randomIdx = getRandomIntInclusive(0, gNums.length - 1)
    // console.log('randomIdx:', randomIdx)
    var randomNum = gNums[randomIdx]
    // console.log('randomNum:', randomNum)

    gNums.splice(randomIdx, 1)
    // console.log('gNums:', gNums)
    return randomNum
}

function cellClicked(clickedNum, elBtn) {
    if (!gGameOver) {
        if (clickedNum === 1) startTimer()

        if (clickedNum === gCurrNum) {
            elBtn.style.backgroundColor = '#ff7b25'
            gCurrNum++
            gameOver()
        }
    }
}


function startTimer() {

    var startTime = Date.now()

    gTimerInterval = setInterval(() => {
        // console.log(());
        var seconds = ((Date.now() - startTime) / 1000).toFixed(3)
        var elSpan = document.querySelector('div .timer')
        elSpan.innerText = seconds

    }, 1)
    // console.log('startGame.getMilliseconds():',startGame.getUTCMilliseconds())
    // var secondsFromStart = startGame.getMilliseconds() - startGame.getMilliseconds()

    // console.log('millisecondsFromStart', millisecondsFromStart,)


    // console.log('secondsFromStart:', secondsFromStart)
}

// function checkMove(elBtn) {
//     console.log('currNum before if', gCurrNum)
//     // console.log('elBtn.innerText:', elBtn.innerText)
//     // console.log('gCurrNum:', gCurrNum)
//     if (+elBtn.innerText === gCurrNum) {
//         elBtn.style.backgroundColor = '#ff7b25'
//         gCurrNum++
//         gameOver()
//     }
//     console.log('currNum after if', gCurrNum)

// }


function gameOver() {
    if (gCurrNum === gBoardSize ** 2 + 1) {
        clearInterval(gTimerInterval)
        gGameOver = true

        var elModal = document.querySelector('.modal')
        elModal.style.display = 'block'

        var elModalHeader = document.querySelector('.modal-header')
        elModalHeader.innerText = 'You Won!'
        return console.log('You Won!')
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

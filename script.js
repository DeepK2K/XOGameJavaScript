
const X_CLASS='x';
const CIRCLE_CLASS='circle';
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const winningMessageText=document.querySelector('[data-winning-message-text]')
const winningMessageElement=document.querySelector('#winning-message')
const cellElements=document.querySelectorAll('[data-cell]');
const gameBoard=document.querySelector('.game-board');
const restartBtn=document.getElementById("restart")
let circleTurn;

restartBtn.addEventListener("click",startGame)
startGame()
function startGame(){
    circleTurn=false;
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once:true})
    })
    gameBoardHover()
    winningMessageElement.classList.remove("show")
}
function handleClick(e){
    const cell=e.target;
    const currentClass=circleTurn ? CIRCLE_CLASS :X_CLASS;
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    else{
        setTurns()
        gameBoardHover()
    }
    
}
function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
    
}
function endGame(draw){
    if(draw){
        winningMessageText.innerText="Draw!"
    }
    else{
        winningMessageText.innerText =`${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add("show")
    console.log(winningMessageText.innerText)

}
function isDraw(){
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
function setTurns(){
    circleTurn=!circleTurn;
}
function gameBoardHover(){
    gameBoard.classList.remove(X_CLASS);
    gameBoard.classList.remove(CIRCLE_CLASS);
    if(circleTurn){
        gameBoard.classList.add(CIRCLE_CLASS);
    }
    else{
        gameBoard.classList.add(X_CLASS);
}
}
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })

}
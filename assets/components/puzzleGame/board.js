const $ = require('jquery');
const pieces = document.querySelectorAll('.puzzle__piece');

let index = 0;
let board = [];
let solvedBoard =[];
let shuffleMode = true;
let shuffleAmount = 0;
let piecesContainer = [];
let shuffle = 0;

function resetPiecesTransformations(){
    let newTop = 0;
    let newLeft = 0;
    pieces.forEach((piece,key)=>{
       //console.log(piece.style.left);
       if(key>=0 && key<=2){
           newTop = 0;
       }else if(key>=3 && key <=5){
           newTop = 85;
       }else if(key >=6 && key <=7){
           newTop = 170;
       }
       pieces[key].style.top = `${newTop}px`;
       if(key === 0 || key === 3 || key === 6){
           newLeft = 0;
       }else if(key === 1 || key === 4 || key === 7){
           newLeft = 85;
       }else if(key === 2 || key === 5 || key === 8){
           newLeft = 170;
       }
       pieces[key].style.left = `${newLeft}px`;


    });
}

function initBoard(){
    index = 0;
    board = [];
    solvedBoard =[];
    shuffleMode = true;
    shuffleAmount = 200;
    piecesContainer = [];

    for(row=0; row<3;row++){
        board[row] = [];
        for(col=0; col <3; col++){
            if(index <= 7){
                pieces[index].style.left = `${col * 85}px`;
                pieces[index].style.top = `${row * 85}px`;
                board[row][col] = index + 1;
                index++;
            }else{
                board[row][col] = -1;
            }
        }
    }

    for(row=0; row<3;row++){
        solvedBoard[row] = [];
        for(col=0; col <3; col++){
            solvedBoard[row][col] = board[row][col];
        }
    }
    //console.log(board, solvedBoard);
}

/**
 * Function update board
 */
function updateBoard(board, coordinatesOfClicked, coordinatesToMove){
    const tmpBoardItem = board[coordinatesToMove[0]][coordinatesToMove[1]];
    board[coordinatesToMove[0]][coordinatesToMove[1]] = board[coordinatesOfClicked[0]][coordinatesOfClicked[1]];
    board[coordinatesOfClicked[0]][coordinatesOfClicked[1]] = tmpBoardItem;
}

/**
 * Function getOffset - offset on the board of clicked element
 */
function getOffset(piece, type){
    if(type === 'left'){
        return parseInt(piece.style.left);
    }
    else if(type === 'top'){
        return parseInt(piece.style.top);
    }

}

/**
 * Function getMatrixOfPossibleMovements
 */
function getMatrix(clickedCoordX, clickedCoordY){
    const matrix = [];
    if((clickedCoordX - 1) >= 0){
        matrix.push([clickedCoordX - 1, clickedCoordY]);
    }
    if((clickedCoordX + 1) <= 2){
        matrix.push([clickedCoordX + 1, clickedCoordY]);
    }
    if((clickedCoordY - 1) >= 0){
        matrix.push([clickedCoordX, clickedCoordY - 1]);
    }
    if((clickedCoordY + 1) <= 2){
        matrix.push([clickedCoordX, clickedCoordY + 1]);
    }
    return matrix;
}
/**
 * Function responsible for movement in viewport
 */
function doMove(piece,shiftLeft, shiftTop, dx, dy, delay = 200){
    if(dx > 0){
        piece.animate([
                {left: `${shiftLeft + 85}px`}
            ],
            {
                duration: delay,
                iterations: 1
            }).finished.then(()=>{
            piece.style.left = `${shiftLeft + 85}px`;
        });
    }
    // move DOWN so Top: +85px;
    else if(dy > 0){
        piece.animate([
                {top: `${shiftTop + 85}px`}
            ],
            {
                duration: delay,
                iterations: 1
            }).finished.then(()=>{
            piece.style.top = `${shiftTop + 85}px`;
        });
    }
    // move left so Left: -85px
    else if(dx < 0){
        piece.animate([
                {left: `${shiftLeft - 85}px`}
            ],
            {
                duration: delay,
                iterations: 1
            }).finished.then(()=>{
            piece.style.left = `${shiftLeft - 85}px`;
        });
    }
    // move Up so Top: -85px;
    else if(dy < 0){
        piece.animate([
                {top: `${shiftTop - 85}px`}
            ],
            {
                duration: delay,
                iterations: 1
            }).finished.then(()=>{
            piece.style.top = `${shiftTop - 85}px`;
        });
    }
}

/**
 * Gen index/position of Clicked element
 */
function getIndexClicked(board, e){
    const elementNo = parseInt(e.target.innerText,10);
    let isIn = []
    let number = 0;
    // get index/position of clicked element
    board.forEach((item, key)=>{
        isIn.push(item.findIndex((element)=>{
            return element === elementNo;
        }));
        number = isIn.pop();
        if(number >= 0){
            isIn.push([key, number]);
        }
    })
    return [isIn[0][0], isIn[0][1]];
}

/**
 * Get movement direction
 */
function getDirection(coordinates, clicked){
    const dx = coordinates[0] - clicked[0];
    const dy = coordinates[1] - clicked[1];

    return [dy, dx];
}

/**
 * Function handleUserMoves -- LOCAL STORAGE
 */
localStorage.clear();
const amount = document.getElementById('amount');
const theBest = document.getElementById('theBest');
theBest.innerText = localStorage.getItem('theBest') ?? 0;
let moves = localStorage.getItem('numberOfMoves') ?? 0;
function handleMovesNumber(){
    amount.innerText = moves;
    moves++;
}

/**
 * Check is Winner
 */
let isWinner = false;
function isPlayerWinner(moves){
    for(a=0; a <3; a++){
        for(b=0; b<3;b++){
            if(board[a][b] !== solvedBoard[a][b]){
                return false;
            }
        }
    }
    // winner here
    const oldWinner = localStorage.getItem('theBest') ?? 0;
    if(moves < parseInt(oldWinner) || parseInt(oldWinner) === 0){
        localStorage.setItem('theBest', moves);
    }
    //console.log(localStorage.getItem('theBest'));
    //console.log('winner');
    return true;
}
/**
 * Shuffle board
 */
function runShuffle(){
    const clickEvent = new Event('click');
    while(shuffleMode){
        const randPiece = Math.floor(Math.random()*8);
        piecesContainer[randPiece].dispatchEvent(clickEvent);
        shuffleMode = false;
    }
}

/**
 * Function Reset Game
 */
function resetGame(){

    initBoard();
    runGame();
    shuffle = setInterval(()=>{
        runShuffle();
        setTimeout(()=>{
            shuffleMode = true;
        },30);
    },10);
}
resetGame();

function runGame(){
    pieces.forEach((piece)=>{

        piece.addEventListener('click', (e)=>{

            const [clickedCoordX, clickedCoordY] = getIndexClicked(board, e);

            const matrix = getMatrix(clickedCoordX, clickedCoordY);

            matrix.forEach((coordinates) => {
                if(isWinner){return true;}
                // clicked move surrounded by possible move condition
                if(board[coordinates[0]][coordinates[1]] < 0){

                    const shiftLeft = getOffset(piece, 'left');
                    const shiftTop = getOffset(piece, 'top');

                    const [dx, dy] = getDirection(coordinates, [clickedCoordX, clickedCoordY]);

                    updateBoard(board, [clickedCoordX, clickedCoordY],
                        coordinates);
                    shuffleAmount--;
                    if(shuffleAmount <= 0 && shuffleMode === true){
                        clearInterval(shuffle);
                        shuffleMode = false;
                        console.log('shuffle CLEARED and shuffleMode = FALSE');
                    }
                    if(!shuffleMode){
                        doMove(piece,shiftLeft, shiftTop, dx, dy);
                        if(isPlayerWinner(moves)){
                            // create element
                            const div = document.createElement("div");
                            div.classList.add('main__winner');
                            div.innerText = 'winner';
                            // winner
                            const main = document.getElementsByClassName('main');
                            const child = main[0].children[1];
                            let oldChild = main[0].replaceChild(div, child);

                            console.log(main[0].children[1]);
                            //$('.puzzle').hide();
                        }
                        handleMovesNumber();
                    }else{
                        doMove(piece,shiftLeft, shiftTop, dx, dy, 0);
                    }

                }
            });


        });
        piecesContainer.push(piece);

    });
}


const pieces = document.querySelectorAll('.puzzle__piece');
let index = 0;
// Init board
let board = [];;

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
const solvedBoard = [...board];

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
    const elementNo = parseInt(e.target.innerHTML,10);
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

function runShuffle(){

}
runShuffle();

pieces.forEach((piece)=>{
    piece.addEventListener('click', (e)=>{

        const [clickedCoordX, clickedCoordY] = getIndexClicked(board, e);

        const matrix = getMatrix(clickedCoordX, clickedCoordY);

        matrix.forEach((coordinates) => {

            if(board[coordinates[0]][coordinates[1]] < 0){

                const shiftLeft = getOffset(piece, 'left');
                const shiftTop = getOffset(piece, 'top');
                // set coordinates of clicked point
                let x = 0;
                let y = 0;
                const dy = coordinates[0] - clickedCoordX;
                const dx = coordinates[1] - clickedCoordY;

                updateBoard(board, [clickedCoordX, clickedCoordY],
                    coordinates);

                doMove(piece,shiftLeft, shiftTop, dx, dy);
            }
        });


    });
});

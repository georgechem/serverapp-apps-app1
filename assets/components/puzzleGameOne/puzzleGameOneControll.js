/**
 * Create Html Element Piece with specific Styles
 * @param id
 * @returns {HTMLDivElement}
 */
function createPiece(id, currentBoardWidth = 200){
    let piece = null;
    const colors = ['#f00', '#0f0', '#00f', '#000'];
    const pieceSide = 20;
    const pieceMargin = 2.5;
    const rowLength = Math.floor(currentBoardWidth/(pieceSide+2*pieceMargin));
    const pieceStep = currentBoardWidth/rowLength;
    const rowPosition = [];
    for(start = 0;start < currentBoardWidth ;start += pieceStep){
        rowPosition.push(start);
    }
    piece = document.createElement('div');
    piece.id = `${id}`;
    piece.style.position = 'absolute';
    piece.style.width = `${pieceSide}px`;
    piece.style.height = `${pieceSide}px`;
    piece.style.margin = `${pieceMargin}px`;
    piece.style.border = `1px solid #222`;
    /**
     * Temporarily generate only one color
     */
    const currentColor = colors[0];
    //const currentColor = colors[Math.floor(Math.random()*4)];
    if(currentColor === '#000'){piece.style.border = `1px solid #aaa`;}
    piece.style.backgroundImage = `radial-gradient( #777 ,${currentColor} )`;
    //piece.style.backgroundColor = `${colors[Math.floor(Math.random()*5)]}`;
    piece.style.borderRadius= '5px';
    piece.style.top = '0px';
    piece.style.left = `${rowPosition[Math.floor(Math.random()*rowLength)]}px`
    piece.style.transform = 'translateY(0px)';
    piece.setAttribute('name', currentColor );


    return piece;
}

/**
 * Append pieces to Board
 * @param piece
 * @param location
 */
function appendPiece(piece, location){
    location.appendChild(piece);
}

/**
 * Remove piece from board
 * @param piece
 * @param location
 */
function removePiece(piece, location){
    location.removeChild(piece);
}
/**
 * Setup board
 * @param boardWidth
 */
function setupBoard(boardWidth){
    const gameBox = document.getElementById('gameBox');
    gameBox.style.width = `${boardWidth}px`;
    const board = document.getElementById('board');
    board.style.height = '310px';
    board.style.width = `${boardWidth}px`;

    return board;
}
/**
 * Run Piece animation
 * @param piece
 * @param cycle
 * @param delay
 * @returns {number}
 */
function generateId(){
    let id = '';
    let charAt = '';
    for(i=0; i<10;i++){
        charAt =String.fromCharCode(Math.floor(Math.random()*25)+65);
        id += charAt;
    }
    return id;
}

/**
 * Change Color
 */
const changePieceColor = function(){
    changeColor = true;
}

/**
 * Move to left
 */
const movePieceLeft = function(){
    moveLeft = true;
}
/**
 * Move to Right
 */
const movePieceRight = function(){
    moveRight = true;
}

/**
 * Check is line to clear
 */
function isLineToClear(y, board){
    /**
     * Working on board, make copy first
     */
    if(virtualBoard.length < 1){
        return false;
    }
    const rowInBoard = virtualBoard.filter((piece)=>{
        const pieceTranslateY = parseInt(piece.style.transform.slice(11,14).trim());
        return y === pieceTranslateY;
    });
    if(rowInBoard.length < 12){
        return false;
    }
    //const rowInBoard
    const colorInCurrentRow = rowInBoard[0].getAttribute('name');
    const isRowValid = rowInBoard.filter((piece)=>{
        const pieceColor = piece.getAttribute('name');
        return pieceColor !== colorInCurrentRow;
    })
    if(isRowValid.length !== 0 ){
        return false;
    }
    /**
     * Row to clear detected so modify virtualBoard
     * -- remove row to be cleared
     */
    const piecesToBeRemoved = virtualBoard.filter((piece)=>{
        const pieceTranslateY = parseInt(piece.style.transform.slice(11,14).trim());
        return pieceTranslateY === y;
    });

    const newVirtualBoard = virtualBoard.filter((piece)=>{
        const pieceTranslateY = parseInt(piece.style.transform.slice(11,14).trim());
        return pieceTranslateY !== y;
    })
    virtualBoard = [];
    newVirtualBoard.forEach((newPiece)=>{
        virtualBoard.push(newPiece);
    })
    /**
     * Virtual Row is cleared but screen view is not refreshed
     */
    /**
     * Affect view
     */
    piecesToBeRemoved.forEach((pieceToRemove)=>{
       removePiece(pieceToRemove, board);
    });
    return true;
}
/**
 * Run animation
 * @param piece
 * @param cycle
 * @param delay
 * @returns {number}
 */
function runPieceAnimation(piece, delay= 100, boardInfo = null){

    const board = document.getElementById('board');
    const boardHeight = parseInt(board.style.height);
    const pieceHeight = parseInt(piece.style.height);
    const pieceMargin = parseInt(piece.style.margin);
    let currentBottom = boardHeight-pieceHeight- 2*pieceMargin;
    let y = 0;
    changeColor = false;
    moveLeft = false;
    moveRight = false;
    const colorFromMode = ['#f00', '#0f0', '#00f', '#000'];
    let chosen = 0;
    const animPiece = setInterval(()=>{
        /**
         * ChangeColor
         */
        if(changeColor){
            if(chosen > 3){
                chosen = 0;
            }
            const newColor = colorFromMode[chosen];
            piece.style.backgroundImage = `radial-gradient( #777 ,${newColor} )`;
            piece.setAttribute('name',newColor);
            changeColor = false;
            chosen++;
        }
        /**
         * Move to left
         */
        if(moveLeft){
            currentLeftPosition = parseInt(piece.style.left);
            if(currentLeftPosition > 0){
                piece.style.left = `${currentLeftPosition - 25}px`;
            }else{
                piece.style.left = `0px`;
            }

            moveLeft = false;
        }
        /**
         * Move to right
         */
        if(moveRight){
            currentRightPosition = parseInt(piece.style.left);
            if(currentRightPosition > 270){
                piece.style.left = `275px`;
            }else{
                piece.style.left = `${currentRightPosition + 25}px`;
            }
            moveRight = false;
        }

        /**
         * check is falling is possible
         * use virtualBord for estimation
         */
        const bottom = checkMaxMovementAllowed(piece, currentBottom);
        //console.log(virtualBoard);
        if(y >= (bottom + 2*pieceMargin - pieceHeight)){
            //console.log(bottom);
            piece.style.transform = `translateY(${y}px)`;
            virtualBoard.push(piece);
            clearInterval(animPiece);
            /**
             * Check clearing LINE condition
             */
            const lineCleared = isLineToClear(y, board);


            if(cycle < 2000){
                mainThread();
            }else{
                //console.log(virtualBoard);
            }
            cycle++;
            if(lineCleared){
                score += 10;
            }else{
                score++;
            }
            scoreHook.innerText = `${score}`;
        }
        piece.style.transform = `translateY(${y}px)`;
        y += (pieceHeight +  2 * pieceMargin);


    },delay);

    return animPiece;
}
function checkMaxMovementAllowed(currentPiece, currentBottom){
    const currentLeft = parseInt(currentPiece.style.left);
    const currentHeight = parseInt(currentPiece.style.height);
    const currentMargin = parseInt(currentPiece.style.margin);

    // get all pieces on the Way for Current
    const piecesOnWay = virtualBoard.filter((piecePlaced)=>{
        const pieceLeft = parseInt(piecePlaced.style.left);
        return pieceLeft === currentLeft;
    });
    //console.log(piecesOnWay);
    const rowToTop = [];
    piecesOnWay.forEach((piece)=>{
        let pieceTop = parseInt(piece.style.transform.trim().slice(11, 14));
        rowToTop.push(pieceTop);
    });
    //console.log(rowToTop);
    if(rowToTop.length > 0){
        rowToTop.sort((a,b)=>a-b);
        if(rowToTop.length > 7){
        }
       return rowToTop[0] - (currentHeight - 2 * currentMargin);
    }

    return currentBottom;
}

function mainThread(){
    const boardWidth = 300;
    const board = setupBoard(boardWidth);
    const piece = createPiece(generateId(), boardWidth);
    appendPiece(piece, board);
    runPieceAnimation(piece, 300, board);


}
const changeColorBtn = document.getElementById('btnChange');
const moveLeftBtn = document.getElementById('btnLeft');
const moveRightBtn = document.getElementById('btnRight');
cycle = 0;
score = 0;
changeColor = false;
moveLeft = false;
moveRight = false;
virtualBoard =[];
mainThread();
/**
 * Points
 */
const scoreHook = document.getElementById('score')
const theBestHook = document.getElementById('theBest');


changeColorBtn.addEventListener('click',function(){
    changePieceColor();
});
moveLeftBtn.addEventListener('click',function(){
    movePieceLeft();
});
moveRightBtn.addEventListener('click',function(){
    movePieceRight();
});

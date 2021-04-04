/**
 * Create Html Element Piece with specific Styles
 * @param id
 * @returns {HTMLDivElement}
 */
function createPiece(id, amount = 1, currentBoardWidth = 200){
    let piece = null;
    const colors = ['#f00', '#0f0', '#00f', '#000'];
    const pieceSide = 40;
    const pieceMargin = 5;
    const rowLength = currentBoardWidth/(pieceSide+2*pieceMargin);
    const pieceStep = currentBoardWidth/rowLength;
    const rowPosition = [];
    for(start = 0;start < currentBoardWidth ;start += pieceStep){
        rowPosition.push(start);
    }
    for(s=0; s < amount; s++){
        piece = document.createElement('div');
        piece.id = `${id}`;
        piece.style.position = 'absolute';
        piece.style.width = `${pieceSide}px`;
        piece.style.height = `${pieceSide}px`;
        piece.style.margin = `${pieceMargin}px`;
        piece.style.border = `1px solid #222`;
        const currentColor = colors[Math.floor(Math.random()*4)];
        if(currentColor === '#000'){piece.style.border = `1px solid #aaa`;}
        piece.style.backgroundImage = `radial-gradient( #777 ,${currentColor} )`;
        //piece.style.backgroundColor = `${colors[Math.floor(Math.random()*5)]}`;
        piece.style.borderRadius= '5px';
        piece.style.top = '0px';
        piece.style.left = `${rowPosition[Math.floor(Math.random()*rowLength)]}px`
        piece.style.transform = 'translateY(0px)';
        piece.setAttribute('name', currentColor );

    }

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
 * Setup board
 * @param boardWidth
 */
function setupBoard(boardWidth){
    const gameBox = document.getElementById('gameBox');
    gameBox.style.width = `${boardWidth}px`;
    const board = document.getElementById('board');
    board.style.height = '400px';
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
function runPieceAnimation(piece, cycle, delay= 100){
    console.log(cycle);
    const board = document.getElementById('board');
    const boardHeight = parseInt(board.style.height);
    const pieceHeight = parseInt(piece.style.height);
    const pieceMargin = parseInt(piece.style.margin);
    let y = 0;
    const animPiece = setInterval(()=>{
        piece.style.transform = `translateY(${y}px)`;
        y += (pieceHeight + 2 * pieceMargin);
        if(y >= (boardHeight-pieceHeight)){
            virtualBoard.push(piece);
            console.log(piece.id);
            clearInterval(animPiece);
            cycle = false;
        }
    },delay);

    return animPiece;
}

function mainThread(){
    let cycle = true;
    const boardWidth = 300;
    const board = setupBoard(boardWidth);
    const piece = createPiece(generateId(),1, boardWidth);
    appendPiece(piece, board);
    runPieceAnimation(piece, cycle);


}
virtualBoard =[];
mainThread();

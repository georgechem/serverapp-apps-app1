/**
 * Create Html Element Piece with specific Styles
 * @param id
 * @returns {HTMLDivElement}
 */
function createPiece(id, amount = 1, currentBoardWidth = 200){
    const pieces = [];
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
        let piece = document.createElement('div');
        piece.id = `id${id}${s}`;
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
        pieces.push(piece);
    }

    return pieces;
}

function appendPiece(pieces, location){
    pieces.forEach((piece)=>{
        location.appendChild(piece);
    })
}

function mainThread(){
    const boardWidth = 300;
    const gameBox = document.getElementById('gameBox');
    gameBox.style.width = `${boardWidth+20}px`;
    const board = document.getElementById('board');
    board.style.height = '400px';
    board.style.width = `${boardWidth}px`;

    const pieces = createPiece('piece01',1, boardWidth);
    appendPiece(pieces, board);


}
mainThread();

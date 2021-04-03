/**
 * Create Html Element Piece with specific Styles
 * @param id
 * @returns {HTMLDivElement}
 */
function createPiece(id, amount = 1){
    const pieces = [];
    let piece = null;
    for(s=0; s < amount; amount++){
        piece = document.createElement('div');
        piece.id = `id${id}${s}`;
        piece.style.position = 'absolute';
        piece.style.width = '40px';
        piece.style.height = '40px';
        piece.style.margin = '5px';
        piece.style.backgroundColor = '#999';
        piece.style.borderRadius= '5px';
        piece.style.border = '1px solid #ccc';
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
    const board = document.getElementById('board');
    board.style.height = '300px';

    const piece = createPiece('piece01');
    appendPiece(piece, board);

    console.log(board);


}
mainThread();

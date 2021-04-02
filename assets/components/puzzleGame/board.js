const pieces = document.querySelectorAll('.puzzle__piece');
let index = 0;
// Init board
let board = [];
for(a=0; a<3; a++){
    board[a] = [];
    for(b=0;b<3;b++){
        board[a][b] = 0;
    }
}
for(row=0; row<3;row++){
    for(col=0; col <3; col++){
        if(index <= 7){
            pieces[index].style.left = `${col * 85}px`;
            pieces[index].style.top = `${row * 85}px`;
            board[row][col] = index;
            index++;
        }
    }
}
console.log(board);

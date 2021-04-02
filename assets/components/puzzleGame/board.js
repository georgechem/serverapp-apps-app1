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
//console.log(board);
pieces.forEach((piece)=>{
    piece.addEventListener('click', (e)=>{
        const elementNo = parseInt(e.target.innerHTML,10);
        let isIn = [];
        let number = 0;
        board.forEach((item, key)=>{
            isIn.push(item.findIndex((element)=>{
                return element === elementNo;
            }));
            number = isIn.pop();
            if(number >= 0){
                isIn.push([key, number]);
            }
        })
        /**
         * isIn[row, col] - format = value at certain position
         */
        /**
         * 1.check is move is possible
         * 2. do move on virtual board
         * 3. do move on screen as animation
         */
        const clickedCoordX = isIn[0][0];
        const clickedCoordY = isIn[0][1];
        //console.log(board[clickedCoordX][clickedCoordY]);
        // create matrix of possibilities
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
        // check if certain move selected - check
        // availability of -1 value in gives matrix
        // check value -1
        matrix.forEach((coordinates) => {
            //console.log(board[coordinates[0]][coordinates[1]]);
            //console.log(coordinates);
            if(board[coordinates[0]][coordinates[1]] < 0){

                // position to move ex: [2,2]
                console.log(coordinates);
                // need read of position where clicked
                // value checked -1 so the piece clicked
                // is already direct neighbour of place to move
                // -- so only direction for move is needed
                const shiftLeft = parseInt(piece.style.left);
                const shiftTop = parseInt(piece.style.top);
                // set coordinates of clicked point
                let x = 0;
                let y = 0;
                // set x
                if(shiftLeft < 80){
                    x = 0;
                }
                else if(shiftLeft > 80 && shiftLeft < 170){
                    x = 1;
                }
                else if(shiftLeft >170){
                    x = 2;
                }
                // set y
                if(shiftTop < 80){
                    y = 0;
                }
                else if(shiftTop > 80 && shiftTop < 170){
                    y = 1;
                }
                else if(shiftTop > 170){
                    y = 2;
                }
                const currentCoordinates = [x, y];
                const dX = coordinates[0] - currentCoordinates[0];
                const dY = coordinates[1] - currentCoordinates[1];
                // if dX > 0 move RIGHT, if dY > 0 move DOWN
                // has direction - so update virtual Board

                console.log(dX, dY);
            }
        });


    });
});

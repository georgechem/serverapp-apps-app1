const pieces = document.querySelectorAll('.puzzle__piece');
let index = 0;
for(row=0; row<3;row++){
    for(col=0; col <3; col++){
        if(index <= 7){
            pieces[index].style.left = `${col * 80}px`;
            pieces[index].style.top = `${row * 80}px`;
            index++;
        }
    }
}


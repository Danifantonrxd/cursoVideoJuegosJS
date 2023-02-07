const canvas = document.querySelector(".game");
const game = canvas.getContext("2d");

let canvasSize;
let elementsSize;

window.addEventListener("load", setCanvasSize); 
window.addEventListener("resize", setCanvasSize);

function startGame(){

    elementsSize = canvasSize / 10;

    game.font = elementsSize + "px Verdana";
    game.textAlign = "end";

    let level = 0;
    let map = maps[level].trim().split("\n");
    map = map.map(rows => rows.trim().split(""));

    map.forEach((row, i) => {
        row.forEach((col, j) => {
            let posX = elementsSize * (j + 1);
            let posY = elementsSize * (i + 1);
            game.fillText(emojis[col], posX, posY);
        });
    });
}

function setCanvasSize(){ 
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.75;
    }
    else{
        canvasSize = window.innerHeight *0.75;
    }
    canvas.setAttribute("width", canvasSize);
    canvas.setAttribute("height", canvasSize);

    startGame();
}
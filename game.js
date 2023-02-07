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

    let mapToRender = 0;
    let map = maps[mapToRender].trim().split("\n");

    map = map.map(rows => rows.trim().split(""));

    console.log(map);

    for(let i = 1; i <= 10; i++){
        for(let j = 1; j <= 10; j++){
            game.fillText(emojis[map[i-1][j-1]], elementsSize * j, elementsSize * i);
        }
    }
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
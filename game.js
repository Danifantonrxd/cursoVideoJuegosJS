const canvas = document.querySelector(".game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");


let canvasSize;
let elementsSize;

window.addEventListener("load", setCanvasSize); 
window.addEventListener("resize", setCanvasSize);

function startGame(){

    elementsSize = canvasSize / 10;

    game.font = elementsSize + "px Verdana";
    game.textAlign = "end";

    let level = 1;
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

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveUp(){
    console.log("Arriba");
}

function moveLeft(){
    console.log("Izquierda");
}

function moveRight(){
    console.log("Derecha");
}

function moveDown(){
    console.log("Abajo");
}

function moveByKeys(event){
    if(event.key == "ArrowUp"){
        moveUp();
    }
    else if(event.key == "ArrowLeft"){
        moveLeft();
    }
    else if(event.key == "ArrowRight"){
        moveRight();
    }
    else if(event.key == "ArrowDown"){
        moveDown();
    }
}
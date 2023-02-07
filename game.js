const canvas = document.querySelector(".game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");


let canvasSize;
let elementsSize;

let playerPosition = {
    x: 0,
    y: 0
};

const giftPosition = {
    x: 0,
    y: 0
};

window.addEventListener("load", setCanvasSize); 
window.addEventListener("resize", setCanvasSize);

function startGame(){

    elementsSize = canvasSize / 10;

    game.font = elementsSize + "px Verdana";
    game.textAlign = "end";

    let level = 1;
    let map = maps[level].trim().split("\n");
    map = map.map(rows => rows.trim().split(""));

    game.clearRect(0, 0, canvasSize, canvasSize)
    map.forEach((row, i) => {
        row.forEach((col, j) => {
            let posX = elementsSize * (j + 1);
            let posY = elementsSize * (i + 1);
            game.fillText(emojis[col], posX, posY);

            if(col == "O" && (!playerPosition.x && !playerPosition.y)){
                playerPosition["x"] = posX;
                playerPosition["y"] = posY;
            }
            else if(col == "I"){
                giftPosition.x = posX;
                giftPosition.y = posY;
            }
        });
    });
    movePlayer();
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

function movePlayer(){
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y); 

    const colisionX = Math.round(giftPosition.x) == Math.round(playerPosition.x);
    const colisionY = Math.round(giftPosition.y) == Math.round(playerPosition.y);
    const colision = colisionX && colisionY;

    if(colision){
        console.log("Ganaste");
    }
}

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function moveUp(){
    if(!(playerPosition.y - elementsSize < elementsSize)){
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveLeft(){
    if(!(playerPosition.x - elementsSize < elementsSize)){
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveRight(){
    if(!(playerPosition.x + elementsSize > canvasSize)){
        playerPosition.x += elementsSize;
        startGame();
    }
}

function moveDown(){
    if(!(playerPosition.y + elementsSize > canvasSize)){
        playerPosition.y += elementsSize;
        startGame();
    }
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
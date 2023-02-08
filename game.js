const canvas = document.querySelector(".game");
const game = canvas.getContext("2d");
const btnUp = document.querySelector("#up");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const btnDown = document.querySelector("#down");
const spanLives = document.querySelector(".lives");
const spanTime = document.querySelector(".time");
const spanRecord = document.querySelector(".record");


let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
let timeStart;
let interval;

let playerPosition = {
    x: 0,
    y: 0
};

const giftPosition = {
    x: 0,
    y: 0
};

let bombs = [];

window.addEventListener("load", setCanvasSize); 
window.addEventListener("resize", setCanvasSize);

function startGame(){

    elementsSize = canvasSize / 10;

    game.font = elementsSize + "px Verdana";
    game.textAlign = "end";

    if(!maps[level]){
        gameWin();
        return;
    }

    if(!timeStart){
        timeStart = Date.now();
        interval = setInterval(showTime, 100);
        if(!localStorage["record"]){
            localStorage.setItem("record", 0);
        }
        spanRecord.innerText = localStorage["record"];
    }

    let map = maps[level].trim().split("\n");
    map = map.map(rows => rows.trim().split(""));

    bombs = [];
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
            else if(col == "X"){
                bombs.push({x: posX, y: posY});
            }
        });
    });
    showLives();
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

    playerPosition.x = 0;
    playerPosition.y = 0;

    startGame();
}

function movePlayer(){
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y); 

    const giftColisionX = Math.round(giftPosition.x) == Math.round(playerPosition.x);
    const giftColisionY = Math.round(giftPosition.y) == Math.round(playerPosition.y);
    const giftColision = giftColisionX && giftColisionY;

    let bombColisionX;
    let bombColisionY;
    let bombColision;

    const dead = bombs.find(bomb => {
        bombColisionX = Math.round(bomb.x) == Math.round(playerPosition.x);
        bombColisionY = Math.round(bomb.y) == Math.round(playerPosition.y);
        return bombColisionX && bombColisionY;        
    }); 

    if(dead){
        levelFail();
    }

    if(giftColision){
        levelUp();
    }
}

function levelUp(){
    console.log("Ganaste");
    level++;
    startGame();
}

function gameWin(){
    console.log("Terminaste el juego!");
    clearInterval(interval);
    let timeWin = Date.now() - timeStart;
    if(Number(localStorage["record"]) > timeWin){
        localStorage["record"] = timeWin;
    }
}

function levelFail(){
    console.log("Moriste");
    playerPosition.x = 0;
    playerPosition.y = 0;
    lives--;

    if(lives <= 0){
        level = 0;
        lives = 3;
        timeStart = 0;
    }

    startGame();
}

function showLives(){
    //const heartsArray = Array(lives).fill(emojis["HEART"]);
    spanLives.innerText = emojis["HEART"].repeat(lives);
}

function showTime(){
    spanTime.innerText = Date.now() - timeStart;
}

window.addEventListener("keydown", moveByKeys);
btnUp.addEventListener("click", moveUp);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);
btnDown.addEventListener("click", moveDown);

function fixNumber(n){
    return Number(n.toFixed(2));
}

function moveUp(){
    if(!(fixNumber(playerPosition.y - elementsSize) < fixNumber(elementsSize))){
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveLeft(){
    if(!(fixNumber(playerPosition.x - elementsSize) < fixNumber(elementsSize))){
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveRight(){
    if(!(fixNumber(playerPosition.x + elementsSize) > fixNumber(canvasSize))){
        playerPosition.x += elementsSize;
        startGame();
    }
}

function moveDown(){
    if(!(fixNumber(playerPosition.y + elementsSize) > fixNumber(canvasSize))){
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
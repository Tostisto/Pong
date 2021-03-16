document.addEventListener('keydown', keypush);
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let playerWidth = 20;
let playerHeiht = 100;
let playerX = 0;
let playerY = canvas.height / 2 - 30;

let enemyX = canvas.width - playerWidth;
let enemyY = canvas.height / 2 - 30;

let ballSize = 40;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;
let ballSpeed = 5;

let speed = 10;

let velocity_y = 0;

let ballVelocity_x = -1;
let ballVelocity_y = -1;

var audio = new Audio('sound/4379__noisecollector__pongblipg5.wav');

gameloop();

function gameloop() {
    drawBackground();

    drawCenterLine();

    drawPlayer();
    
    drawEnemy();
    
    drawBall();
    
    move();
    
    ballMove();

    requestAnimationFrame(gameloop);
}

function drawRectangle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawPlayer() {
    drawRectangle(playerX, playerY, playerWidth, playerHeiht, "white");
}

function drawEnemy() {
    drawRectangle(enemyX, enemyY, playerWidth, playerHeiht, "white");
}

function drawBackground() {
    drawRectangle(0, 0, canvas.width, canvas.height, "black");
}

function drawCenterLine()
{
    for (let i = 0; i < canvas.height; i +=70)
    {
        drawRectangle(canvas.width / 2 - 5, i, 10, 35, "white");
    }
}

function drawBall() {
    drawRectangle(ballX, ballY, ballSize, ballSize, "white");
}


//ball move
function ballMove() {

    if (ballX + ballSize >= enemyX && ballY <= enemyY + playerHeiht && ballY + ballSize >= enemyY) {
        ballVelocity_x = -1;
        audio.play();
    }

    if (ballX <= playerX + playerWidth && ballY <= playerY + playerHeiht && ballY + ballSize >= playerY) {
        ballVelocity_x = 1;
        audio.play();
    }

    if (ballY <= 0) {
        ballVelocity_y = 1;
    }

    if (ballY >= canvas.height - ballSize) {
        ballVelocity_y = -1;
    }

    ballX += ballSpeed * ballVelocity_x;
    ballY += ballSpeed * ballVelocity_y;

    if (ballX <= 0 || ballX + ballSize >= canvas.width)
    {
        reset();
    }
    
    enemyY = ballY;
}

function reset()
{
    playerX = 0;
    playerY = canvas.height / 2 - 30;

    enemyX = canvas.width - playerWidth;
    enemyY = canvas.height / 2 - 30;

    ballX = canvas.width / 2 - ballSize / 2;
    ballY = canvas.height / 2 - ballSize / 2;

    let velocity_y = 0;

    ballVelocity_x = -1;
    ballVelocity_y = -1;
}


//player move
function move() {
    playerY += speed * velocity_y;

    if (playerY >= canvas.height - playerHeiht || playerY <= 0) {
        velocity_y = 0;
    }

}

//key
function keypush(event) {
    if (event.key == 'ArrowUp' || event.key == 'w') {
        moveup();
    }
    if (event.key == 'ArrowDown' || event.key == 's') {
        movedown();
    }
}

function moveup() {
    velocity_y = -1;
}

function movedown() {
    velocity_y = 1;
}

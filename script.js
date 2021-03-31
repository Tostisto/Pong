document.addEventListener('keydown', keypush);
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let player = {
    width: 20,
    height: 100,
    x: 0,
    y: canvas.height / 2 - 30,
    speed: 10,
    score: 0,
    velocity_y: 0
}

let enemy = {
    x: canvas.width - player.width,
    y: canvas.height / 2 - 30,
    score: 0
}

let ballSize = 40;

let ball = {
    x: canvas.width / 2 - ballSize / 2,
    y: canvas.height / 2 - ballSize / 2,
    speed: 5,
    velocity_x: -1,
    velocity_y: -1
}

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

    drawScore();

    requestAnimationFrame(gameloop);
}

function drawRectangle(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawPlayer() {
    drawRectangle(player.x, player.y, player.width, player.height, "white");
}

function drawEnemy() {
    drawRectangle(enemy.x, enemy.y, player.width, player.height, "white");
    enemy.y = ball.y - ballSize / 2;
}

function drawBackground() {
    drawRectangle(0, 0, canvas.width, canvas.height, "black");
}

function drawCenterLine() {
    for (let i = 0; i < canvas.height; i += 70) {
        drawRectangle(canvas.width / 2 - 4, i, 8, 50, "white");
    }
}

function drawBall() {
    drawRectangle(ball.x, ball.y, ballSize, ballSize, "white");
}

function drawScore() {

    ctx.font = '100px Regular';
    ctx.fillText(player.score, canvas.width / 2 - 100, 90, 140);
    ctx.fillText(enemy.score, canvas.width / 2 + 50, 90, 140);
}

//ball move
function ballMove() {

    if (ball.x + ballSize >= enemy.x && ball.y <= enemy.y + player.height && ball.y + ballSize >= enemy.y) {
        ball.velocity_x = -1;
        audio.play();
    }

    if (ball.x <= player.x + player.width && ball.y <= player.y + player.height && ball.y + ballSize >= player.y) {
        ball.velocity_x = 1;
        audio.play();
    }

    if (ball.y <= 0) {
        ball.velocity_y = 1;
    }

    if (ball.y >= canvas.height - ballSize) {
        ball.velocity_y = -1;
    }

    ball.x += ball.speed * ball.velocity_x;
    ball.y += ball.speed * ball.velocity_y;

    if (ball.x <= 0) {
        enemy.score++;
        reset();
    }

    if (ball.x + ballSize >= canvas.width) {
        player.score++;
        reset();
    }
}

function reset() {
    player.x = 0;
    player.y = canvas.height / 2 - 30;

    enemy.x = canvas.width - player.width;
    enemy.y = canvas.height / 2 - 30;

    ball.x = canvas.width / 2 - ballSize / 2;
    ball.y = canvas.height / 2 - ballSize / 2;

    player.velocity_y = 0;

    ball.velocity_x = -1;
    ball.velocity_y = -1;
}

//player move
function move() {
    player.y += player.speed * player.velocity_y;

    if (player.y <= 0) {
        player.y = 0;
    }
    if (player.y >= canvas.height - player.height) {
        player.y = canvas.height - player.height;
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
    player.velocity_y = -1;
}

function movedown() {
    player.velocity_y = 1;
}

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

let ball = {
    size: 40,
    x: 0,
    y: 0,
    speed: 5,
    velocity_x: -1,
    velocity_y: -1
}

ball.x = canvas.width / 2 - ball.size / 2;
ball.y = canvas.height / 2 - ball.size / 2;


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
    enemy.y = ball.y - ball.size / 2;
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
    drawRectangle(ball.x, ball.y, ball.size, ball.size, "white");
}

function drawScore() {

    ctx.font = '100px Regular';
    ctx.fillText(player.score, canvas.width / 2 - 100, 90, 140);
    ctx.fillText(enemy.score, canvas.width / 2 + 50, 90, 140);
}

//ball move
function ballMove() {

    if (ball.x + ball.size >= enemy.x && ball.y <= enemy.y + player.height && ball.y + ball.size >= enemy.y) {
        ball.velocity_x = -1;
        audio.play();
    }

    if (ball.x <= player.x + player.width && ball.y <= player.y + player.height && ball.y + ball.size >= player.y) {
        ball.velocity_x = 1;
        audio.play();
    }

    if (ball.y <= 0) {
        ball.velocity_y = 1;
    }

    if (ball.y >= canvas.height - ball.size) {
        ball.velocity_y = -1;
    }

    ball.x += ball.speed * ball.velocity_x;
    ball.y += ball.speed * ball.velocity_y;

    if (ball.x <= 0) {
        enemy.score++;
        reset();
    }

    if (ball.x + ball.size >= canvas.width) {
        player.score++;
        reset();
    }
}

function reset() {
    player.x = 0;
    player.y = canvas.height / 2 - 30;

    enemy.x = canvas.width - player.width;
    enemy.y = canvas.height / 2 - 30;

    ball.x = canvas.width / 2 - ball.size / 2;
    ball.y = canvas.height / 2 - ball.size / 2;

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

canvas.addEventListener("touchstart", startTouch, false);
canvas.addEventListener("touchmove", moveTouch, false);

var init_y = null;

function startTouch(event) {
    init_y = event.touches[0].clientY;
};

function moveTouch(event) {

    if (init_y === null) {
        return 0;
    }

    var curr_y = event.touches[0].clientY;
    var control_y = init_y - curr_y;

    if (control_y < 0) {
        player.velocity_y = 1;
    }
    else {
        player.velocity_y = -1;
    }

    init_y = null;

    event.preventDefault();
};

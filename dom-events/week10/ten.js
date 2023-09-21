// ANCHOR - DOM Element selectors
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

let gameRunning = false; // Added game state variable

const brickRowCount = 9;
const brickColumnCount = 5;

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

const bricks = [];

for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo };
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    bricks.forEach(row => {
        row.forEach(brick => {
            if (brick.visible) {
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, brickInfo.w, brickInfo.h);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        });
    });
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
}

function increaseScore() {
    score++;
}

function update() {
    paddle.x += paddle.dx;

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
    ) {
        ball.dy = -ball.speed;
    }

    bricks.forEach(row => {
        row.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brickInfo.w &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brickInfo.h
                ) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });

    if (score === brickRowCount * brickColumnCount) {
        alert('Congratulations! You won!');
        resetGame(); // Reset game on win
        gameRunning = false; // Set game state to not running
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();

}

document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 37:
            paddle.dx = -paddle.speed;
            break;
        case 39:
            paddle.dx = paddle.speed;
            break;
    }
});

document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 37:
        case 39:
            paddle.dx = 0;
            break;
    }
});

// NEW - Start Button
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', startGame);

function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

function startGame() {
    console.log("Start button clicked!");
    if (!gameRunning) {
        console.log("Game not running, starting...");
        resetGame();
        console.log("Game reset");
        gameRunning = true;
        gameLoop();
        console.log("Game loop started");
    } else {
        console.log("Game already running, not starting a new game.");
        resetGame();
    }
}

function resetGame() {
    score = 0;
    // Reset any other game variables as needed
    bricks.forEach(row => {
        row.forEach(brick => {
            brick.visible = true; // Reset brick visibility
        });
    });
    console.log("Game reset complete");
    gameRunning = false; // Set game state to not running
}



gameLoop(); // Start the game loop initially

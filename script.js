const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');
let snake = [{ x: 10, y: 10 }];
let direction = 'right';
let food = { x: 15, y: 15 };

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

function update() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }

    if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20) {
        resetGame();
        return;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
            return;
        }
    }

    if (head.x === food.x && head.y === food.y) {
        snake.unshift({ x: food.x, y: food.y });
        spawnFood();
    }

    snake.unshift(head);
    snake.pop();
}

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / 20)),
        y: Math.floor(Math.random() * (canvas.height / 20))
    };
    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            spawnFood();
            return;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

function gameLoop() {
    update();
    draw();
}

function changeDirection(newDirection) {
    if (
        (newDirection === 'up' && direction !== 'down') ||
        (newDirection === 'down' && direction !== 'up') ||
        (newDirection === 'left' && direction !== 'right') ||
        (newDirection === 'right' && direction !== 'left')
    ) {
        direction = newDirection;
    }
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = 'right';
    spawnFood();
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            changeDirection('up');
            break;
        case 'ArrowDown':
            changeDirection('down');
            break;
        case 'ArrowRight':
            changeDirection('right');
            break;
        case 'ArrowLeft':
            changeDirection('left');
            break;
    }
}

document.addEventListener('keydown', handleKeyPress);

function animate() {
    gameLoop();
    setTimeout(() => requestAnimationFrame(animate), 100); // 100 миллисекунд задержки
}
animate();

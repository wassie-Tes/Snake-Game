// by using getContext draw 2d images on browser
var canvas = document.querySelector("canvas");
var cxt = canvas.getContext("2d");

// for making grid lines
var scale = 20;
var column = canvas.height / scale;
var row = canvas.width / scale;

// to draw the snake
var snake = [];
snake[0] = {
  x: Math.floor(Math.random() * row) * scale,
  y: Math.floor(Math.random() * column) * scale,
};

let food = {
  x: Math.floor(Math.random() * row) * scale,
  y: Math.floor(Math.random() * column) * scale,
};

// for movement of snake using motion images so draw the snake in some interval of time

let d = "right";
// keyboard keys for direction
document.onkeydown = direction;
function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "right") {
    d = "left";
  } else if (key == 38 && d != "down") {
    d = "up";
  } else if (key == 39 && d != "left") {
    d = "right";
  } else if (key == 40 && d != "up") {
    d = "down";
  }
}
var playgame = setInterval(draw, 100);

function draw() {
  cxt.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < snake.length; i++) {
    cxt.fillStyle = "chartreuse";
    cxt.strokeStyle = "white";
    cxt.fillRect(snake[i].x, snake[i].y, scale, scale);
  }
  // old position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (d == "left") {
    snakeX -= scale;
  }
  if (d == "right") {
    snakeX += scale;
  }
  if (d == "up") {
    snakeY -= scale;
  }
  if (d == "down") {
    snakeY += scale;
  }
  // to start at zero when the snake is out of the screen
  if (snakeX > canvas.width) {
    snakeX = 0;
  }
  if (snakeY > canvas.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width;
  }
  if (snakeY < 0) {
    snakeY = canvas.height;
  }
  // new position
  let newHead = {
    x: snakeX,
    y: snakeY,
  };
  // to grow the snake if the snake eat food
  if (snakeX == food.x && snakeY == food.y) {
    food = {
      x: Math.floor(Math.random() * row) * scale,
      y: Math.floor(Math.random() * column) * scale,
    };
  } else {
    snake.pop();
  }
  // if the snake eat it self crush the game
  function eatself(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
      if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
        return true;
      }
      return false;
    }
  }
  eatself(newHead, snake);
  // to add new value on array
  // snake.pop();
  snake.unshift(newHead);
  // console.log(snake);

  // the food part
  cxt.fillStyle = "red";
  cxt.strokeStyle = "white";
  cxt.fillRect(food.x, food.y, scale, scale);
}

// can i clon and push and pull repo with out git

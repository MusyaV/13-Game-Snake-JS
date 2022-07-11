let box = 30;
let score = 0;
const canvas = document.getElementById('ground');
const ctx = canvas.getContext('2d');
const btn = document.querySelector('button');
// фон
const groundImg = new Image;
groundImg.src = 'img/ground.png';
// фрукты
const array = [1, 2, 3, 4, 5, 6, 7]
const foodImg = new Image;
foodImg.src = 'img/4.png';
// объект с координатами х и у для появления еды
let food = {
    x: Math.floor((Math.random() * 31 + 1)) * box,
    y: Math.floor((Math.random() * 16 + 3)) * box
};
// змея
let snake = [];
snake[0] = {
    x: 16 * box,
    y: 9 * box
}
// функция рисующая игру 
function drawGame() {
    ctx.drawImage(groundImg, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);
    // рисуем змею
    for (let index = 0; index < snake.length; index++) {
        ctx.fillStyle = (index == 0) ? 'rgb(0, 156, 156)' : 'greenyellow';
        ctx.fillRect(snake[index].x, snake[index].y, box, box);
    }
    // текст скорость
    ctx.fillStyle = 'black';
    ctx.font = '50px Arial';
    ctx.fillText(score, 2 * box, 1.5 * box);
    // переменные с координатами головы
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    // столкновение с едой
    if (snakeX == food.x && snakeY == food.y) {
        score++
        food = {
            x: Math.floor((Math.random() * 31 + 1)) * box,
            y: Math.floor((Math.random() * 16 + 3)) * box
        };
    } else {
        // удаляем последний элемент в змейке
        snake.pop();
    }
    // прописываем границы поля для змейки
    if (snakeX < box || snakeX > box * 31
        || snakeY < box * 2 || snakeY > box * 18) {
        clearInterval(game);
    }
    // движение змейки
    if (dir == 'left') snakeX -= box;
    if (dir == 'right') snakeX += box;
    if (dir == 'up') snakeY -= box;
    if (dir == 'down') snakeY += box;
    let newHead = {
        x: snakeX,
        y: snakeY
    }
    // запускаем функцию eatTail, куда подставляем свои значения,newHead и массив snake 
    eatTail(newHead, snake);
    // Метод unshift() добавляет один или более элементов в начало массива и возвращает новую длину массива.
    snake.unshift(newHead);
}
// отображаем картинку через setInterval
let game = setInterval(drawGame, 200);
document.addEventListener('keydown', direction);
// переменная для направлений
let dir;
function direction(event) {
    if (event.keyCode == 37 && dir != 'right')
        dir = 'left';
    else if (event.keyCode == 38 && dir != 'down')
        dir = 'up';
    else if (event.keyCode == 39 && dir != 'left')
        dir = 'right';
    else if (event.keyCode == 40 && dir != 'up')
        dir = 'down';
}
// head - аргумент для головы, arr - аргумент для всего массива
function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}
btn.addEventListener('click', () => {
    window.location.reload();
})
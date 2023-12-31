//game constants ans variables

let inputDir = { x: 0, y: 0 }
const foodsound = new Audio("food.mp3")
const gameoversound = new Audio("gameover.mp3")
const movesound = new Audio("move.mp3")
const musicsound = new Audio("music.mp3")
let speed = 5
let score = 0;
let rotate=0;
let lastPaintTime = 0
let snakeArr = [
    { x: 5, y: 5 }
]
food = { x: 10, y: 15 }

//game functions
function main(ctime) {
    window.requestAnimationFrame(main)
    // console.log(ctime)
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine()
}

function isCollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 36 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    //part 1 : updating the snake array
    if (isCollide(snakeArr)) {
        gameoversound.play();
        musicsound.pause();
        inputDir = { x: 0, y: 0 }
        speed = 5;
        alert("Game Over! Press any key to play again")
        snakeArr = [{ x: 5, y: 5 }]
        // musicsound.play()
        score = 0;
    }

    //if you have eaten the food then Increment the score and regenerate the food coordinates
    let congrats = document.querySelector(".cog")
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play();
        score += 1
        speed = speed + 0.25
        if (hiscoreval < score) {
            congrats.style.fontSize = "100%"
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "High score: " + hiscoreval;

        }
        scorebox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 19;
        let c = 30

        food = { x: Math.round(a + (c - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }  //**************doubt
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //part 2 : display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snakebody')
        }
        board.appendChild(snakeElement)
        document.querySelector('.head').style.transform=`rotate(${rotate}deg)`
    })
    //part 3 : display the food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}





//Main logic starts here
let hiscore = localStorage.getItem("hiscore");
let head = document.querySelector('.head');
let hiscoreval
let hiscoreBox = document.querySelector("#hiscoreBox")
let scorebox = document.querySelector("#scorebox")
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore: " + hiscore
}
window.requestAnimationFrame(main)
window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 } //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            rotate=-90
            // head.style.transform = `rotate(90deg)`;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            // head.style.transform=rotate("180")
            inputDir.x = 0;
            inputDir.y = 1;
            rotate=90;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            // head.style.transform=rotate("270")
            inputDir.x = -1;
            inputDir.y = 0;
            rotate=180;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            // head.style.transform=rotate("90")
            inputDir.x = 1;
            inputDir.y = 0;
            rotate=0;
            break;
        default:
            break;
    }
})

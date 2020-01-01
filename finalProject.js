window.addEventListener('load', function()
{
const GAME_WIDTH = 640;
const GAME_HEIGHT = 360;
var gameIsLive = true;

var enemies = [
    {
    xPos: 100,
    yPos: 100,
    width: 40,
    height: 40,
    speedY: 1
    },
    {
    xPos: 260,
    yPos: 100,
    width: 40,
    height: 40,
    speedY: 2,
    },
    {
    xPos: 380,
    yPos: 100,
    width: 40,
    height: 40,
    speedY: 3
    },
    {
    xPos: 450,
    yPos: 100,
    width: 40,
    height: 40,
    speedY: 7
    }
];

var player = {
    xPos: 10,
    yPos: 160,
    speedX: 2,
    width: 40,
    height: 40,
    isMoving: false
};

var goal = {
    xPos: 580,
    yPos: 160,
    width: 50,
    height: 36
};

var sprites = {};

var movePlayer = function()
    {
    player.isMoving = true;
    };

var stopPlayer = function()
    {
    player.isMoving = false;
    };

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", movePlayer);
canvas.addEventListener("mouseup", stopPlayer);
canvas.addEventListener("touchstart", movePlayer);
canvas.addEventListener("touchend", stopPlayer);

var load = function() {
    sprites.player = new Image();
    sprites.player.src = "images/hero.png";
    sprites.background = new Image();
    sprites.background.src = "images/background.png";
    sprites.enemy = new Image();
    sprites.enemy.src = "images/enemy.png";
    sprites.goal = new Image();
    sprites.goal.src = "images/chest.png";
};


var step = function()
    {
    update();
    draw();

    if(gameIsLive)
        {
        window.requestAnimationFrame(step);
        }
    };

var update = function()
    {
    if (checkForCollision(player, goal))
        {
        gameIsLive = false;
        alert("You Won!");
        window.location = "";
        }
        
    if(player.isMoving)
        {
        player.xPos += player.speedX;
        }

    enemies.forEach(function(element) 
        {
        if (checkForCollision(player, element))
            {
            gameIsLive = false;
            alert("Game Over!");
            window.location = "";
            }
        element.yPos += element.speedY;
        if(element.yPos <= 10)
            {
            element.yPos = 10;
            element.speedY *= -1;
            }
        else if(element.yPos >= GAME_HEIGHT - 50)
            {
            element.yPos = GAME_HEIGHT - 50;
            element.speedY *= -1;
            }
        }
    )};

var draw = function() 
    {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    ctx.drawImage(sprites.background, 0, 0);
    ctx.drawImage(sprites.player, player.xPos, player.yPos);
    enemies.forEach(function(element, index) 
        {
        ctx.drawImage(sprites.enemy, element.xPos, element.yPos);
        })
    ctx.drawImage(sprites.goal, goal.xPos, goal.yPos);
    };

var checkForCollision = function(rect1, rect2) 
        {
        let closeOnWidth = Math.abs(rect1.xPos - rect2.xPos) <= Math.max(rect1.width, rect2.width);
        let closeOnHeight = Math.abs(rect1.yPos - rect2.yPos) <= Math.max(rect1.height, rect2.height);
        return closeOnHeight && closeOnWidth;
        }
        
load();
step();
});

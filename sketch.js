
var fish, fishIMG
var obstacle, obstacleIMG
var bg, bgIMG
var gameOver, gameOverIMG;
var restart, restartIMG;
var PLAY = 1, END = 0
var gameState = PLAY;

function preload(){
 fishIMG = loadImage("fish.png")
 bgIMG = loadImage("bg.png")
 obstacleIMG = loadImage("obstacle.png");
gameOverIMG = loadImage("gameOver.png")
restartIMG = loadImage("restart.png")
}

function setup() {
  createCanvas(800,400);
  bg = createSprite(400,200,800,400);
  bg.addImage(bgIMG)
  bg.scale=3
  bg.velocityX = -8
  
  gameOver = createSprite(400,200)
  gameOver.addImage(gameOverIMG);
  gameOver.visible = false;

  restart = createSprite(400,270);
  restart.addImage(restartIMG);
  restart.visible = false;
  restart.scale = 0.1
  obstaclesGroup = new Group();
  fish = createSprite(100,280,20,20);
  fish.addImage(fishIMG);
  fish.scale = 0.25
  
  //createSprite(400, 200, 50, 50);
}

function draw() {
  background(0);
  if(gameState===PLAY){
    if(bg.x<200){
      bg.x = 500
    }
  
    if (keyDown("space")){
      fish.velocityY = -10
      
    }
  
    fish.velocityY = fish.velocityY+0.8
  
    edges = createEdgeSprites();
    fish.collide(edges[3])

    spawnObstacles();
    if(obstaclesGroup.isTouching(fish)){
     gameState = END
    }
  }
  else if(gameState===END){
    bg.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    fish.velocityY = 0;
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)){
    reset();

    }
  }
  
  
  drawSprites();

 
  
}
function reset(){
  gameState = PLAY;
obstaclesGroup.destroyEach();
gameOver.visible = false;
restart.visible = false;
bg.velocityX = -8
}
function spawnObstacles(){
  if (frameCount%120===0){
    obstacles = createSprite(800,350,20,20);
    obstacles.addImage(obstacleIMG);
    obstacles.scale = 0.35
    obstacles.velocityX = -5
    obstaclesGroup.add(obstacles)
  }
}
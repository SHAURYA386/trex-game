var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud;
var cloudimg;
var o1, o2, o3, o4, o5, o6;
var obstacleGroup;
var cloudGroup;
var PLAY=1
var END=0
var gameState=PLAY
var score = 0


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");

 
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5; 
  trex.debug=false
  trex.setCollider("circle", 0,0, 50)
  trex.addImage("collided", trex_collided);
  //create a ground sprite
  ground = createSprite(200,windowHeight-120,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -10;


  if(keyIsDown(DOWN_ARROW)){

    
  }
  
  //creating invisible ground
  invisibleGround = createSprite(200,windowHeight-113,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstacleGroup = new Group()
  cloudGroup = new Group()

}

function draw() {
  //set background color
  background(180);
   textSize(23);
   console.log(score);
  text("score" + score , 50, 20); 

 
  
  
  //console.log(frameCount)
  
  if(gameState==PLAY){
 
    
    score = score + Math.round(frameCount / 100) 
 

    // jump when the space key is pressed
  if( touches.length>0||keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
    touches=[]
  }
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    //Spawn Clouds
    spawnClouds()
    spwanObstacle()
    if(obstacleGroup.isTouching(trex)){
    
      gameState=END

  
  
    }

    if(keyIsDown(DOWN_ARROW)){
     trex.velocityx = trex.velocityx +5;
    }
  }
  else if(gameState==END){

    trex.changeImage("collided", trex_collided);

  obstacleGroup.setLifetimeEach(-1)
  cloudGroup.setLifetimeEach(-1)
    
    

    ground.velocityX = 0
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);

  } 
    
    trex.velocityY = trex.velocityY + 0.8
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  

  drawSprites();
}

//function to spawn the clouds
function spawnClouds(){
 // write your code here 
 if(frameCount%160==0){
 cloud = createSprite(windowWidth, 50, 50 ,50)
 cloud.velocityX = -2
 cloud.addImage("Clouds",cloudimg)
 cloud.scale = 0.5
 cloud.y = random(13, 200)
 console.log(cloud.depth)
 cloud.depth = trex.depth
 trex.depth = trex.depth +1
 cloud.lifetime=windowWidth/8
 cloudGroup.add(cloud);
}}

function spwanObstacle() {
 if(frameCount%70==0) {
obstacle = createSprite(windowWidth,windowHeight-120, 8, 15);
obstacle.velocityX = -8
var rand = Math.round(random(1,6))
obstacle.scale = 0.5
obstacle.lifetime=windowWidth/8
obstacleGroup.add(obstacle);


switch(rand){
  case 1:
    obstacle.addImage(o1);
    break;

    case 2:
    obstacle.addImage(o2);
    break;

    case 3:
    obstacle.addImage(o3);
    break;

    case 4:
    obstacle.addImage(o4);
    break;

    case 5:
    obstacle.addImage(o5);
    break;

    case 6:
    obstacle.addImage(o6);
    break;
}
}}



/*if(trex.collide(o1 & o2 & o3 & o4 & o5 & o6)){
}*/




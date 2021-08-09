var spaceship,background1,gameoverimg,background1;
var enemy1img,enemy2img,enemy3img,spaceshipimg, backgroundImage,missileimg;
var score
var gameState="play"


function preload(){

  
 // backgroundImage = loadImage("b2.jpg");
  gameoverimg= loadImage("gameover.png")
  missileimg = loadImage("missile.png");
  spaceshipimg = loadImage("spaceship.png");
  enemy1img = loadImage("enemy1.png");
  
  enemy2img = loadImage("enemy2.png");
  enemy3img = loadImage("enemy3.png");
  
}



function setup() {
  createCanvas(650, 600);
  
  //creating background
  background1 = createSprite(0,-100,0,0);
  //background1.addImage(backgroundImage);
  background1.scale = 2
  
  // creating astronot to shoot beam
  spaceship = createSprite(1250,500,20,50);
  spaceship.addImage(spaceshipimg); 
  spaceship.scale = 0.3;
  
  enemyGroup = new Group();
  
  
  missileGroup = new Group();
  
  score=0
 
  
}

function draw() {
background("blue")

  textSize(40)
 
  text("SCORE:"+score,230,40)
  

  spaceship.x = World.mouseX
  if(gameState==="play"){
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createMissile();
    
  }
  enemys();
   
   if(missileGroup.isTouching(enemyGroup)){
    enemyGroup.destroyEach();
    missileGroup.destroyEach();
    score=score+1
  }else if(enemyGroup.isTouching(spaceship)){
    gameState="end"
  }}
 if(gameState==="end"){
  //alienGroup.destroyEach();
  background1.addImage(gameoverimg)
  background1.scale=0.5
  background1.x=325
  background1.y=300
  enemyGroup.setLifetimeEach(-1)
  enemyGroup.setVelocityXEach(0)

  
 }
 
  
  drawSprites();

}


function enemys(){
  
  if(World.frameCount%80===0){ 
   enemy=createSprite(400,100,20,20);
   enemy.scale=0.8;
   r=Math.round(random(1,3)); 
   if(r ==1 ) {
   enemy.addImage(enemy1img);
   } else if (r == 2){
   enemy.addImage(enemy2img)
   } else if (r == 3){
   enemy.addImage(enemy3img)
   } 
    enemy.x=Math.round(random(0,600));
    enemy.velocityY=7;
    enemy.setlifetime=100;
    enemy.debug=false
    enemy.setCollider("circle",-4,0,40)
    enemyGroup.add(enemy);
 }
 }
   

 function createMissile() {
  var missile= createSprite(1250, 220, 60, 10);
  missile.addImage(missileimg);
  missile.x =spaceship.x;
  missile.y=spaceship.y-63;
  missile.velocityY = -20;
  missile.lifetime = 400;
  missile.scale = 0.2;
  missileGroup.add(missile);
 
  return missile;
 }
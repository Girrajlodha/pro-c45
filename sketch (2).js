var alien1,alien2,alien3,astronot,background1,gameoverimg;
var alien1img,alien2img,alien3img,astronotimg, backgroundImage,beamimg;
var score
var gameState="play"


function preload(){

  
  backgroundImage = loadImage("bg2.jpg");
  gameoverimg= loadImage("gameover.png")
  beamimg = loadImage("beam.png");
  astronotimg = loadImage("astronot.png");
  alien1img = loadImage("alien1.png");
  
  alien2img = loadImage("monster1.png");
  alien3img = loadImage("monster2.png");
  
}



function setup() {
  createCanvas(1350, 600);
  
  //creating background
  background1 = createSprite(0,-100,0,0);
  //background1.addImage(backgroundImage);
  background1.scale = 2
  
  // creating astronot to shoot beam
  astronot = createSprite(1250,220,20,50);
  astronot.addImage(astronotimg); 
  astronot.scale = 1;
  
  alienGroup = new Group();
  
  
  beamGroup = new Group();
  
  score=0
 
  
}

function draw() {
background(backgroundImage)

  textSize(40)
 
  text("SCORE:"+score,1000,40)
  

  astronot.y = World.mouseY
  if(gameState==="play"){
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createBeam();
    
  }
  aliens();
   
   if(beamGroup.isTouching(alienGroup)){
    alienGroup.destroyEach();
    beamGroup.destroyEach();
    score=score+1
  }else if(alienGroup.isTouching(astronot)){
    gameState="end"
  }}
 if(gameState==="end"){
  //alienGroup.destroyEach();
  background1.addImage(gameoverimg)
  background1.x=600
  background1.y=300
  alienGroup.setLifetimeEach(-1)
  alienGroup.setVelocityXEach(0)

  
 }
 
  
  drawSprites();

}


function aliens(){
  if(World.frameCount%80===0){ 
   alien=createSprite(100,600,20,20);
   alien.scale=1;
   r=Math.round(random(1,3)); 
   if(r ==1 ) {
   alien.addImage(alien1img);
   } else if (r == 2){
   alien.addImage(alien2img)
   } else if (r == 3){
   alien.addImage(alien3img)
   } 
    alien.y=Math.round(random(50,600));
    alien.velocityX=7;
    alien.setlifetime=390;
    alien.debug=false
    alien.setCollider("circle",-10,0,80)
    alienGroup.add(alien);
 }
 }

 function createBeam() {
  var beam= createSprite(1250, 220, 60, 10);
  beam.addImage(beamimg);
  beam.x =astronot.x-80;
  beam.y=astronot.y-63;
  beam.velocityX = -20;
  beam.lifetime = 400;
  beam.scale = 0.3;
  beamGroup.add(beam);
 
  return beam;
  
}

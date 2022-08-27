var trex, trex_running;
var ground, invisibleGround, groundImage;
var numeroAleatorio, numeroAleatorio2 ;
var nuvemImage
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6
var grupoCacto
var grupoNuvem
var PLAY = 1
var END = 0
var estadodejogo = PLAY

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  nuvemImage = loadImage("cloud.png");
  groundImage = loadImage("ground2.png");
  cacto1 = loadImage('obstacle1.png');
  cacto2 = loadImage('obstacle2.png');
  cacto3 = loadImage('obstacle3.png');
  cacto4 = loadImage('obstacle4.png');
  cacto5 = loadImage('obstacle5.png');
  cacto6 = loadImage('obstacle6.png');
  jumpSoung=loadSound('jump.mp3');
  dieSoung=loadSound('die.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  numeroAleatorio =Math.round( random(1,100));
ssss
  //criar um sprite trex
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.setCollider('circle',0,0,40);
  trex.debug = true;
  //criar um sprite ground (chão)

  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 

  //criar um sprite de chão invisível (chão)
  invisibleGround = createSprite(width/2,heigth-10,width,125);
  invisibleGround.visible = false;

  grupoCacto = new Group()
  grupoNuvem = new Group()
}


function draw() {
  background("white");

  if(estadodejogo == PLAY){
    ground.velocityX = -5;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if  ((touches.length > 0 || keyDown("space")  ) && trex.y >= height-120) {
      trex.velocityY = -13;
      jumpSoung.play();
      touches=[];
    }
    trex.velocityY = trex.velocityY + 0.8
    criarNuvens();
    criarCactos();
    if(grupoCacto.isTouching(trex)){
      estadodejogo = END
      dieSoung.play();
    }
  }else if(estadodejogo == END){
    ground.velocityX = 0;
    grupoCacto.setVelocityXEach(0);
    grupoNuvem.setVelocityXEach(0);
    trex.changeAnimation("collided" , trex_collided);

    grupoCacto.setLifetimeEach(-1);
    grupoNuvem.setLifetimeEach(-1);
  }

  //pular quando a barra de espaço for pressionada
  // collide
  // posição
  // && trex.y > 166
  // duas condições no mesmo if - && - e / || - ou

 

  
  //reseta o solo
 

  trex.collide(invisibleGround);
 
  if(mousePressedOver(restart)){
   console.log("reiniciar o jogo")
   reset();
  }
  drawSprites();
}

function reset(){
 estadodejogo=PLAY
 END.visible=false
 restart.visible= false
}

function criarNuvens(){
  if(frameCount%60 == 0){
    var nuvem = createSprite(600,100,40,10);
    nuvem.addImage("nuvem" , nuvemImage);
    nuvem.scale = 0.1;
    nuvem.velocityX = -3;
    nuvem.y = Math.round(  random(30,80));
    nuvem.depth = trex.depth;
    trex.depth = trex.depth + 1 ;
    nuvem.lifetime = 200 ;
    grupoNuvem.add(nuvem)
  }
}

function criarCactos(){
 if(frameCount%60 == 0){
  var cacto = createSprite(600,160,50,50);
  cacto.velocityX = -5
  numeroAleatorio2 = Math.round(random(1,6))
  switch(numeroAleatorio2){
   case 1 : cacto.addImage(cacto1)
   break
   case 2 : cacto.addImage(cacto2)
   break
   case 3 : cacto.addImage(cacto3)
   break
   case 4 : cacto.addImage(cacto4)
   break
   case 5 : cacto.addImage(cacto5)
   break
   case 6 : cacto.addImage(cacto6)
   break
   default:break
  
  }
  cacto.scale = 0.55
  cacto.lifetime = 120

  grupoCacto.add(cacto)






















}
}
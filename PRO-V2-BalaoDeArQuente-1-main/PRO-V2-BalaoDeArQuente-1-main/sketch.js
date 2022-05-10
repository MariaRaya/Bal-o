var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var gameState = 1;
var button;
var obsTop, obsTop1, obsTop2, obsBottom, obsBottom1, obsBottom2, obsBottom3;
var restart, fimdeJogo, fimdeJogoImg, restartImg;
var bottomGroup, topGroup;

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");
obsTop1 = loadImage("assets/obsTop1.png");
obsTop2 = loadImage("assets/obsTop2.png");
obsBottom1 = loadImage("assets/obsBottom1.png");
obsBottom2 = loadImage("assets/obsBottom2.png");
obsBottom3 = loadImage("assets/obsBottom3.png");
restartImg = loadImage("assets/restart.png");
fimdeJogoImg = loadImage("assets/fimdejogo.png");
}

function setup(){

  createCanvas(400,400);

//imagem de plano de fundo
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//criando canto superior e inferior
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//criando o balão     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.15;

//fim de jogo  
fimdeJogo = createSprite(200,200,20,50);
fimdeJogo.addImage(fimdeJogoImg);
fimdeJogo.scale = 0.5;
fimdeJogo.visible = false;

//fim de jogo  
restart = createSprite(200,240,20,50);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;

topGroup = new Group();
bottomGroup = new Group();

}

function draw() {
  
  background("black");
        
    if (gameState == 0){
      text("Pressione o botão para iniciar", 70, height/2);
      /*button = createImg("assets/button.png");
      button.position(200,200);
      button.size(50,50);
      button.mouseClicked(iniciar);*/

    }

    if (gameState == 1){
      //fazendo o balão de ar quente pular
      if(keyDown("space")) {
        balloon.velocityY = -6 ;
        
      }

      //adicionando gravidade
        balloon.velocityY = balloon.velocityY + 0.5;

        gerarObsTop();
        gerarObsBottom();

        if(topGroup.isTouching(balloon) || bottomGroup.isTouching(balloon) || 
        balloon.isTouching(bottomGround) ||  balloon.isTouching(topGround)){
          gameState = 2;
        }
    }
          
    if (gameState == 2){
      fimdeJogo.visible = true;
      fimdeJogo.depth = fimdeJogo.depth + 1;

      restart.visible = true;
      restart.depth = fimdeJogo.depth + 1;

      topGroup.setVelocityXEach(0);
      bottomGroup.setVelocityXEach(0);

      topGroup.setLifetimeEach(-1);
      bottomGroup.setLifetimeEach(-1);

      balloon.y = 200;

      if(mousePressedOver(restart)){
        reset();
      }

    }
   
        drawSprites();
        
}

function iniciar(){
  gameState = 1;
}

function gerarObsTop(){
  if(World.frameCount % 90 == 0){
    obsTop = createSprite(450,50,40,40);
    obsTop.scale = 0.07;
    obsTop.velocityX = -4;
    obsTop.y = Math.round(random(40,180));

    var valor =  Math.round(random(1,2));

    switch(valor){
      case 1: obsTop.addImage(obsTop1);
      break
      case 2: obsTop.addImage(obsTop2);
      break
      default: break
    }
    obsTop.lifeTime = 100;
    balloon.depth = balloon.depth + 1;
    topGroup.add(obsTop);
  }
}

function gerarObsBottom(){
  if(World.frameCount % 80 == 0){
    obsBottom = createSprite(450,320,40,40);
    obsBottom.scale = 0.06;
    obsBottom.velocityX = -4;

    var valor =  Math.round(random(1,3));

    switch(valor){
      case 1: obsBottom.addImage(obsBottom1);
      break
      case 2: obsBottom.addImage(obsBottom2);
      break
      case 3: obsBottom.addImage(obsBottom3);
      break
      default: break
    }
    obsBottom.lifeTime = 100;
    balloon.depth = balloon.depth + 1;
    bottomGroup.add(obsBottom);
  }
}

function reset(){
  gameState = 1;
  fimdeJogo.visible = false;
  restart.visible = false;
  topGroup.destroyEach();
  bottomGroup.destroyEach();
}





var laserRed,laserRedImg;
var laserBlue,laserBlueImg;
var villano, villanoImg;
var mano, manoImg, chasquido;
var mano2;
var chims, chimsImg;
var gameState = "WAIT";
var cityloop;
var misibola,misilImg;

var laserRedGroup;
var misibolaGroup;


function preload(){
 villanoImg = loadImage("el villano.png");
 manoImg = loadImage("mano.png");
 chimsImg = loadImage("chims.png");
 chasquido = loadAnimation("prechasquido.png","chasquido.png");
 cityloop = loadImage("cityloop.png");
 misilImg = loadImage("misibola.png");
 laserRedImg = loadImage("laser.png");
 laserBlueImg = loadImage("laserB.png");
 cancion = loadSound("song.mp3");
 wait = loadSound("wait.mp3") 
 wuawua = loadSound("wua wua.mp3") 
}

function setup() {
 createCanvas(windowWidth,windowHeight);
  laserRedGroup=new Group();
 misibolaGroup=new Group();
 chims = createSprite(width/8,height/2,40,40);
 chims.addImage(chimsImg);
 chims.scale = 3.5;

 villano=createSprite(width-150,height - (height/3+(height/3)),40,40);
   villano.scale=3;
   villano.addImage(villanoImg);
  
   mano=createSprite(width-320,height - (height/3+(height/4)),40,40);
   mano.scale=3;
   mano.addImage(manoImg);

   mano2=createSprite(width-50,height - (height/3+(height/4)),40,40);
   mano2.scale=3;
   mano2.addImage(manoImg);

   
}

function draw() {
 background(cityloop);
 

 textSize(40);
 fill("black");
 stroke("white");

 

 if (gameState==="WAIT"){
  if(frameCount===1){
    wait.play();
  }
  
  text("Esquiva las bolas",width/2-width/4,height/2-height/7);
  text("Cuando pase el laser, quedate quieto",width/2-width/4,height/2);
  text("Presiona espacio para Pelear",width/2-width/4,height/2+height/7);

    if(keyDown("space")){
      gameState="PLAY";
      cancion.loop();
    }
     
 }

 

 if(gameState==="PLAY"){

  wait.stop();
   

    attack();

    if(chims.velocityX===0&&chims.velocityY===0){
       quieto=1
    }

    if(villano.y  < (height/2)){
      villano.velocityY = villano.velocityY + 2;
    }
    

    if(villano.y  > (height/2)){
      villano.velocityY=villano.velocityY - 2;
     }
    
     if(mano.y  > (height/2)){
      mano.velocityY = mano.velocityY - 2;
    }

    if(mano.y  < (height/2)){
      mano.velocityY = mano.velocityY + 2;
    }

    if(mano2.y  > (height/2)){
      mano2.velocityY=mano2.velocityY - 2;
     }


    if(mano2.y  < (height/2)){
      mano2.velocityY=mano2.velocityY + 2;
     }

     if(keyDown("w")){
      chims.y=chims.y-12;
      quieto=0
    }

    if(keyDown("s")){
      chims.y=chims.y+12;
      quieto=0
    }

    if(keyDown("a")){
      chims.x=chims.x-12;
      quieto=0
    }

    if(keyDown("d")){
      chims.x=chims.x+12;
      quieto=0
    }

      if (chims.isTouching(misibolaGroup)) {
        gameState = "END";
        cancion.stop();
        wuawua.play();
      }

      if (chims.isTouching(laserRedGroup) && quieto === 0) {
        gameState = "END";
        cancion.stop();
        wuawua.play();
      }

    }

    if(gameState === "END"){
      misibolaGroup.destroyEach();
      laserRedGroup.destroyEach();
      villano.velocityY=0
      mano.velocityY=0
      mano2.velocityY=0
     
     text("Juego terminado",width/2-width/4,height/2-height/7);
     text("presiona espacio para reiniciar",width/2-width/4,height/2);

     if(keyDown("space")){
      gameState="PLAY"
      cancion.loop();
      wuawua.stop();
      villano.y=height - (height/3+height/3);
      villano.x= width-150;
      mano.x=width-320;
      mano.y=height - (height/3+(height/4));
      mano2.x=width-50;
      mano2.y=height - (height/3+(height/4));
     }

     
    }

 drawSprites();
}
  


function attack (){

   if(frameCount % 30===0){
    misibola = createSprite(villano.x,random(100,600));
    misibola.addImage(misilImg);
    misibola.scale = 2;
    misibola.velocityX = Math.round(random(-17, -30));
    misibola.lifetime = 100
    misibolaGroup.add(misibola);
   }

   if(frameCount % 300===0){   
       
       laserRed =createSprite(width,height/2);
       laserRed.addImage(laserRedImg);       
       laserRed.scale = 2.2;
       laserRed.velocityX=-32;
       laserRed.lifetime = 100
       laserRedGroup.add(laserRed);
       }


}

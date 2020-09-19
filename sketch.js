var helicopterIMG, helicopterSprite, packageSprite,packageIMG,backgroundImg,background_1;
var officer,officer_1,officer_2;
var check;

var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
	backgroundImg=loadImage("army2.jpg");
	officer_1=loadImage("officer1.png")
	officer_2=loadImage("officer2.png");
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	
	background_1=createSprite(400,350);
	background_1.addImage(backgroundImg);
	
	officer=createSprite(900,550);
	officer.addImage(officer_1)
	officer.visible=false;
	console.log(officer.x);

	packageSprite=createSprite(400, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2
	packageSprite.visible=false;
	console.log(packageSprite.y);

	helicopterSprite=createSprite(-50, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	helicopterSprite.velocityX=6;
	
	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(400 , 200 , 5 , {restitution:0.65, isStatic:true});
	World.add(world, packageBody);
	
	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

   var package_opt={
	   isStatic:false
   }
	Engine.run(engine);
  check=0;
}


function draw() {
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 

  if((helicopterSprite.x===400)){
	  helicopterSprite.velocityX=0;
	  if(check===0){
	packageSprite.visible=true;
	  }
  }
  if(packageSprite.isTouching(groundSprite)){
	  officer.visible=true;
	  officer.velocityX=-5;
  }
  if(officer.x===370){
	  officer.velocityX=0
	  officer.addImage(officer_2);
	  officer.changeImage(officer_2);
  }
 
  //console.log(check);
  drawSprites();
 
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
	Matter.Body.setStatic( packageBody , false);
    check=1;
  }
}




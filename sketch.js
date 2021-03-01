const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var ground, shelf1, shelf2;

var box1, box2, box3, box4, box5, box6, box7;
var box8, box9, box10, box11, box12;
var box13, box14, box15;
var box16;

var box17, box18, box19, box20, box21;
var box22, box23, box24;
var box25;

var polygonImage, polygon;
var backgroundImg;

var score = 0;

var gameState = "attached";

function preload(){
    polygonImage = loadImage("polygon.png");
    dayImage = loadImage("day.png");
    nightImage = loadImage("night.png");
    getBg();
}

function setup(){

    createCanvas(1000,400);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground (500,390,1000,20);
    shelf1 = new Ground (400,300,250,10);
    shelf2 = new Ground (675,150,200,10);

    //left shelf: bottom column left to right (blue)
    box1 = new Box(325,280,30,40);
    box2 = new Box(350,280,30,40);
    box3 = new Box(375,280,30,40);
    box4 = new Box(400,280,30,40);
    box5 = new Box(425,280,30,40);
    box6 = new Box(450,280,30,40);
    box7 = new Box(475,280,30,40);

    //left shelf: middle column left to right (pink)
    box8 = new Box(350,250,30,40);
    box9 = new Box(375,250,30,40);
    box10 = new Box(400,250,30,40);
    box11 = new Box(425,250,30,40);
    box12 = new Box(450,250,30,40);
    
    //left shelf: top column left to right (green)
    box13 = new Box(375,220,30,40);
    box14 = new Box(400,220,30,40);
    box15 = new Box(425,220,30,40);
    
    //left shelf: peak (blue)
    box16 = new Box(400,190,30,40);

    //right shelf: bottom column left to right (blue)
    box17 = new Box(625,125,30,40);
    box18 = new Box(650,125,30,40);
    box19 = new Box(675,125,30,40);
    box20 = new Box(700,125,30,40);
    box21 = new Box(725,125,30,40);

    //right shelf: middle column left to right (green)
    box22 = new Box(650,105,30,40);
    box23 = new Box(675,105,30,40);
    box24 = new Box(700,105,30,40);
    
    //right shelf: top column left to right (pink)
    box25 = new Box(675,85,30,40);

    var options = {
        density:2,
        friction:1
    }

    polygon = Bodies.circle(100,200,15,options);
    World.add(world,polygon);

    slingshot = new SlingShot(polygon,{x:100,y:200});

}

function draw(){

    if(backgroundImg)
    background(backgroundImg);
    
    ground.display();
    shelf1.display();
    shelf2.display();

    fill("lightblue")
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();
    box7.display();

    fill("lightpink")
    box8.display();
    box9.display();
    box10.display();
    box11.display();
    box12.display();

    fill("lightgreen")
    box13.display();
    box14.display();
    box15.display();

    fill("lightblue")
    box16.display();
    box17.display();
    box18.display();
    box19.display();
    box20.display();
    box21.display();

    fill("lightgreen")
    box22.display();
    box23.display();
    box24.display();

    fill("lightpink")
    box25.display();

    //very important push and pop
    push ();
    imageMode (CENTER);
    image(polygonImage,polygon.position.x,polygon.position.y,40,40);
    pop ();

    slingshot.display();

    box1.score();
    box2.score();
    box3.score();
    box4.score();
    box5.score();
    box6.score();
    box7.score();
    box8.score();
    box9.score();
    box10.score();
    box11.score();
    box12.score();
    box13.score();
    box14.score();
    box15.score();
    box16.score();
    box17.score();
    box18.score();
    box19.score();
    box20.score();
    box21.score();
    box22.score();
    box23.score();
    box24.score();
    box25.score();

    Engine.update(engine);

    if(backgroundImg === dayImage) {
        fill ("black");
    } else {
        fill("white");
    }

    textFont("Georgia");
    textSize(40);
    text("Tower Siege",5,40);
    textSize(12.5);
    text("Drag and release the yellow hexagon with the mouse to destroy the towers. Good luck!",5,65);
    text("Press the space bar to reset the location of the yellow hexagon and have another shot.",5,80);

    textFont("Arial");
    textSize(20);
    text("Score: "+score,width-130,50);

}

function mouseDragged(){
    if(gameState === "attached")
        Matter.Body.setPosition(polygon, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshot.fly();
    gameState = "destroy";
}

function keyPressed(){
	
	if (keyCode === 32){
		Matter.Body.setPosition(polygon,{x:100,y:200});
        slingshot.attach(polygon);
        gameState = "attached";
    }

}

async function getBg() {
    
    var response = await fetch("https://worldtimeapi.org/api/timezone/America/Los_Angeles");
    var responseJSON = await response.json();
    
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);

    if (hour >= 7 && hour <= 17) {
        bg = dayImage
    }
    
    else {
        bg = nightImage
    }
    
    backgroundImg = bg;

}
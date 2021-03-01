class Box {

    constructor(x,y,width,height){

        var options = {
            restitution: 0.5,
            friction:1,
            density:1
        }

        this.body = Bodies.rectangle(x,y,width,height,options);
        World.add(world,this.body);

        this.width = width;
        this.height = height;
        this.visibility = 255;

    }

    display(){

        var pos = this.body.position;
        var angle = this.body.angle;

        if(this.body.speed < 5){

            push ();
    
            translate(pos.x,pos.y);
            rotate (angle);
            
            rectMode(CENTER);
            rect(0,0,this.width,this.height);
    
            pop ();

        } else {

            push ();

            this.visibility = this.visibility-5;
            World.remove(world,this.body);

            tint(255,this.visibility);

            pop();

        }

    }

    score (){

        if(this.visibility < 0 && this.visibility > -300){
            score++
        }

    }
}
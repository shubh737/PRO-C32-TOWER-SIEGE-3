class SlingShot {

    constructor(bodyA,pointB){

        var options = {
            bodyA : bodyA,
            pointB : pointB,
            length : 10,
            stiffness : 0.05
        }

        this.pointB = pointB;
        this.sling = Constraint.create(options);
        World.add(world,this.sling);

    }

    fly(){
        this.sling.bodyA = null;
    }

    attach(newBodyA){
        this.sling.bodyA = newBodyA;
    }

    display(){

        if(this.sling.bodyA){
            push ();
            strokeWeight(5);
            stroke("green")
            var posA = this.sling.bodyA.position;
            var posB = this.pointB;
            line (posA.x,posA.y,posB.x,posB.y);
            pop ();
        }

    }

}
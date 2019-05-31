class Player extends PhysicsObject{

    static I : Player = null;
    //private maxBallPosY : number = 0;
    private ballPosX : number;
    private ballPosY : number;
    //private start : boolean = false;

    //private nowJump : boolean = false;
    //private touchLeftWall : boolean = true;
    static chipNumber : number = 1;
    //private velocity : number[] = [0,0];
    private velocityLimit : number = 10;
    private acceleration : number[] = [0,0];
    private speed : number = 2.5;

    private targetPoint : number[] = [0,0];




    constructor(x:number, y:number,width:number,height:number) {
        super(x,y,width,height);
        Player.I = this;
        this.ballPosX = Game.width* 0.5;
        this.ballPosY = Game.height* 0.50;
        //this.maxBallPosY = this.ballPosY;
        this.setBody(x,y,width,height);
        this.setShape(0,0,width,height,ColorPallet.WHITE);

        this.acceleration[0] = Math.cos(Util.toRadian(270))*this.speed;
        this.acceleration[1] = Math.sin(Util.toRadian(270))*this.speed;

        PhysicsObject.world.on("beginContact", this.collision, this);

        

    }

    private setShape(x:number, y:number,width:number, height:number,color:number){
        const shape : egret.Shape = Util.setRect(x,y,width,height,color,20,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }

    private setBody(x: number, y:number,width : number, height : number){

        this.body = new p2.Body({
            mass : 1, 
            angle : 270,
            position:[x,y],
        });
        this.bodyShape = new p2.Box({
            width : width,
            height: height, 
            fixedRotation:true,
            collisionGroup: GraphicShape.BOX, 
            collisionMask:GraphicShape.TARGET,
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }



    addDestroyPhysicsMethod(){
        PhysicsObject.world.off("beginContact", this.collision);        
    }

    collision(evt){
        const bodyA: p2.Body = evt.bodyA;
        const shapeA  = evt.shapeA;
        const bodyB: p2.Body = evt.bodyB;
        const shapeB  = evt.shapeB;
        
        if(shapeA.collisionGroup == GraphicShape.TARGET || shapeB.collisionGroup == GraphicShape.TARGET){
            TargetPoint.target.forEach(t =>{
                if(t.body == bodyA){
                    console.log(t.number);
                    this.targetPoint = [TargetPoint.target[t.number + 1].compornent.x, TargetPoint.target[t.number + 1].compornent.y];
                    return;
                }
                else if(t.body == bodyB){
                    console.log(t.number);
                    this.targetPoint = [TargetPoint.target[t.number + 1].compornent.x, TargetPoint.target[t.number + 1].compornent.y];
                    return;
                }
            });
        }

/*        if(shapeA.collisionGroup == GraphicShape.COIN || shapeB.collisionGroup == GraphicShape.COIN){
            CreateGameScene.coin.forEach(c =>{
                if(c.body == bodyA){
                    c.destroy();
                    Score.addScore();                  
                    return;
                }
                else if(c.body == bodyB){
                    c.destroy();
                    Score.addScore();
                    return;
                }
            });
        }*/
               
 
    }

    move(){
        this.acceleration[0] = Math.cos(Util.toRadian(this.body.angle))*this.speed;
        this.acceleration[1] = Math.sin(Util.toRadian(this.body.angle))*this.speed;
        if(this.body.velocity[0] > this.velocityLimit){
            this.body.velocity[0] = this.velocityLimit;
        }
        else{
            this.body.velocity[0] += this.acceleration[0];
        }
        if(this.body.velocity[1] > this.velocityLimit){
            this.body.velocity[1] = this.velocityLimit;
        }
        else{
            this.body.velocity[1] += this.acceleration[1];
        }

        this.body.position[0] += this.body.velocity[0];
        this.body.position[1] += this.body.velocity[1];

        this.body.velocity[0] *= 0.8;
        this.body.velocity[1] *= 0.8;
        

    }

    turn(){
        if(UILayer.onRight){
            this.body.angle += 3;
        }
        else if(UILayer.onLeft) {
            this.body.angle -= 3;
        }  

        if(this.body.angle < 0){//0~360°へ正規化
            this.body.angle %= 360;
            this.body.angle += 360;
        }
        else if(this.body.angle > 360){
            this.body.angle %= 360;            
        }
        
    }

     fixedUpdate(){
        this.move();
        this.turn();
        this.updateDrowShape();
        this.updateBodyAngle();

/*        this.maxBallPosX = this.compornent.x;
        this.maxBallPosY = this.compornent.y;*/
        Camera2D.x = this.ballPosX - this.compornent.x;
        Camera2D.y = this.ballPosY - this.compornent.y;
        Camera2D.transform( GameStage.display );
        //this.checkGameOver();
    }

    checkGameOver(){
/*        if(this.maxBallPosY - this.compornent.y < -Game.height*0.44 && GameOver.gameOverFlag == false){
            new GameOver(0,0,0,0);
        }*/
    }


    getPosX():number{
        return this.body.position[0];
    }
    setPosX(x:number){
        this.body.position[0] = x;
    }
    getPosY():number{
        return this.body.position[1];
    }
    setPosY(y:number){
        this.body.position[1] = y;
    }
    getBodyAngle():number{
        return this.body.angle;
    }
    setBodyAngle(rad:number){
        this.body.angle = rad;
    }
    getVelocity():number[]{
        return this.body.velocity;
    }
    setVelocity(vector:number[]){
        this.body.velocity = vector;
    }

}



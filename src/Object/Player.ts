enum Direction{
    FORWARD = 0,
    RIGHT = 1,
    LEFT = -1,
}

class Player extends PhysicsObject{

    static I : Player = null;
    static gameStart : boolean = false;
    //private maxBallPosY : number = 0;
    private ballPosX : number;
    private ballPosY : number;

    //private nowJump : boolean = false;
    //private touchLeftWall : boolean = true;
    //static chipNumber : number = 1;
    //private velocity : number[] = [0,0];
    private velocityLimit : number = 10;
    private acceleration : number[] = [0,0];
    private speed : number = 6;

    private targetPoint : number[] = [0,0];
    public toMoveAngle : number = 270;
    private touchNubmer : number = 0;
    private alreadyClick : boolean = false;
    private direction : Direction = 0;




    constructor(x:number, y:number,width:number,height:number) {
        super(x,y,width,height);
        Player.I = this;
        this.ballPosX = x;//この位置がボールが常に表示される画面上の位置
        this.ballPosY = y;
        //this.maxBallPosY = this.ballPosY;
        // this.setBody(x,y,width/2);
        this.setBody(x,y,5);
        this.setShape(0,0,width/2,ColorPallet.WHITE);

        // this.acceleration[0] = Math.cos(Util.toRadian(270))*this.speed;
        // this.acceleration[1] = Math.sin(Util.toRadian(270))*this.speed;


        GameStage.moveOffset(this.ballPosX,this.ballPosY);

        this.body.position[0] = Start.start[0].compornent.x + Game.mapChipWidth/2;
        this.body.position[1] = Start.start[0].compornent.y + Game.mapChipHeight/2;

/*        if(!Turn.turn[0]){

        }
        else if(Turn.turn[0].turnRight){
            this.toMoveAngle += 90;
        }
        else if(!Turn.turn[0].turnRight){
            this.toMoveAngle -= 90;
        }       */ 

        PhysicsObject.world.on("beginContact", this.collision, this);

        

    }

    private setShape(x:number, y:number,width:number,color:number){
        const shape : egret.Shape = Util.setCircle(x,y,width,color,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }

    private setBody(x: number, y:number,radius : number){

        this.body = new p2.Body({
            mass : 1, 
            angle : 270,
            position:[x,y],
        });
        this.bodyShape = new p2.Circle({
            radius : radius,
            //height: height, 
            fixedRotation:true,
            collisionGroup: GraphicShape.PLAYER, 
            collisionMask: GraphicShape.START | GraphicShape.GAMEOVER,
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
        const shapeB = evt.shapeB;



        if(shapeA.collisionGroup == GraphicShape.GAMEOVER || shapeB.collisionGroup == GraphicShape.GAMEOVER){
            console.log("gameover");
            new GameOver(0,0,0,0);
            
        }

        if(shapeA.collisionGroup == GraphicShape.START || shapeB.collisionGroup == GraphicShape.START){
            const random :number = Util.randomInt(1,CourseType.I);
            Map.I.createMap(random);
            
        }
        
         
    }

    setToMoveAngle(){


        //if(this.alreadyClick){return;}

        if(Turn.turn.length <= this.touchNubmer){
            console.log("turnがありません");
            return;
        }
        //if(this.touchNubmer == 0){return;}

        if(Turn.turn[this.touchNubmer].jump == true){

        }
        else if(Turn.turn[this.touchNubmer].turnRight){
            this.toMoveAngle += 90;

            switch(this.direction){
                case Direction.FORWARD:
                    this.direction = Direction.RIGHT;
                    Camera2D.angle = -45;
                break;
                case Direction.LEFT:
                    this.direction = Direction.FORWARD;
                    Camera2D.angle = 0;
                break;
            }

            this.cameraRotate(GameStage.display,Camera2D.angle);
            
        }
        else if(!Turn.turn[this.touchNubmer].turnRight){
            this.toMoveAngle -= 90;

            switch(this.direction){
                case Direction.FORWARD:
                    this.direction = Direction.LEFT;
                    Camera2D.angle = 45;
                break;
                case Direction.RIGHT:
                    this.direction = Direction.FORWARD;
                    Camera2D.angle = 0;
                break;
            }
            this.cameraRotate(GameStage.display,Camera2D.angle);
        }
/*        if(Turn.turn[this.touchNubmer].bodyShape.collisionGroup == GraphicShape.TURN_RIGHT){
            this.toMoveAngle += 90;           
        }
        else if(Turn.turn[this.touchNubmer].bodyShape.collisionGroup == GraphicShape.TURN_LEFT){
            this.toMoveAngle -= 90;
        }*/

        if(this.body.angle < 0){//0~360°へ正規化
            this.body.angle %= 360;
            this.body.angle += 360;
        }
        else if(this.body.angle > 360){
            this.body.angle %= 360;            
        }

        this.body.angle = this.toMoveAngle;
        this.touchNubmer++;

        this.alreadyClick = true;

    }
/*    cameraOffset(){
        GameStage.display.anchorOffsetX = (this.compornent.x)*Camera2D.scale;
        GameStage.display.anchorOffsetY = (this.compornent.y)*Camera2D.scale;

    }*/
    cameraRotate(display : egret.DisplayObjectContainer, toAngle : number){

        egret.Tween.get(display) 
            .to({rotation:toAngle}, 150, egret.Ease.quadIn)
            .call(()=> {
                egret.Tween.removeTweens(display);
            });
    }

    move(){
        this.body.position[0] += Math.cos(Util.toRadian(this.body.angle))*this.speed;
        this.body.position[1] += Math.sin(Util.toRadian(this.body.angle))*this.speed;

        
        //今回は使ってない
        function accelerationMove(){
            // this.acceleration[0] = Math.cos(Util.toRadian(this.body.angle))*this.speed;
            // this.acceleration[1] = Math.sin(Util.toRadian(this.body.angle))*this.speed;
            // if(this.body.velocity[0] > this.velocityLimit){
            //     this.body.velocity[0] = this.velocityLimit;
            // }
            // else{
            //     this.body.velocity[0] += this.acceleration[0];
            // }
            // if(this.body.velocity[1] > this.velocityLimit){
            //     this.body.velocity[1] = this.velocityLimit;
            // }
            // else{
            //     this.body.velocity[1] += this.acceleration[1];
            // }

            // this.body.position[0] += this.body.velocity[0];
            // this.body.position[1] += this.body.velocity[1];

            // this.body.velocity[0] *= 0.8;
            // this.body.velocity[1] *= 0.8;

        }

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
        if(GameOver.gameOverFlag){return;}
        if(Player.gameStart == false){
            this.updateDrowShape();
            this.updateBodyAngle();
            Camera2D.x =  Game.width/2/Camera2D.scale;
            Camera2D.y =  Game.height/2/Camera2D.scale;
            GameStage.moveOffset(this.compornent.x,this.compornent.y);
            //this.cameraOffset();
            Camera2D.transform( GameStage.display );
            return;
        }

        this.move();
        //this.turn();
        this.updateDrowShape();
        this.updateBodyAngle();

        Camera2D.x =  Game.width/2 /Camera2D.scale;
        Camera2D.y =  Game.height/2/Camera2D.scale;
        GameStage.moveOffset(this.compornent.x,this.compornent.y);
        //this.cameraOffset();
        Camera2D.transform( GameStage.display );
        //this.checkGameOver();
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



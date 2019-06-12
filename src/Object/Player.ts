enum Direction{
    FORWARD = 0,
    RIGHT = 1,
    LEFT = -1,
}



class Player extends PhysicsObject{

    static I : Player = null;
    static gameStart : boolean = false;
    private ballPosX : number;
    private ballPosY : number;

    private velocityLimit : number = 10;
    private acceleration : number[] = [0,0];
    private speed : number = 5.5;
    private plusSpeed :number = 0;

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
        this.setBody(x,y,5);
        this.setShape(0,0,width/2,ColorPallet.RED);

        GameStage.moveOffset(this.ballPosX,this.ballPosY);

        this.body.position[0] = Start.start[0].compornent.x + Game.mapChipWidth/2;
        this.body.position[1] = Start.start[0].compornent.y + Game.mapChipHeight/2;

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
            fixedRotation:true,
            fixedX:true,
            fixedY:true,
            collisionGroup: GraphicShape.PLAYER, 
            collisionMask: GraphicShape.START | GraphicShape.GAMEOVER,
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }



    addDestroyPhysicsMethod(){
        PhysicsObject.world.off("beginContact", this.collision);
        this.speed = 7;
    }

    collision(evt){
        const bodyA: p2.Body = evt.bodyA;
        const shapeA  = evt.shapeA;
        const bodyB: p2.Body = evt.bodyB;
        const shapeB = evt.shapeB;

        if(shapeA.collisionGroup == GraphicShape.GAMEOVER || shapeB.collisionGroup == GraphicShape.GAMEOVER){
            GameOver.gameOverFlag = true;
            this.smallPlayer(this.compornent,0);
            
        }

        if(shapeA.collisionGroup == GraphicShape.START || shapeB.collisionGroup == GraphicShape.START){
            const random :number = Util.randomInt(1,CourseType.I);
            Map.I.createMap(random);

            if(this.plusSpeed < 3){
                this.plusSpeed += 0.05;
            }
            else if(this.plusSpeed >= 3){
                this.plusSpeed = 3;

            }

            const randomType :number = Util.randomInt(Type.NORMAL,Type.SPEED_ROTATE_ZOOM);
            Camera2D.type = randomType;
            this.changeCameraType();

            Score.addScore();

        }
        
         
    }

    changeCameraType(){
        switch(Camera2D.type){
            case Type.NORMAL:
                zoomDefault();
                speedDefault();
            break;
            case Type.ROTATE:
                zoomDefault();
                speedDefault();
            break;
            case Type.ZOOM:
                if(Camera2D.scale == CameraScale.ZOOM_IN){
                    zoomDefault();
                }
                else if(Camera2D.scale == CameraScale.NORMAL){
                    zoomIn();
                }
                speedDefault();
            break;
            case Type.ROTATE_ZOOM:
                if(Camera2D.scale == CameraScale.ZOOM_IN){
                    zoomDefault();
                }
                else if(Camera2D.scale == CameraScale.NORMAL){
                    zoomIn();
                }
                speedDefault();
            break;

            case Type.SPEED:
                zoomOut();
                highSpeed();
            break;
            case Type.SPEED_NORMAL:
                zoomOut();
                highSpeed();
            break;
            case Type.SPEED_ROTATE:
                zoomOut();
                highSpeed();
            break;
            case Type.SPEED_ZOOM:
                if(Camera2D.scale == CameraScale.ZOOM_OUT){
                    zoomDefault();
                }
                else if(Camera2D.scale == CameraScale.NORMAL){
                    zoomOut();
                }
                highSpeed();
            break;
            case Type.SPEED_ROTATE_ZOOM:
                if(Camera2D.scale == CameraScale.ZOOM_OUT){
                    zoomDefault();
                }
                else if(Camera2D.scale == CameraScale.NORMAL){
                    zoomOut();
                }
                highSpeed();
            break;
        }

        function zoomDefault(){
            Player.I.cameraZoom(GameStage.display,CameraScale.NORMAL);
        }
        function zoomIn(){
            Player.I.cameraZoom(GameStage.display,CameraScale.ZOOM_IN);
        }
        function zoomOut(){
            Player.I.cameraZoom(GameStage.display,CameraScale.ZOOM_OUT);
        }

        function speedDefault(){
            Player.I.speed = 6.5 + Player.I.plusSpeed;
        }
        function highSpeed(){
            Player.I.speed = 6.5 + Player.I.plusSpeed;
        }
        function lowSpeed(){
            Player.I.speed = 5 + Player.I.plusSpeed;
        }
        
    }

    setToMoveAngle(){


        if(Turn.turn.length <= this.touchNubmer){
            console.log("turnがありません");
            return;
        }

        if(Turn.turn[this.touchNubmer].turnRight){
            this.toMoveAngle += 90;                
        }
        else if(!Turn.turn[this.touchNubmer].turnRight){
            this.toMoveAngle -= 90;
        }

        if(Camera2D.type == Type.ROTATE || Camera2D.type == Type.ROTATE_ZOOM 
        || Camera2D.type == Type.SPEED_ROTATE || Camera2D.type == Type.SPEED_ROTATE_ZOOM){
            if(Turn.turn[Player.I.touchNubmer].turnRight){
                switch(Player.I.direction){
                    case Direction.FORWARD:
                        Player.I.direction = Direction.RIGHT;
                        Camera2D.angle = -45;
                    break;
                    case Direction.LEFT:
                        Player.I.direction = Direction.FORWARD;
                        Camera2D.angle = 0;
                    break;
                }
                
            }
            else if(!Turn.turn[Player.I.touchNubmer].turnRight){
                switch(Player.I.direction){
                    case Direction.FORWARD:
                        Player.I.direction = Direction.LEFT;
                        Camera2D.angle = 45;
                    break;
                    case Direction.RIGHT:
                        Player.I.direction = Direction.FORWARD;
                        Camera2D.angle = 0;
                    break;
                }
            }
            Player.I.cameraRotate(GameStage.display,Camera2D.angle);
        }

        this.changeCameraType();

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

    cameraRotate(display : egret.DisplayObjectContainer, toAngle : number){

        egret.Tween.get(display) 
            .to({rotation:toAngle}, 150, egret.Ease.quadIn)
            .call(()=> {
                Camera2D.angle = toAngle;
        });
    }

    cameraZoom(display : egret.DisplayObjectContainer, scale : number){

        egret.Tween.get(display) 
            .to({scaleX:scale, scaleY:scale}, 150, egret.Ease.quadIn)
            .call(()=> {
                Camera2D.scale = scale;
        });
    }

    smallPlayer(display : egret.DisplayObjectContainer, scale : number){

        egret.Tween.get(display) 
            .to({scaleX:scale, scaleY:scale}, 300, egret.Ease.quadIn)
            .call(()=> {
                new GameOver(0,0,0,0);
                new RetryButton((Game.width - Game.width*0.4)/2, Game.height*0.65, Game.width * 0.4, Game.width*0.18, 80, 0.5, "リトライ");
        });
    }


    move(){
        this.body.position[0] += Math.cos(Util.toRadian(this.body.angle))*this.speed;
        this.body.position[1] += Math.sin(Util.toRadian(this.body.angle))*this.speed;

        
        //今回は使ってない
        function accelerationMove(){
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
            Camera2D.transform( GameStage.display );
            return;
        }

        this.move();
        this.updateDrowShape();
        this.updateBodyAngle();

        Camera2D.x =  Game.width/2 /Camera2D.scale;
        Camera2D.y =  Game.height/2/Camera2D.scale;
        GameStage.moveOffset(this.compornent.x,this.compornent.y);
        Camera2D.transform( GameStage.display );
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



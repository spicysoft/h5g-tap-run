enum ChipType{
    NONE        = 0,
    LOAD        = 1,
    RUN         = 2,
    TURN        = 3,
    TURN_RIGHT  = 4,
    TURN_LEFT   = 5,
    JUMP        = 6,
}
enum MapType{
    STRAIGHT_UP = 0,
    STRAIGHT_RIGHT = 1,
    RIGHT_CURVE = 2,
    RIGHT_CURVE_REVERSE = 3,

}
enum CourseType{
    ZERO,
    ONE,
}

class Map extends GameObject{

    static createLineX : number = 0;
    static createLineY : number = 0;

    constructor(){
        super();
        this.createMap();
    }

    createMap(){

        const courseType : number = 1;

        switch(courseType){
            case CourseType.ZERO:
            break;
            case CourseType.ONE:
                this.setMap(MapType.STRAIGHT_UP,            false,  true,   false,  true);
                this.setMap(MapType.RIGHT_CURVE,            true,   true,   false,  true);
                this.setMap(MapType.RIGHT_CURVE,            false,  false,  false,  false);
                this.setMap(MapType.STRAIGHT_UP,            false,  false,  false,  true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,    true,   false,  false,  true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,    false,  true,   false,  false);
                this.setMap(MapType.RIGHT_CURVE,            true,   true,   false,  true);
                this.setMap(MapType.STRAIGHT_RIGHT,         false,  false,  false,  false);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,    false,  true,   false,  false);
                this.setMap(MapType.STRAIGHT_UP,            false,  true,   false,  true);
            break;
        }
    }

    //nowVertical = ture で現在垂直方向へ進行中、false で水平方向へ進行中。
    setMap(mapNumber : number, reverseX : boolean, toUp:boolean, toRight:boolean, nowVertical:boolean){

        const map = this.map(mapNumber);
        let posX :number = 0;
        let posY :number = 0;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                let orderX :number = this.checkReverseOrderX(x,y,map,toRight);
                let orderY :number = this.checkReverseOrderY(y,map,toUp);

                if(!reverseX){posX = Game.mapChipWidth * orderX + Map.createLineX;}
                else{posX = Game.mapChipWidth * (map[orderY].length-1 - orderX) + Map.createLineX;}
                posY = Game.mapChipHeight * orderY + Map.createLineY


                if ( map[orderY][orderX] === ChipType.LOAD ){
                    new Road(posX, posY, Game.mapChipWidth, Game.mapChipHeight);
                }
                else if ( map[orderY][orderX] === ChipType.NONE ){
                    //new None(posX, posY,Game.mapChipWidth, Game.mapChipHeight);
                }
                else if ( map[orderY][orderX] === ChipType.RUN ){
                    new Run(posX, posY,Game.mapChipWidth, Game.mapChipHeight);
                }
                else if ( map[orderY][orderX] === ChipType.TURN ){
                    if(nowVertical){
                        if(toUp && toRight){
                            new Turn(posX, posY,Game.mapChipWidth, Game.mapChipHeight, GraphicShape.TURN_RIGHT);
                        }
                        else if(toUp && !toRight){
                            new Turn(posX, posY,Game.mapChipWidth, Game.mapChipHeight, GraphicShape.TURN_LEFT);
                        }
                        else if(!toUp && toRight){
                            new Turn(posX, posY,Game.mapChipWidth, Game.mapChipHeight, GraphicShape.TURN_LEFT);
                        }
                        else if(!toUp && !toRight){
                            new Turn(posX, posY,Game.mapChipWidth, Game.mapChipHeight, GraphicShape.TURN_RIGHT);
                        }

                    }
                    else{
                        if(toUp && toRight){
                            new Turn(posX, posY,Game.mapChipWidth, Game.mapChipHeight, GraphicShape.TURN_LEFT);
                        }
                        else if(toUp && !toRight){
                            new Turn(posX, posY,Game.mapChipWidth, Game.mapChipHeight, GraphicShape.TURN_RIGHT);
                        }
                        else if(!toUp && toRight){
                            new Turn(posX, posY,Game.mapChipWidth, Game.mapChipHeight, GraphicShape.TURN_RIGHT);
                        }
                        else if(!toUp && !toRight){
                            new Turn(posX, posY,Game.mapChipWidth, Game.mapChipHeight, GraphicShape.TURN_LEFT);
                        }

                    }
                }
            }
        }

        this.setCreateLine(mapNumber,reverseX,toUp,toRight);

/*        function checkReverseOrderY(y:number, map:number[][], toUp:boolean):number{
            let orderY :number = y;
            if(toUp){
                orderY = (map.length -1) - y;
            }
            return orderY;
        }
        function checkReverseOrderX(x:number, y:number, map:number[][], toRight:boolean):number{
            let orderX :number = x;
            if(!toRight){
                orderX = (map[y].length -1) - x;
            }
            return orderX;
        }*/

    }

    //ターゲットポイントを進行方向順に生成する用
    checkReverseOrderX(x:number, y:number, map:number[][], toRight:boolean):number{
        let orderX :number = x;
        if(!toRight){
            orderX = (map[y].length -1) - x;
        }
        return orderX;
    }

    checkReverseOrderY(y:number, map:number[][], toUp:boolean):number{
        let orderY :number = y;
        if(toUp){
            orderY = (map.length -1) - y;
        }
        return orderY;
    }


    map(mapNumber : number){
        let map : number[][] = [];

        switch(mapNumber){
            case MapType.STRAIGHT_UP:
                map =[
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    ]
            break;
            case MapType.STRAIGHT_RIGHT:
                map =[
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [1,1,1,1,1,1,1,1,1],
                    [2,2,2,2,2,2,2,2,2],
                    [1,1,1,1,1,1,1,1,1],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    ]
            break;
            case MapType.RIGHT_CURVE:
                map =[
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,1,1,1,1,1,1],
                    [0,0,0,1,3,2,2,2,2],
                    [0,0,0,1,2,1,1,1,1],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    ]
            break;
            case MapType.RIGHT_CURVE_REVERSE:
                map =[
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,0,0,0],
                    [0,0,0,1,2,1,1,1,1],
                    [0,0,0,1,3,2,2,2,2],
                    [0,0,0,1,1,1,1,1,1],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    ]

            break;

        }
        return map;
    }

    setCreateLine(mapNumber : number, reverseX : boolean, toUp:boolean, toRight:boolean){
        switch(mapNumber){
            case MapType.STRAIGHT_UP:
                if(toUp){Map.createLineY -= Game.height;}
                else{Map.createLineY += Game.height;}
            break;
            case MapType.STRAIGHT_RIGHT:
                if(toRight){Map.createLineX += Game.width;}
                else{Map.createLineX -= Game.width;}
            break;
            case MapType.RIGHT_CURVE:
                if(!reverseX){                   
                    if      (toUp   && toRight) {Map.createLineX += Game.width;}
                    else if (!toUp  && !toRight){Map.createLineY += Game.height;}
                    else                        {console.log("toUpかtoRightが間違っています");}
                }
                else{
                    if      (toUp   && !toRight){Map.createLineX -= Game.width;}
                    else if (!toUp  && toRight) {Map.createLineY += Game.height;}
                    else                        {console.log("toUpかtoRightが間違っています");}
                }
            break;
            case MapType.RIGHT_CURVE_REVERSE:
                if(!reverseX){
                    if      (toUp   && !toRight){Map.createLineY -= Game.height;}
                    else if (!toUp  && toRight) {Map.createLineX += Game.width;}
                    else                        {console.log("toUpかtoRightが間違っています");}
                }
                else{
                    if      (toUp && toRight)   {Map.createLineY -= Game.height;}
                    else if (!toUp && !toRight) {Map.createLineX -= Game.width;}
                    else                        {console.log("toUpかtoRightが間違っています");}
                }
            break;

        }

    }

    updateContent(){}
}

class Chip extends GameCompornent{


    constructor(x : number, y:number, width:number, height:number) {
        super(x, y, width,height);
        //this.setBody(x,y,width,height);
        //this.setShape(0, 0, width,height,ColorPallet.BLUE);
        
    }


/*    private setBody(x : number, y : number, width : number, height : number){

        this.body = new p2.Body({mass : 1, 
            position:[x,y], 
            type:p2.Body.STATIC
        });
        this.bodyShape = new p2.Box({
            width : width, height: height, 
            fixedRotation:true, 
            collisionGroup: GraphicShape.WALL, 
            collisionMask:GraphicShape.CIECLE
        });
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }*/

    setShape(x: number, y:number, width:number, height:number,color:number){

        const shape : egret.Shape = Util.setRect(x,y,width,height,color,0,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
        //this.compornent.anchorOffsetX += width/2;
        //this.compornent.anchorOffsetY += height/2;
        

    }

    updateContent(){
/*        if(this.compornent.y > Player.I.compornent.y + Game.height*2){
            this.destroy();
        }*/
    }

}

class None extends Chip{
    constructor(x : number, y:number, width:number, height:number) {
        super(x, y, width,height);
        //this.setBody(x,y,width,height);
        //this.setShape(0, 0, width,height,ColorPallet.GREEN);
    }

}

class Road extends Chip{
    constructor(x : number, y:number, width:number, height:number) {
        super(x, y, width,height);
        //this.setBody(x,y,width,height);
        this.setShape(0, 0, width,height,ColorPallet.BLUE);
    }

}


class Run extends Chip{

    constructor(x : number, y:number, width:number, height:number) {
        super(x, y, width,height);
        //this.setBody(x,y,width,height);
        this.setShape(0, 0, width,height,ColorPallet.RED);
    }



}

class Turn extends PhysicsObject{

    static chipNumber : number = 0;
    public number : number = 0;
    static turn:Turn[]=[];
    

    constructor(x : number, y:number, width:number, height:number, collisionGroup:GraphicShape) {
        super(x, y, width,height);
        this.setBody(x,y,width,height, collisionGroup);
        this.setShape(0, 0, width,height,ColorPallet.WHITE);

        Turn.turn.push(this);
        this.number = Turn.chipNumber;
        Turn.chipNumber += 1;
        
    }

    private setBody(x : number, y : number, width : number, height : number, collisionGroup:GraphicShape){

        this.body = new p2.Body({mass : 1, 
            position:[x,y], 
            type:p2.Body.STATIC
        });
        this.bodyShape = new p2.Box({
            width : width, height: height, 
            fixedRotation:true, 
            sensor:true,
            collisionGroup: collisionGroup, 
            collisionMask:GraphicShape.PLAYER
        });
        this.body.position[0] += width/2;
        this.body.position[1] += height/2;
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }

    setShape(x: number, y:number, width:number, height:number,color:number){

        const shape : egret.Shape = Util.setRect(x,y,width,height,color,0,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
        //this.compornent.anchorOffsetX += width/2;
        //this.compornent.anchorOffsetY += height/2;
        

    }

    fixedUpdate(){}

}
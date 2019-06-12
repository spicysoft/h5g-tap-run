enum ChipType{
    NONE        = 0,
    LOAD        = 1,
    RUN         = 2,
    TURN        = 3,
    TURN_RIGHT  = 4,
    TURN_LEFT   = 5,
    JUMP        = 6,
    JUMP_END    = 7,
    START       = 8,
    GAMEOVER    = 9,
}
enum MapType{
    STRAIGHT_UP = 0,
    STRAIGHT_RIGHT = 1,
    RIGHT_CURVE = 2,
    RIGHT_CURVE_REVERSE = 3,
    RIGHT_CURVE_ZIGZAG = 4,
    RIGHT_CURVE_ZIGZAG2 = 5,
    START = 6,

}
enum CourseType{
    NONE,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
}

class Map extends GameObject{

    static I :Map = null;
    static createLineX : number = 0;
    static createLineY : number = 0;

    constructor(){
        super();
        Map.I = this;
        const random :number = Util.randomInt(1,CourseType.I);
        this.createMap(random);
    }

    createMap(courseType){

        //コースはSMapType.STARTで始めること
        switch(courseType){
            case CourseType.NONE:
            break;
            case CourseType.A:
                this.setMap(MapType.START,        false);
                this.setMap(MapType.RIGHT_CURVE,        true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.RIGHT_CURVE,        false);
                this.setMap(MapType.STRAIGHT_RIGHT,     false);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,true);
                this.setMap(MapType.STRAIGHT_UP,        false);
            break;
            case CourseType.B:
                this.setMap(MapType.START,        false);
                this.setMap(MapType.RIGHT_CURVE,        false);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,true);
                this.setMap(MapType.RIGHT_CURVE,        true);
                this.setMap(MapType.STRAIGHT_RIGHT,     true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.STRAIGHT_UP,        false);
            break;
            case CourseType.C:
                this.setMap(MapType.START,        false);
                this.setMap(MapType.RIGHT_CURVE,        false);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,true);
                this.setMap(MapType.RIGHT_CURVE,        false);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,true);
                this.setMap(MapType.STRAIGHT_UP,        false);
            break;
            case CourseType.D:
                this.setMap(MapType.START,        false);
                this.setMap(MapType.RIGHT_CURVE,        true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.RIGHT_CURVE,        true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.STRAIGHT_UP,        false);
            break;
            case CourseType.E:
                this.setMap(MapType.START,        false);
                this.setMap(MapType.RIGHT_CURVE,        false);
                this.setMap(MapType.STRAIGHT_RIGHT,     false);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,true);
                this.setMap(MapType.RIGHT_CURVE,        true);
                this.setMap(MapType.STRAIGHT_RIGHT,     true);
                this.setMap(MapType.STRAIGHT_RIGHT,     true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.STRAIGHT_UP,        false);
            break;
            case CourseType.F:
                this.setMap(MapType.START,        false);
                this.setMap(MapType.RIGHT_CURVE,        true);
                this.setMap(MapType.STRAIGHT_RIGHT,     true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.RIGHT_CURVE_ZIGZAG,false);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,true);
                this.setMap(MapType.STRAIGHT_UP,        false);
            break;
            case CourseType.G:
                this.setMap(MapType.START,        false);
                this.setMap(MapType.RIGHT_CURVE,        true);
                this.setMap(MapType.STRAIGHT_RIGHT,     true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.RIGHT_CURVE_ZIGZAG,true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.STRAIGHT_UP,        false);
            break;
            case CourseType.H:
                this.setMap(MapType.START,        false);
                this.setMap(MapType.RIGHT_CURVE,        true);
                this.setMap(MapType.STRAIGHT_RIGHT,     true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.RIGHT_CURVE_ZIGZAG2,true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.STRAIGHT_UP,        false);
            break;
            case CourseType.I:
                this.setMap(MapType.START,        false);
                this.setMap(MapType.RIGHT_CURVE,        true);
                this.setMap(MapType.STRAIGHT_RIGHT,     true);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,false);
                this.setMap(MapType.RIGHT_CURVE_ZIGZAG2,false);
                this.setMap(MapType.RIGHT_CURVE_REVERSE,true);
                this.setMap(MapType.STRAIGHT_UP,        false);
            break;


        }
    }

    //nowVertical = ture で現在垂直方向へ進行中、false で水平方向へ進行中。
    setMap(mapNumber : number, reverseX : boolean){

        const map = this.map(mapNumber);
        let posX :number = 0;
        let posY :number = 0;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                let orderX :number = this.checkReverseOrderX(x,y,map,reverseX);
                let orderY :number = this.reverseOrderY(y,map);

                if(!reverseX){posX = Game.mapChipWidth * orderX + Map.createLineX;}
                else{posX = Game.mapChipWidth * (map[orderY].length-1 - orderX) + Map.createLineX;}
                posY = Game.mapChipHeight * orderY + Map.createLineY


                if ( map[orderY][orderX] === ChipType.NONE ){
                    //new None(posX, posY,Game.mapChipWidth, Game.mapChipHeight);
                }
                else if ( map[orderY][orderX] === ChipType.RUN ){
                    new Run(posX, posY,Game.mapChipWidth, Game.mapChipHeight);
                }
                else if ( map[orderY][orderX] === ChipType.TURN_RIGHT ){
                    new Turn(posX, posY,Game.mapChipWidth, Game.mapChipHeight, GraphicShape.TURN_RIGHT, mapNumber, reverseX, true, false);
                }
                else if ( map[orderY][orderX] === ChipType.TURN_LEFT ){
                    new Turn(posX, posY,Game.mapChipWidth, Game.mapChipHeight, GraphicShape.TURN_LEFT, mapNumber, reverseX, false, false);
                }
                else if ( map[orderY][orderX] === ChipType.START ){
                    new Start(posX, posY,Game.mapChipWidth, Game.mapChipHeight);
                }
                else if ( map[orderY][orderX] === ChipType.GAMEOVER ){
                    new GameOverChip(posX, posY,Game.mapChipWidth, Game.mapChipHeight);
                }
                
            }
        }

        this.setCreateLine(mapNumber,reverseX);

    }

    //ターゲットポイントを進行方向順に生成する用
    checkReverseOrderX(x:number, y:number, map:number[][], reverseX:boolean):number{
        let orderX :number = x;
        if(reverseX){
            orderX = (map[y].length -1) - x;
        }
        return orderX;
    }

    reverseOrderY(y:number, map:number[][]):number{
        let orderY :number = y;
        orderY = (map.length -1) - y;
        return orderY;
    }

    map(mapNumber : number){
        let map : number[][] = [];

        switch(mapNumber){
            case MapType.STRAIGHT_UP:
                map =[
                    [9,2,9],
                    [9,2,9],
                    [9,2,9],
                    [9,2,9],
                    ]
            break;
            case MapType.STRAIGHT_RIGHT:
                map =[
                    [9,9,9],
                    [2,2,2],
                    [9,9,9],
                    [9,0,0],
                    ]
            break;
            case MapType.RIGHT_CURVE:
                map =[
                    [9,9,9],
                    [9,4,2],
                    [9,2,9],
                    [9,2,9],
                    ]
            break;
            case MapType.RIGHT_CURVE_REVERSE:
                map =[
                    [9,2,9],
                    [9,4,2],
                    [9,9,9],
                    [0,0,9],
                    ]
            break;
            case MapType.RIGHT_CURVE_ZIGZAG:
                map =[
                    [0,0,9],
                    [0,9,4],
                    [9,4,5],
                    [9,2,9],
                    ]
            break;
            case MapType.RIGHT_CURVE_ZIGZAG2:
                map =[
                    [0,0,9],
                    [0,9,4],
                    [0,9,2],
                    [9,4,5],
                    ]
            break;
            case MapType.START:
                map =[
                    [9,2,9],
                    [9,2,9],
                    [9,2,9],
                    [9,8,9],
                    ]
            break;

        }
        return map;
    }

    setCreateLine(mapNumber : number, reverseX : boolean){
        switch(mapNumber){
            case MapType.STRAIGHT_UP:
                Map.createLineY -= Game.height/4;
            break;
            case MapType.STRAIGHT_RIGHT:
                if(!reverseX){Map.createLineX += Game.width/3;}
                else{Map.createLineX -= Game.width/3;}
            break;
            case MapType.RIGHT_CURVE:
                if(!reverseX){
                    Map.createLineX += Game.width/3;
                }
                else{
                    Map.createLineX -= Game.width/3;
                }
            break;
            case MapType.RIGHT_CURVE_REVERSE:
                if(!reverseX){
                    Map.createLineY -= Game.height/4;
                }
                else{
                    Map.createLineY -= Game.height/4;
                }
            break;
            case MapType.RIGHT_CURVE_ZIGZAG:
                if(!reverseX){
                    Map.createLineX += Game.width/3;
                }
                else{
                    Map.createLineX -= Game.width/3;
                }
            break;
            case MapType.RIGHT_CURVE_ZIGZAG2:
                if(!reverseX){
                    Map.createLineX += Game.width/3;
                }
                else{
                    Map.createLineX -= Game.width/3;
                }
            break;
            case MapType.START:
                Map.createLineY -= Game.height/4;
            break;

        }

    }

    updateContent(){}

    addDestroyMethod(){
        Map.createLineX = 0;
        Map.createLineY = 0;
    }
}

class Chip extends GameCompornent{


    constructor(x : number, y:number, width:number, height:number) {
        super(x, y, width,height);        
    }

    //override
    setCompornent(x : number, y : number, width : number, height : number){

        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.width = width;
        this.compornent.height = height;
        GameStage.display.addChildAt(this.compornent, Background.I.index);
    }

    setShape(x: number, y:number, width:number, height:number,color:number){
        const shape : egret.Shape = Util.setRect(x,y,width,height,color,0,true,4);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }

    updateContent(){
        if(Player.I.compornent.y + Game.height/2 < this.compornent.y){
            this.destroy();
        }
    }


}

class None extends Chip{
    constructor(x : number, y:number, width:number, height:number) {
        super(x, y, width,height);
    }

}

class Run extends Chip{

    constructor(x : number, y:number, width:number, height:number) {
        super(x, y, width,height);
        // this.setBody(x,y,width,height,GraphicShape.RUN);
        this.setShape(0, 0, width,height,ColorPallet.WHITE);
        
    }

}

class GameOverChip extends PhysicsObject{

    constructor(x : number, y:number, width:number, height:number) {
        super(x, y, width,height);
        this.setBody(x,y,width,height,GraphicShape.GAMEOVER);
        //this.setShape(0, 0, width,height,ColorPallet.VERMILION);
    }

    //override
    setCompornent(x : number, y : number, width : number, height : number){

        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.width = width;
        this.compornent.height = height;
        GameStage.display.addChildAt(this.compornent, Background.I.index);
    }


    setShape(x: number, y:number, width:number, height:number,color:number){
        const shape : egret.Shape = Util.setRect(x,y,width,height,color,0,true);
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }

    protected setBody(x : number, y : number, width : number, height : number, collisionGroup:GraphicShape){

        this.body = new p2.Body({
            // mass : 1, 
            position:[x,y], 
            type:p2.Body.STATIC
        });
        this.bodyShape = new p2.Box({
            width : width, 
            height: height, 
            fixedRotation:true, 
            sensor:true,
            fixedX:true,
            fixedY:true,
            collisionGroup: collisionGroup, 
            collisionMask:GraphicShape.PLAYER
        });
        this.body.position[0] += width/2;
        this.body.position[1] += height/2;
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }

    fixedUpdate(){
        if(Player.I.compornent.y + Game.height/2 < this.compornent.y){
            this.destroy();
        }
    }

}

class Start extends PhysicsObject{
    static start:Start[]=[];
    static chipNumber : number = 0;
    public number : number = 0;

    constructor(x : number, y:number, width:number, height:number) {
        super(x, y, width,height);
        this.setBody(x,y,width/2,GraphicShape.START);
        this.setShape(0, 0, width/2*3,ColorPallet.WHITE);
        Start.start.push(this);

    }

    //override
    setCompornent(x : number, y : number, width : number, height : number){

        this.compornent = new egret.DisplayObjectContainer();
        this.compornent.x = x;
        this.compornent.y = y;
        this.compornent.width = width;
        this.compornent.height = height;
        GameStage.display.addChildAt(this.compornent, Background.I.index);
    }

    //override
    protected setBody(x : number, y : number, radius : number, collisionGroup:GraphicShape){

        this.body = new p2.Body({
            // mass : 1, 
            position:[x,y], 
            type:p2.Body.STATIC
        });
        this.bodyShape = new p2.Circle({
            radius:radius,
            fixedRotation:true, 
            sensor:true,
            fixedX:true,
            fixedY:true,
            collisionGroup: collisionGroup, 
            collisionMask:GraphicShape.PLAYER
        });
        this.body.position[0] += radius;
        this.body.position[1] += radius;
        this.body.addShape(this.bodyShape);
        PhysicsObject.world.addBody(this.body);
        
    }

    //override
    setShape(x: number, y:number, radius:number,color:number){

        const shape : egret.Shape = Util.setCircle(x,y,radius,color,true);
        this.compornent.anchorOffsetX -= this.compornent.width/2;
        this.compornent.anchorOffsetY -= this.compornent.height/2;
        this.compornent.addChild(shape);
        this.shapes.push(shape);
    }

    fixedUpdate(){
        if(Player.I.compornent.y + Game.height/2 < this.compornent.y){
            this.destroy();
        }
    }

}

class Turn extends Chip{

    static turn:Turn[]=[];
    static chipNumber : number = 0;
    public number : number = 0;
    public turnRight : boolean = false;
    public jump : boolean = false;

    

    constructor(x : number, y:number, width:number, height:number, collisionGroup:GraphicShape,mapNumber:number,reverseX:boolean, turnRight:boolean,jump:boolean) {
        super(x, y, width,height);
        //this.setBody(x,y,width,height, collisionGroup);
        this.setShape(0, 0, width,height,ColorPallet.WHITE);
        Turn.turn.push(this);

        this.number = Turn.chipNumber;
        Turn.chipNumber += 1;
        if(reverseX){
            this.turnRight = !turnRight;
        }
        else{
            this.turnRight = turnRight;
        }
        this.jump = jump;

        this.replaceTurnChip(mapNumber,this.number, reverseX);
       
    }

    //chipは配列の関係上左から右へ配置されるので、右折の時は問題ないが、
    //zigzagで左折を使いたい場合、chipNumberの順番にplayerが通らないことあるのでその補正。
    //入れ替えは一行につき一回まで。
    //GraphicShapeは考慮していない。
    replaceTurnChip(mapNumber:number,nowNumber:number, reverseX:boolean){
        if(nowNumber-1 < 0){return;}
        if(!reverseX){return;}
        if(mapNumber == MapType.RIGHT_CURVE_ZIGZAG || mapNumber == MapType.RIGHT_CURVE_ZIGZAG2){
            if(Turn.turn[nowNumber].compornent.y != Turn.turn[nowNumber-1].compornent.y){return;}
            if(Turn.turn[nowNumber].compornent.x <= Turn.turn[nowNumber-1].compornent.x){return;}
            if(Turn.turn[nowNumber].number > Turn.turn[nowNumber-1].number){

                const nowTurn : Turn= Turn.turn[nowNumber];
                const beforeTurn : Turn= Turn.turn[nowNumber-1];
                Turn.turn[nowNumber] = beforeTurn;
                Turn.turn[nowNumber-1] = nowTurn;
            }

        }
    }


    fixedUpdate(){}

}
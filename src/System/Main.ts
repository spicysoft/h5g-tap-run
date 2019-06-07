enum ColorPallet{

    //自然
    WHITE = 0xffffff,
    RED = 0xf16b6f,
    BLUE = 0x80bd9e,
    GREEN = 0x89da59,
    VERMILION = 0xf98866,

}
//const BALL_SIZE_METER = 0.6;
const PIXEL_PER_METER = 1;

class Main extends eui.UILayer {

    public constructor() {
        super();
        this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    }
 
    private addToStage() {
        Util.init( this );
        CheckDate.init();
        SaveData.init();
        GameObject.init( this.stage );
        PhysicsObject.prepare( PIXEL_PER_METER );
        Camera2D.initial();
        Game.init();
        egret.startTick(this.tickLoop, this);
    }

    tickLoop(timeStamp:number):boolean{
        PhysicsObject.step(timeStamp);
        GameObject.update();
        return false;
    }

}

class Game{

    static width: number;
    static height: number;
    static mapChipWidth: number;
    static mapChipHeight: number;

    static init() {
        
        this.width  = egret.MainContext.instance.stage.stageWidth;
        this.height = egret.MainContext.instance.stage.stageHeight;
        this.mapChipWidth = this.width/9;
        this.mapChipHeight = this.height/16;

        GameOver.gameOverFlag = false;


        /* new メソッドを記入*/
        new Background();
        new GameStage();
        new UILayer();
        new Map();
        //new Ground(0,Game.height-200,Game.width,0,4,ColorPallet.RED);
        new Player(Game.width/2,Game.height-250,Game.width*0.06,Game.width*0.1);
/*        new Score(0,0,0,0, ColorPallet.BLUE);
        new Description(0,0,0,0, ColorPallet.BLUE);
        new CreateGameScene();*/
        
    }


}




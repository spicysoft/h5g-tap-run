enum ColorPallet{
    WHITE = 0xffffff,
    RED = 0xee5253,
    BLUE = 0x48dbfb,
    GREEN = 0x89da59,
    VERMILION = 0xf98866,
    BLACK = 0x222f3e,
}
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

        Player.gameStart = false;
        GameOver.gameOverFlag = false;
        Camera2D.initial();
        Turn.turn = [];
        Turn.chipNumber = 0;
        Start.start = [];


        /* new メソッドを記入*/
        new Background();
        new GameStage();
        new UILayer();
        new Map();
        new Player(Game.width/2,Game.height/2,Game.mapChipWidth*0.8,Game.mapChipWidth*0.8);
        new Description(0,0,0,0, ColorPallet.BLACK);
        new Score(0,0,0,0, ColorPallet.BLACK);
        
    }


}




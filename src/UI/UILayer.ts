//UIコンポーネントを描画するレイヤー
//リトライするときはaddDestroyMethodをGameOverで実行すること
class UILayer{

    static I :UILayer = null;
    static display: eui.UILayer = null;
    static index :number;
    static onTouch :boolean = false;
    static onLeft : boolean = false;
    static onRight : boolean = false;
    private pushPos : number[] = [0,0];
    private releasePos : number[] = [0,0];
    private initialBallPos : number[] = [0,0];
    private displayRotation : number = 90;

    constructor(){
        UILayer.I = this;
        this.setContainer();
        UILayer.index = GameObject.display.getChildIndex(UILayer.display) ;
        //UILayer.display.once( egret.TouchEvent.TOUCH_BEGIN, this.deleteDiscription, this );
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.push, this );
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.move, this );
        UILayer.display.addEventListener( egret.TouchEvent.TOUCH_END, this.end, this );
    }

    setContainer(){
        UILayer.display = new eui.UILayer();
        GameObject.display.addChild(UILayer.display);
    }
    push(e : egret.TouchEvent){
        if(GameOver.gameOverFlag){return;}
        if(!Player.gameStart){return;}
        UILayer.onTouch = true;
        Player.I.setToMoveAngle();
        Score.addScore();

    }
    move(e : egret.TouchEvent){
        //UILayer.onTouch = true;
    }

    end(){
        
        UILayer.onTouch = false;

    }

    turnRight(onRight : boolean){
        if(onRight){
            UILayer.onRight = true;
            UILayer.onLeft = false;
        }
        else{
            UILayer.onRight = false;
            UILayer.onLeft = true;
        }
    }

    remove(){
        if(UILayer.display){
            UILayer.display.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.push, this );
            UILayer.display.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.move, this );
            UILayer.display.removeEventListener( egret.TouchEvent.TOUCH_END, this.end, this );
            UILayer.display.removeChildren();
            GameObject.display.removeChild(UILayer.display);
            UILayer.display =null;
        }
    }



}


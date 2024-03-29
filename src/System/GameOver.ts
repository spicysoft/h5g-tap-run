class GameOver extends UICompornent{

    textGameOver:eui.Label = null;
    textScore:eui.Label = null;
    textColor : number = ColorPallet.BLACK;
    static gameOverFlag : boolean = false;

    constructor(x : number, y : number, width : number, height : number) {
        super(x,y,width,height);
        GameOver.gameOverFlag = true;

        this.textGameOver = Util.myText(Game.width/2, Game.height*0.44 - 60, "GAME OVER", 80, 1, this.textColor, true);
        this.textGameOver.anchorOffsetX = this.textGameOver.width/2;
        this.textGameOver.anchorOffsetY = this.textGameOver.height/2;
        this.compornent.addChild( this.textGameOver );
        
        this.textScore = Util.myText(Game.width/2, Game.height*0.44 + 60, "SCORE : " + Score.score, 80, 1, this.textColor, true);
        this.textScore.anchorOffsetX = this.textScore.width/2;
        this.textScore.anchorOffsetY = this.textScore.height/2;
        this.compornent.addChild( this.textScore );

        // UILayer.display.once(egret.TouchEvent.TOUCH_BEGIN, GameOver.tap, this);
        Score.I.saveBestScore();

    }

    addDestroyMethod() {
        if(this.compornent){
            this.compornent.removeChildren();
        }

        this.textGameOver = null;
        this.textScore = null;
    }
    
    updateContent() {

     }

    static tap(){
        UILayer.I.remove();
        GameObject.transit = Game.init;

    }

}
class Description extends UICompornent{

    static I :Description = null;
    text:eui.Label = null;
    textBest:eui.Label = null;
    textColor : number = 0x000000;


    constructor(x : number, y : number, width : number, height : number, color : number) {
        super(x,y,width,height);
        Description.I = this;
        this.textColor = color;
        this.setText();
        UILayer.display.once( egret.TouchEvent.TOUCH_BEGIN, this.push, this );

    }

    setText(){
        const t :string = "タップで方向転換\n\n壁に当たるとゲームオーバー";
        this.text = Util.myText(Game.width/2, Game.height/2.4, t, 90, 0.5, this.textColor, true);
        this.text.anchorOffsetX = this.text.width/2;
        this.text.anchorOffsetY = this.text.height/2;
        this.text.textAlign = egret.HorizontalAlign.CENTER;
        this.compornent.addChild( this.text );
    }


    addDestroyMethod() {
        if(this.compornent){
            this.compornent.removeChildren();
        }

        this.text = null;
    }

    updateContent(){}

    push(){
        Player.gameStart = true;
        this.destroy();
    }

}
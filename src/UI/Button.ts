abstract class Button extends UICompornent{

    indexText : eui.Label = null;
    indexTextColor : number = ColorPallet.WHITE;
    shapeColor : number = ColorPallet.BLACK;
    mask : egret.Shape = null;
    maskColor : number = ColorPallet.WHITE;
    onMask : boolean = false;

    constructor(x : number, y : number, width : number, height : number, index : string){
        super(x, y, width, height);
        this.setCompornentStatus(x, y, width, height);
    }

    setCompornentStatus(x : number, y : number, width : number, height : number){
        this.compornent.touchEnabled = true;
        this.compornent.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.tap, this );
    }

    setShape(x : number, y : number, width : number, height : number, color?:number){

        if(color){
            this.shapeColor = color;
        }
        this.shapes[0] = Util.setRect(x,y,width,height,this.shapeColor,70,true);
        this.compornent.addChild(this.shapes[0]);
    }

    setMask(x : number, y : number, width : number, height : number, color?:number){

        if(color){
            this.maskColor = color;
        }
        this.mask = Util.setRect(x,y,width,height,this.maskColor,70,true);
        this.mask.alpha = 0;
        this.shapes[1] = this.mask;
        this.compornent.addChild(this.mask);
    }
    

    setIndexText(x : number, y : number, width : number, height : number, size:number, ratio:number, index:string){
        this.indexText = Util.myText(x,y, index, size, ratio, this.indexTextColor, true);
        this.indexText.anchorOffsetX = this.indexText.width/2;
        this.indexText.anchorOffsetY = this.indexText.height/2;
        this.indexText.x += this.compornent.width/2;
        this.indexText.y += this.compornent.height/2;
        this.indexText.textAlign = egret.HorizontalAlign.CENTER;
        this.indexText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.compornent.addChild(this.indexText);
    }


    addDestroyMethod(){
        if( this.compornent.hasEventListener ){
            this.compornent.removeEventListener( egret.TouchEvent.TOUCH_BEGIN, this.tap, this );
        }
        if(this.indexText){
            this.compornent.removeChild(this.indexText);
            this.indexText = null;
        }

    }


    abstract tap() :void;

}

class RetryButton extends Button{
    constructor(x : number, y : number, width : number, height : number, size:number, ratio:number, index : string){
        super(x, y, width, height, index);
        this.setShape(0, 0, width, height);
        this.setIndexText(0,0,width,height,size, ratio,index);
        this.setMask(x, y, width, height);
    }

    tap(){
        GameOver.tap();
    }

    updateContent(){}
}
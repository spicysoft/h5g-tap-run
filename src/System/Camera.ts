class Camera2D{
    static x:number = 0;
    static y:number = 0;
    static angle:number = 0;
    static scale:number = 1;

    static initial(){
        Camera2D.x = 0;
        Camera2D.y = 0;
        Camera2D.angle = 0;
        Camera2D.scale = 1.35;
    }

    static transform( display:egret.DisplayObject){
        display.x = Camera2D.transX( display.x ) ;
        display.y = Camera2D.transY( display.y ) ;
        display.scaleX = display.scaleY = Camera2D.scale;
        //display.rotation = Camera2D.rotate(Camera2D.angle);
    }

    static transX( px:number ):number {
        return ( Camera2D.x) * Camera2D.scale; 
    }

    static transY( py:number ):number {
        return ( Camera2D.y) * Camera2D.scale; 
    }



}
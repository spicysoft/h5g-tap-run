enum Type{
    NORMAL,
    ROTATE,
    ZOOM,
    SPEED,
    ROTATE_ZOOM,
    SPEED_NORMAL,
    SPEED_ROTATE,
    SPEED_ZOOM,
    SPEED_ROTATE_ZOOM,
}

enum CameraScale{
    NORMAL = 1.6,
    ZOOM_IN = 2.0,
    ZOOM_OUT = 1.2,

}

class Camera2D{
    static x:number = 0;
    static y:number = 0;
    static angle:number = 0;
    static scale:number = 1;
    static type : Type = Type.NORMAL;

    static initial(){
        Camera2D.x = 0;
        Camera2D.y = 0;
        Camera2D.angle = 0;
        Camera2D.scale = CameraScale.NORMAL;
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
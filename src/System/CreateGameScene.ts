class CreateGameScene extends GameObject{
    
    static createPosY : number = 0;
    static rightWall : Wall[] = [];
    static leftWall : Wall[] = [];
    private wallWidth : number;
    private wallHeight : number;

    static coin : Coin[] = [];
    static createCoinPosY : number = 0;

    static needle :Needle[] = []
    private needleWidth : number;
    

    constructor(){
        super();
        CreateGameScene.createPosY = Game.height;
        CreateGameScene.createCoinPosY  = Game.height;
        CreateGameScene.rightWall = [];
        CreateGameScene.leftWall = [];
        CreateGameScene.coin = [];
        CreateGameScene.needle = [];
        this.wallWidth = Game.width*0.1;
        this.wallHeight = Game.height*0.98;
        this.needleWidth = Game.width*0.065;
        this.initialWall();
        

    }


    private initialWall(){
        new Wall(Game.width*0.9,   -Game.height * 1, this.wallWidth, this.wallHeight);
        new Wall(0,                -Game.height * 1, this.wallWidth, this.wallHeight);
        new Wall(Game.width*0.9,    Game.height * 0, this.wallWidth, Game.height*1.5);
        new Wall(0,                 Game.height * 0, this.wallWidth, Game.height*1.5);


    }

    private createWall(){
        if(CreateGameScene.createPosY - Player.I.compornent.y  > Game.height){
            //const y :number = Player.I.compornent.y - Game.height*2;
            const y :number = CreateGameScene.createPosY - Game.height*3;
            CreateGameScene.createPosY -= Game.height;
            new Needle(this.wallWidth,              y + Util.randomInt(Game.height*0.02,Game.height*0.98), this.needleWidth, this.needleWidth);
            new Needle(Game.width - this.wallWidth, y + Util.randomInt(Game.height*0.02,Game.height*0.98), this.needleWidth, this.needleWidth);
            new Wall(Game.width*0.9,    y, this.wallWidth, this.wallHeight);
            new Wall(0,                 y, this.wallWidth, this.wallHeight);

            
        }

        if(CreateGameScene.createCoinPosY - Player.I.compornent.y  > Game.height*0.4){
            const x :number = Util.randomInt(Game.width*0.12, Game.width*0.86);
            const y :number = Player.I.compornent.y - Game.height*1 -Util.randomInt(0, Game.height*0.5);
            CreateGameScene.createCoinPosY = Player.I.compornent.y;
            new Coin(x, y, Game.width*0.06, Game.width*0.06);
        }
        
    }

    static freshArray(){
            const newArray : Wall[] = CreateGameScene.rightWall.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.rightWall = newArray;

            const newArray2 : Wall[] = CreateGameScene.leftWall.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.leftWall = newArray2;

            const newArray3 : Coin[] = CreateGameScene.coin.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.coin = newArray3;

            const newArray4 : Needle[] = CreateGameScene.needle.filter(obj => obj.destroyFlag !== true);
            CreateGameScene.needle = newArray4;
    }

    updateContent(){
        this.createWall();
    }

}
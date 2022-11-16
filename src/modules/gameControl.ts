import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
class gameControl{
    //定义三个元素
    snake:Snake;
    food:Food;
    ScorePanel:ScorePanel;

    // 创建一个属性来存储蛇的移动方向
    direction:string = 'right';

    //判断游戏是否结束
    isLive = true;

    constructor(){
        this.snake = new Snake();
        this.food = new Food();
        this.ScorePanel = new ScorePanel();
        this.init();
    }

    //游戏初始化
    init(){
        //绑定鼠标事件
        // document.addEventListener('keydown',this.keyDownHandler.bind(this))
        document.addEventListener('keydown',this.keyDownHandler.bind(this))
        this.run()
    }

    keyDownHandler = (event:KeyboardEvent) =>{
        //console.log(event.key);
         // chrome      IE
        // ArrowUp     up
        // ArrowDown   down
        // ArrowLeft   left
        // ArrowRight  right
        // 在IE和Chrome值不一样
        // console.log(event.key);
        // 需要检查值是否合法（用户是否按了正确的按键）
        this.direction = event.key
    }

    run(){
        // 根据方向（this.direction）来使蛇的位置改变
        /**
         * 向上 top减少
         * 向下 top增加
         * 向左 left减少
         * 向右 left增加
         */
        // 获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        // 根据按键方向来修改X值和Y值
        switch(this.direction){
            case 'ArrowUp':
            case 'up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'down':
                Y += 10;
                break;    
            case 'ArrowLeft':
            case 'left':
                X -= 10;
                break;  
            case 'ArrowRight':
            case 'right':
                X += 10;
                break;  
        }
        this.checkEat(X,Y);
        try{
            this.snake.X = X;
            this.snake.Y = Y;
        }catch(error){
           // 进入catch 说明出现了异常，游戏结束，弹出一个提示信息
           alert((error as Error).message);
           this.isLive = false; 
        }
        this.isLive && setTimeout(this.run.bind(this),300 - (this.ScorePanel.level-1)*30)
    }
    //检查蛇是否吃到食物
    checkEat(X:number,Y:number){
        if(X === this.food.X && Y ===this.food.Y){
            //重置事物位置
            this.food.change();
            //分数增加
            this.ScorePanel.addScore();
            //蛇身体增加一节
            this.snake.addBody();
        }
    }

}
export default gameControl
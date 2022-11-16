//引入样式
import './style/index.less';
import gameControl from './modules/gameControl';
//定义类
//food
// class Food{
//     //定义一个属性表示食物所对应的元素
//     element:HTMLElement;

//     constructor(){
//         //获取页面中得food元素并将其赋值给element
//         this.element=document.getElementById('food')!;
//     }

//     //定义获取食物坐标轴得方法
//     get X(){
//         return this.element.offsetLeft;
//     }
//     get Y(){
//         return this.element.offsetTop;
//     }

//     change(){
//         let top = Math.round(Math.random() * 29) * 10
//         let left = Math.round(Math.random() * 29) * 10
//         this.element.style.left = left + 'px'
//         this.element.style.top = top + 'px'
//     }

// }
//测试代码
// const food = new Food()
// food.change()

// class ScorePanel{
//     // srore和level 用来记录计分和等级
//     score = 0;
//     level = 1;

//     //分数和等级所在得元素 在构造函数中初始化
//     scoreEle:HTMLElement;
//     levelEle:HTMLElement;

//     //设置一个变量来表示多少分时升级
//     maxLevel:number;
//     upScore:number;

//     constructor(maxLevel:number = 10,upScore:number=10){
//         this.scoreEle = document.getElementById('score')!;
//         this.levelEle = document.getElementById('level')!;
//         this.maxLevel = maxLevel;
//         this.upScore = upScore;
//     }

//     //设置一个加分得方法
//     addScore(){
//         //分数自增
//         this.score++;
//         this.scoreEle.innerHTML = this.score +'';

//         if(this.score % this.upScore ===0){
//             this.levelUp()
//         }
//     }

//     //提升等级得方法
//     levelUp(){
//         if(this.level < this.maxLevel){
//             this.levelEle.innerHTML = ++this.level + '';
//         }

//     }
// }
//测试代码
// const scorePanel = new ScorePanel()
// scorePanel.addScore()
// scorePanel.addScore()
// scorePanel.addScore()
// scorePanel.addScore()
// class Snake{
//     //表示蛇头的元素
//     head:HTMLElement;
//     //蛇的身体元素（包括蛇头） 是HTMLCollection！！！！！
//     bodies:HTMLCollection;
//     //获取蛇的容器
//     element:HTMLElement;
//     constructor(){
//         this.element = document.getElementById('snake')!;
//         //只能获取第一个div
//         this.head = document.querySelector('#snake > div')!as HTMLElement;
//         //获取所有div
//         this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
//     }
// //获取蛇的坐标位置
//     get X(){
//         return this.head.offsetLeft;
//     }
//     get Y(){
//         return this.head.offsetTop;
//     }
// //修改蛇得位置
//     set X(value : number){
//         if(this.X === value){
//             return;
//         }
//         if(value < 0 || value > 290){
//             throw new Error('蛇撞墙了！');
//         }
//          //修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头
//         if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
//             if(value > this.X){
//                 value =this.X - 10;
//             }else{
//                 value =this.X + 10;
//             }
//         }
//         this.moveBody()
//         this.head.style.left = value + 'px';
//         this.checkHeadBody()
//     }
//     set Y(value : number){
//         if(this.Y === value){
//             return;
//         }
//         if(value < 0 || value > 290){
//             throw new Error('蛇撞墙了！');
//         }
//         //修改Y时，是在修改水平坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头
//         if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
//             if(value > this.Y){
//                 value =this.Y - 10;
//             }else{
//                 value =this.Y + 10;
//             }
//         }
//         this.moveBody()
//         this.head.style.top = value + 'px';
//         this.checkHeadBody()
//     }

//     //蛇增加身体的方法
//     addBody(){
//         //向element中添加一个div
//         this.element.insertAdjacentHTML('beforeend',"<div></div>");
//     }

//     //移动身体
//     moveBody(){
//          /*
//         *将后边的身体设置为前边身体的位置
//         * 举例子：
//         * 第四节 == 第三节的位置
//         * 第三节 == 第二节的位置
//         * 第二节 == 第一节的位置
//         * */
//         //遍历
//         for(let i = this.bodies.length - 1;i>0;i++){
//             //获取前边身体的位置
//             let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
//             let Y = (this.bodies[i-1] as HTMLHtmlElement).offsetTop;
//             //将值设置到当前身体上
//             (this.bodies[i] as HTMLElement).style.left = X + 'px';
//             (this.bodies[i] as HTMLElement).style.top = Y + 'px';
//         }
//     }
//     //检查是否蛇头撞到身体
//     checkHeadBody(){
//         //获取所有的身体，检查其是否和蛇头的坐标发生重叠
//         for(let i=1;i<this.bodies.length;i++){
//             if(this.X ===(this.bodies[i] as HTMLElement).offsetLeft && this.Y ===(this.bodies[i] as HTMLHtmlElement).offsetTop){
//                 //进入判断说明蛇头撞到了身体，游戏结束
//                 throw new Error('撞到自己了')
//             }
//         }
//     }
// }

// class gameControl{
//     //定义三个元素
//     snake:Snake;
//     food:Food;
//     ScorePanel:ScorePanel;

//     // 创建一个属性来存储蛇的移动方向
//     direction:string = 'right';

//     //判断游戏是否结束
//     isLive = true;

//     constructor(){
//         this.snake = new Snake();
//         this.food = new Food();
//         this.ScorePanel = new ScorePanel();
//         this.init();
//     }

//     //游戏初始化
//     init(){
//         //绑定鼠标事件
//         // document.addEventListener('keydown',this.keyDownHandler.bind(this))
//         document.addEventListener('keydown',this.keyDownHandler.bind(this))
//         this.run()
//     }

//     keyDownHandler = (event:KeyboardEvent) =>{
//         //console.log(event.key);
//          // chrome      IE
//         // ArrowUp     up
//         // ArrowDown   down
//         // ArrowLeft   left
//         // ArrowRight  right
//         // 在IE和Chrome值不一样
//         // console.log(event.key);
//         // 需要检查值是否合法（用户是否按了正确的按键）
//         this.direction = event.key
//     }

//     run(){
//         // 根据方向（this.direction）来使蛇的位置改变
//         /**
//          * 向上 top减少
//          * 向下 top增加
//          * 向左 left减少
//          * 向右 left增加
//          */
//         // 获取蛇现在的坐标
//         let X = this.snake.X;
//         let Y = this.snake.Y;

//         // 根据按键方向来修改X值和Y值
//         switch(this.direction){
//             case 'ArrowUp':
//             case 'up':
//                 Y -= 10;
//                 break;
//             case 'ArrowDown':
//             case 'down':
//                 Y += 10;
//                 break;    
//             case 'ArrowLeft':
//             case 'left':
//                 X -= 10;
//                 break;  
//             case 'ArrowRight':
//             case 'right':
//                 X += 10;
//                 break;  
//         }
//         this.checkEat(X,Y);
//         try{
//             this.snake.X = X;
//             this.snake.Y = Y;
//         }catch(error){
//            // 进入catch 说明出现了异常，游戏结束，弹出一个提示信息
//            alert((error as Error).message);
//            this.isLive = false; 
//         }
//         this.isLive && setTimeout(this.run.bind(this),300 - (this.ScorePanel.level-1)*30)
//     }
//     //检查蛇是否吃到食物
//     checkEat(X:number,Y:number){
//         if(X === this.food.X && Y ===this.food.Y){
//             //重置事物位置
//             this.food.change();
//             //分数增加
//             this.ScorePanel.addScore();
//             //蛇身体增加一节
//             this.snake.addBody();
//         }
//     }

// }
//测试环境
// const s= new gameControl()
// s.init()
new gameControl()
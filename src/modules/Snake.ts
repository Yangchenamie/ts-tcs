class Snake{
    //表示蛇头的元素
    head:HTMLElement;
    //蛇的身体元素（包括蛇头） 是HTMLCollection！！！！！
    //bodies:HTMLCollection;
    bodies:HTMLCollectionOf<HTMLElement>;
    //获取蛇的容器
    element:HTMLElement;
    constructor(){
        this.element = document.getElementById('snake')!;
        //只能获取第一个div
        this.head = document.querySelector('#snake > div')!as HTMLElement;
        //获取所有div
        //this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
        this.bodies = this.element.getElementsByTagName('div');
    }
//获取蛇的坐标位置
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }
//修改蛇得位置
    set X(value : number){
        if(this.X === value){
            return;
        }
        if(value < 0 || value > 290){
            throw new Error('蛇撞墙了！');
        }
         //修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            if(value > this.X){
                value =this.X - 10;
            }else{
                value =this.X + 10;
            }
        }
        this.moveBody()
        this.head.style.left = value + 'px';
        this.checkHeadBody()
    }
    set Y(value : number){
        if(this.Y === value){
            return;
        }
        if(value < 0 || value > 290){
            throw new Error('蛇撞墙了！');
        }
        //修改Y时，是在修改水平坐标，蛇在上下移动，蛇在向上移动时，不能向下掉头
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                value =this.Y - 10;
            }else{
                value =this.Y + 10;
            }
        }
        this.moveBody()
        this.head.style.top = value + 'px';
        this.checkHeadBody()
    }

    //蛇增加身体的方法
    addBody(){
        //向element中添加一个div
        this.element.insertAdjacentHTML('beforeend',"<div></div>");
    }

    //移动身体
    moveBody(){
         /*
        *将后边的身体设置为前边身体的位置
        * 举例子：
        * 第四节 == 第三节的位置
        * 第三节 == 第二节的位置
        * 第二节 == 第一节的位置
        * */
        //遍历
        for(let i = this.bodies.length - 1;i>0;i--){
            //获取前边身体的位置
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLHtmlElement).offsetTop;
            //将值设置到当前身体上
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }
    //检查是否蛇头撞到身体
    checkHeadBody(){
        //获取所有的身体，检查其是否和蛇头的坐标发生重叠
        for(let i=1;i<this.bodies.length;i++){
            if(this.X ===(this.bodies[i] as HTMLElement).offsetLeft && this.Y ===(this.bodies[i] as HTMLHtmlElement).offsetTop){
                //进入判断说明蛇头撞到了身体，游戏结束
                throw new Error('撞到自己了')
            }
        }
    }
}
export default Snake
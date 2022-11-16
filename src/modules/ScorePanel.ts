class ScorePanel{
    // srore和level 用来记录计分和等级
    score = 0;
    level = 1;

    //分数和等级所在得元素 在构造函数中初始化
    scoreEle:HTMLElement;
    levelEle:HTMLElement;

    //设置一个变量来表示多少分时升级
    maxLevel:number;
    upScore:number;

    constructor(maxLevel:number = 10,upScore:number=10){
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    //设置一个加分得方法
    addScore(){
        //分数自增
        this.score++;
        this.scoreEle.innerHTML = this.score +'';

        if(this.score % this.upScore ===0){
            this.levelUp()
        }
    }

    //提升等级得方法
    levelUp(){
        if(this.level < this.maxLevel){
            this.levelEle.innerHTML = ++this.level + '';
        }

    }
}
export default ScorePanel
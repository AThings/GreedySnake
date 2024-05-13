// 游戏控制总类 控制其他所有类
import Food from './food'
import ScorePanel from './scorePanel'
import Snake from './snake'
class GameControl {
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;
    isLive = true;

    // 存储蛇的移动方向
    direction: string = '';

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(10, 2)

        this.init()
    }

    // 游戏初始化
    init() {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this))

        this.run()
    }

    // 键盘按下的响应函数
    keydownHandler(event:KeyboardEvent) {

        const whiteList = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']
        //  保存方向
        if (whiteList.includes(event.key)) {
            this.direction = event.key
        }
    }

    // 控制蛇的移动
    run() {
        // 获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;

        switch(this.direction) {
            case 'ArrowUp':
                Y -= 10;
                break
            case 'ArrowRight':
                X += 10;
                break
            case 'ArrowDown':
                Y += 10;
                break
            case 'ArrowLeft':
                X -= 10;
                break
        }

        // 检查蛇是否吃到食物
        this.checkEat(X, Y)

        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch(e: any) {
            alert(e.message + '： GAME OVER')
            this.isLive = false
        }

        // 定时调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }

    checkEat(x:number, y:number){
        const flag = x === this.food.X && y === this.food.Y
        if (flag) {
            // 食物移动
            this.food.changePosition()
            //  加分
            this.scorePanel.addScore(1)
            //  蛇增加一节
            this.snake.addBody()
        }
    }
}

export default GameControl
// 记分牌类
class ScorePanel {
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    // 最高等级
    maxLevel: number;
    // 升一级所需要的分数
    upScore: number;

    constructor(maxLevel: number = 10, upScore:number = 10) {
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    // 加分方法
    addScore(value:number) {
        this.score += value
        this.scoreEle.innerHTML = this.score.toString()
        // 判断升级
        if (this.score % this.upScore === 0) {
            this.levelUp(1)
        }
    }
    levelUp(value:number) {
        // 等级上限
        if(this.level >= this.maxLevel) {
            return
        }
        this.level += value
        this.levelEle.innerHTML = this.level.toString()
    }
} 

export default ScorePanel;
//  食物类
class Food {
    // 食物的元素
    element: HTMLElement;
    constructor() {
        //  后面的叹号 表示不会为空
        this.element = document.getElementById('food')!
    }
    // 定义获取食物坐标的方法
    get X() {
        return this.element.offsetLeft
    }
    get Y() {
        return this.element.offsetTop
    }

    // 随机修改食物位置的方法
    changePosition() {
        // 食物位置 0 ~ 290 且能整除10
       const x =  Math.round(Math.random() * 29) * 10
       const y = Math.round(Math.random() * 29) * 10

        this.element.style.left = x + 'px'
        this.element.style.top = y + 'px'
    }
}

export default Food;
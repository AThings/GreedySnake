class Snake {
    element: HTMLElement;
    // 蛇头元素
    head: HTMLElement;
    // 身体
    bodies: HTMLCollection;
    
    constructor() {
        this.element = document.getElementById('snake')!;
        this.head = document.querySelector('.snake__piece')!;
        this.bodies = this.element.getElementsByTagName('div');
    }
    // 获取蛇头坐标
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }

    set X(value: number) {
        if (this.X === value) {
            return
        }

        // x合法范围
        if (value < 0 || value > 290) {
            // 蛇撞墙了
            throw new Error('蛇撞墙了')
        }

        // 蛇不能调头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            if (value > this.X) {
                value = this.X - 10
            } else {
                value = this.X + 10
            }
        }

        if (this.bodies.length > 1) {
            this.moveBody()
        }
        this.head.style.left = value + 'px'
        this.checkHeadBody()
    }
    set Y(value: number) {
        if (this.Y === value) {
            return
        }

        if (value < 0 || value > 290) {
            // 蛇撞墙了
            throw new Error('蛇撞墙了')
        }
        
        // 蛇不能调头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
            if (value > this.Y) {
                value = this.Y - 10
            } else {
                value = this.Y + 10
            }
        }

    
        if (this.bodies.length > 1) {
            this.moveBody()
        }
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }

    // 添加一个蛇的身体
    addBody() {
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
    }

    // 移动身体
    moveBody() {
        //  将后边身体的位置改为前边身体的位置
        for (let i = this.bodies.length - 1; i > 0; i--) {
            const bodyPre = this.bodies[i - 1] as HTMLElement
            const body = this.bodies[i] as HTMLElement
            body.style.left = bodyPre.offsetLeft + 'px'
            body.style.top = bodyPre.offsetTop + "px"
        }
    }

    checkHeadBody() {
        for (let i = 1; i < this.bodies.length; i++) {
            const body = this.bodies[i] as HTMLElement
            if (this.X === body.offsetLeft && this.Y === body.offsetTop ) {
                throw new Error('蛇撞到身体了')
            }
        }
    }
}

export default Snake
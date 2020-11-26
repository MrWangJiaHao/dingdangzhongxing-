class isDisplayNoneBlock {
    constructor() {
        this.number = 1
        this.text = "展示";
        this.parentHeight = 0
        this.parent = null
        window.onresize = this.isChaXun()
    }
    isChaXun(child) {
        if (!child) return
        let parent = child.parentNode;
        if (!parent) return console.log(new Error("该字节点没有父节点，请重新输入"))
        this.child = child
        let parentHeight = parent.offsetHeight;
        this.parentHeight = parentHeight
        this.parent = parent
        console.log(parentHeight, "查询按钮父层的height，是否超过150px")
        if (parentHeight > 150) {
            parent.style.height = 118 + "px";
            this.createDomPush(child);
        }
    }
    createDomPush(child) {
        let self = this
        let div = document.createElement("div");
        div.innerText = this.text;
        div.className = "inline mr11 clickMes";
        child.insertBefore(div, child.children[0]);
        div.addEventListener("click", () => {
            self.number++
            self.number % 2 ? self.clickFun(div, self) : self.changeFun(div, self);
        }, false);
    }
    clickFun(div, self) {
        div.innerText = "展示"
        div.classList.toggle("isclickMes")
        self.child.style.bottom = "10" + "px";
        self.parent.style.height = 118 + "px";
    }
    changeFun(div, self) {
        div.innerText = "收起"
        self.parent.style.height = self.parentHeight + "px";
        self.child.style.bottom = "34" + "px";
        div.classList.toggle("isclickMes")
    }
}


export default new isDisplayNoneBlock()

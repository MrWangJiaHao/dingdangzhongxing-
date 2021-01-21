class isDisplayNoneBlock {
    constructor() {
        this.number = 1
        this.text = "展开";
        this.parentHeight = 0
        this.parent = null
    }

    isChaXun(child) {
        if (!child) return console.log(child)
        let parent = child.parentNode;
        if (!parent) return console.log(new Error("该字节点没有父节点，请重新输入"))
        this.child = child
        let parentHeight = parent.offsetHeight;
        this.parentHeight = parentHeight
        this.parent = parent
        this.parent.style.marginBottom = 16 + "px";
        console.log(this.parentHeight, 'isChaXun')
        if (parentHeight > 126) {
            parent.style.height = 120 + "px";
            this.createDomPush(child);
        } else {
            parent.style.height = 120 + "px";
        }
    }

    createDomPush(child) {
        let self = this
        let div = document.createElement("div");
        div.innerText = this.text;
        div.className = "inline nowrap tr mb8 mr11 clickMes";
        child.insertBefore(div, child.children[0]);
        div.addEventListener("click", () => {
            self.number++
            self.number % 2 ? self.clickFun(div, self) : self.changeFun(div, self);
        }, false);
    }

    clickFun(div, self) {
        div.innerText = "展示"
        div.classList.toggle("isclickMes")
        self.parent.style.marginBottom = 16 + "px";
        self.parent.style.height = 120 + "px";
        self.child.style.bottom = "0" + "px";
    }

    changeFun(div, self) {
        div.innerText = "收起";
        div.classList.toggle("isclickMes")
        self.parent.style.height = self.parentHeight + "px";
        self.child.style.bottom = 20 + "px";
        self.parent.style.marginBottom = 0 + "px";
    }
}

export default new isDisplayNoneBlock()












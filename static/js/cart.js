
const countDom = document.querySelector('.cart__amount > span')
const priceDom = document.querySelector('.cart__price > span')
class Cart {
    count = 0;
    fullPrice = 0;
    items = [];
    setitems (item) {
        console.log(this.count)
        this.count += 1
        this.fullPrice += Number(item.price)
        this.items.push(item)
        countDom.innerText = this.count
        priceDom.innerText = this.fullPrice
        this.addElement(item)
    }
    deleteItem (item) {
        const indexItem = this.items.findIndex((itemE) => itemE.id === item.id)
        this.items.splice(indexItem, 1)
        this.count -= 1
        this.fullPrice -= Number(item.price)
        countDom.innerText = this.count
        priceDom.innerText = this.fullPrice
        localStorage.setItem('cart', JSON.stringify(this.items))
    }
    addElement(item) {
        const container = document.querySelector('.cart__items')
        const node = document.createElement('div')
        node.classList.add('cart__item')
        node.classList.add('flex')
        node.classList.add('flex-row')
        node.setAttribute('data-key', item.id)
        node.innerHTML = this.template(item)
        container.appendChild(node)
        node.querySelector('.cart__buttonclose-button').addEventListener('click', () => {
            node.remove()
            this.deleteItem(item)
        })
    }
    template(item) {
        return `
                    <div class="cart__itemimg">
                        <img class="cart__itemimg-pic" src="/static/${item.pic[0]}" alt="">
                    </div>
                    <div class="cart__itemtext flex flex-column">
                        <div class="cart__itemname">
                            ${item.itemname}
                        </div>
                        <div class="cart__itemprice">
                            ${item.price} руб.
                        </div>
                    </div>
                    <div class="cart__buttonclose">
                        <button class="cart__buttonclose-button">X</button>
                    </div>
                `
    }
    init() {

        let items = localStorage.getItem('cart')
        if (!items) return
        else items = JSON.parse(items)
        items.forEach((item) => {
            this.setitems(item)
        })

    }
    listeners() {
    }
}
const cart = new Cart()


cart.init()

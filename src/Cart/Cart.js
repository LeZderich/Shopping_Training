const EmptyCartException = require("./EmptyCartException");
const UpdateCartException = require("./UpdateCartException");
const CartItem = require("../CartItem/CartItem");
module.exports = class Cart{

    constructor(items){
        this._items = items;
    }

    get items(){
        this.checkCart();
        return this._items;
    }

    get total(){
        this.checkCart();
        return this._items.reduce((total, item) => total + item.total, 0);
    }

    count(distinct = false) {
        this.checkCart();
        if (distinct) {
            return this._items.length;
        } else {
            return this._items.reduce((count, item) => count + item.quantity, 0);
        }
    }

    add(items){
        if (items== null) throw new UpdateCartException();
        items.forEach(item => {
            if (item == null) throw new UpdateCartException();
        });
        if (this._items == null){
            this._items = [];
        }
        this._items = this._items.concat(items);
    }

    checkCart(){
        if (this._items === null){
            throw new EmptyCartException();
        }
    }
}
const Cart = require('../model/cart-model');
const pool = require('../util/database');

module.exports = class Products {

    constructor(id, title, imgUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
    }

    save() {

        return pool.execute('Insert into products_master (title,price,description,imgUrl) values(?,?,?,?)', [this.title, this.price, this.description, this.imgUrl])
    }

    static fetchAll() {
        return pool.execute('Select * from products_master')
    }

    static fetchProductDetails(id) {
        return pool.execute('Select * from products_master where id = ? ', [id])
    }


    static deleteProduct(id) {

    }
}
const express = require('express');
const app = express();
const parser = require('body-parser');

const viewRoute = require('./routes/shop-route');
const adminRoute = require('./routes/admin-route');
const path = require('path');
const mainPath = require('./util/path');
const errorController = require('./controllers/error-controller');
const sequelize = require('./util/database');
const Product = require('./model/product-model')
const User = require('./model/user-model');
const Cart = require('./model/cart-model');
const CartItem = require('./model/cart-item');
const Order = require('./model/order-model');
const OrderItem = require('./model/order-item-model');

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use((req, res, next) => {
    User.findByPk(1).then((user) => {
        console.log(user)
        req.user = user //stores seqelize obj not a normal js obj so we can executes all functions with it 
        next();
    }).catch(error => console.error(error))
})
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', viewRoute.routes);
app.use('/', adminRoute.routes);
// db.execute('Select * from products_master').then((result) => {
//     console.log(result)
// })
// db.


Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsToMany(Order, { through: OrderItem });

// { force: true }
sequelize.sync().then(() => {
    return User.findByPk(1)
}).then((result) => {
    if (!result) {
        return User.create({ name: 'Tushar', email: 'tushar@gmail.com' })
    }
    return result;
}).then((user) => {
    return user.createCart()
}).then(() => {
    app.listen(3001);
}).catch((error) => console.log(error))

app.use(errorController.get404)

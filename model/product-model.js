const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.STRING,
    imageUrl: Sequelize.STRING
});

module.exports = Product;

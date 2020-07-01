// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'book_shopee'

// })

const Sequelize = require('sequelize');

const sequelize = new Sequelize('book_shopee', 'root', '123456', { dialect: 'mysql', host: 'localhost' })


module.exports = sequelize;
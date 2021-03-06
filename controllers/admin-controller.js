const Product = require('../model/product-model');

exports.getAddProducts = (req, res, next) => {
    res.render('admin/edit-product', {
        docTitle: 'Add Product', path: '/add-product', editing: false
    })
}


exports.postAddProducts = (req, res, next) => {

    const product = new Product(null, req.body.title, req.body.imgUrl, req.body.description, req.body.price)
    let title = req.body.title
    let imageUrl = req.body.imgUrl
    let description = req.body.description
    let price = req.body.price

    req.user.createProduct({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl
    }).then((resp) => res.redirect('/admin-all-products')).catch(err => console.error(err));

}

exports.getEditProduct = (req, res, next) => {
    const edit = req.query.edit
    const id = req.params.productId
    //getProducts fn will be generated by sequelize get+ModelName
    // Product.findByPk(id)
    req.user.getProducts({ where: { id: id } }).then(product => {

        res.render('admin/edit-product', {
            docTitle: 'Add Product', path: '/edit-product',
            editing: edit,
            product: product[0]
        })
    });

}


exports.showAllAdminProducts = (req, res, next) => {

    //Product.findAll()
    req.user.getProducts().then((pro) => {
        res.render('admin/all-products', {
            docTitle: 'All Admin Products',
            path: '/admin-all-products',
            products: pro,
            isProductavailable: pro.length > 0,

        })
    })

    // const products = Product.fetchAll(pro => {

    // });
}


exports.postEditProductsDetails = (req, res, next) => {

    Product.findByPk(req.body.id).then(pro => {
        pro.title = req.body.title
        pro.imageUrl = req.body.imgUrl
        pro.price = req.body.price
        pro.description = req.body.description
        return pro.save();

    }).then(() => { res.redirect('/admin-all-products') })

}

exports.postdeleteProductsDetails = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId).then((pr) => {
        return pr.destroy()
    }).then(() => {
        res.redirect('/admin-all-products')
    })

}

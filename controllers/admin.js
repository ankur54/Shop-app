const Product = require('../models/products');

exports.getAddProducts = (req, res, next) => {
    const id = req.params.productId;
    const editing = req.query.edit;

    if(!editing) {
        res.render('admin/add-products', {
            pageTitle: 'Add Products',
            path: '/admin/add-product',
            editing: false
        });
    }
    else {
        Product.findProductById(id, product => {
            res.render('admin/add-products', {
                pageTitle: 'Edit Product',
                path: '/admin/add-product',
                editing: true,
                product
            })
        })
    }
}

exports.postAddProducts = (req, res, next) => {
    const prod = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    prod.save(null);
    res.redirect('/products');
}

exports.postEditProducts = (req, res, next) => {
    const prod = new Product(req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    prod.save(req.body.productId);
    res.redirect('/products');
}

exports.postDeleteProducts = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.deleteById(prodId);
    res.redirect('/products')
}

exports.adminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            products
        });
    });
}
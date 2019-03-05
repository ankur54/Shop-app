const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            path: '/',
            products
        });
    });
}

exports.getCart = (req, res, next) => {
    Cart.fetchCart(cart => {
        Product.fetchAll(product => {
            const cartProducts = [];
            
            for(let prod of product) {
                const cartProductData = cart.products.find(p => p.id === prod.id);
                if(cartProductData) 
                    cartProducts.push({ product: {...prod}, qty: cartProductData.qty });
            }

            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: cartProducts
            })
        })
    })
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    // console.log(productId);
    Product.findProductById(productId, product => {
        Cart.addProduct(productId, product.price);
        // console.log(product);
    });
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    Product.findProductById(productId, product => {
        Cart.deleteItemById(productId, product.price);
        // console.log(productId, product);
    });
    res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders',
        path: '/orders'
    })
}

exports.products = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            pageTitle: 'Shop',
            path: '/products',
            products
        });
    });
}

exports.productDetail = (req, res, next) => {
    const id = req.params.productId;
    Product.findProductById(id, product => {
        res.render('shop/product-details', {
            pageTitle: 'Product Details',
            path: '/product',
            product
        })
    })
}
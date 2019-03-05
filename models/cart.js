const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data',
    'cart.json'
);

const getFileContent = (cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err || !(JSON.parse(fileContent)).products) cb({ products: [], totalCost: 0 });  
        else cb(JSON.parse(fileContent));
    });
});

module.exports = class Cart {
    static addProduct(id, price) {
        // retrieve previous file content
        getFileContent(cart => {
            // check if current product is already present
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            // update cart
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalCost += +price;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        })
    }

    static deleteItemById(id, productPrice) {
        getFileContent(cart => {
            if(cart.products.length == 0) return;
            const product = cart.products.find(prod => prod.id === id);
            cart.totalCost -= productPrice * product.qty;
            const updatedProducts = cart.products.filter(prod => prod.id !== id);
            const updatedCart = { products: [...updatedProducts], totalCost: cart.totalCost };

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }

    static fetchCart(cb) {
        getFileContent(cart => {
            cb(cart);
        })
    }
}
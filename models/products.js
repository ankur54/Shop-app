const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const Cart = require('./cart')

const p = path.join(
    path.dirname(process.mainModule.filename), 
    'data',
    'products.json'
);

const getFileContent = (cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            cb([]);  
        } 
        else {
            cb(JSON.parse(fileContent));
         }
    });
})


module.exports = class Product{
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    
    save(id) {
        let updatedProduct;
        if(!id) {
            this.id = uniqid();
            getFileContent(product => {
                updatedProduct = [...product, this];
                fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                    console.log(err);
                })
            })
        }
        else {
            getFileContent(product => {
                this.id = id;
                const existingProductIndex = product.findIndex(prod => prod.id === id);
                updatedProduct = [...product];
                updatedProduct[existingProductIndex] = this;
                
                fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                    console.log(err);
                })
            })
        }
    }

    static fetchAll(cb) {
        getFileContent(cb);
    }

    static findProductById(id, cb) {
        getFileContent(product => {
            const prod = product.find(p => p.id === id);
            cb(prod);
        }) 
    }

    static deleteById(id) {
        getFileContent(products => {
            const product = products.find(p => p.id === id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(!err) 
                    Cart.deleteItemById(id, product.price);
                else console.log(err);
            })
        }) 
    }
}
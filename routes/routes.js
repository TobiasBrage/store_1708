const passwordHash = require('password-hash');
const productServ = require('../services/products');

// console.log(passwordHash.generate('admin'));

module.exports = function (app) {

    app.get('/', (req, res) => { // index
        res.render('pages/index');
     });

    app.get('/product/all', (req, res) => { // all products
       let sqlAllProd = `SELECT products.id,
        products.title, 
        products.description, 
        products.price, 
        products.created_unix as "unix", 
        products_category.category_name as "category",
        products_manufacturer.name as "manufacturer",
        products.image
        FROM products
        INNER JOIN products_category ON products.category_fk = products_category.id
        INNER JOIN products_manufacturer ON products.manufacturer_fk = products_manufacturer.id
        WHERE products.active = 1`;
        sqlAllProd += ` ORDER BY products.id DESC`;

        db.query(sqlAllProd, function (err, result) {
            res.send(result);
        })
    });

    app.get('/product/category/:categoryId', (req, res) => { // one product category
        let sqlCatProd = `SELECT products.title, 
        products.description, 
        products.price, 
        products.created_unix as "unix", 
        products_category.category_name as "category",
        products_manufacturer.name as "manufacturer",
        products.image
        FROM products
        INNER JOIN products_category ON products.category_fk = products_category.id
        INNER JOIN products_manufacturer ON products.manufacturer_fk = products_manufacturer.id
        WHERE products.active = 1 AND category_fk = ?;`;
        let categoryId = req.params.categoryId;

        db.query(sqlCatProd, [categoryId], function (err, result) {
            res.send(result);
        })
    });

    app.get('/category/all', (req, res) => { // all categories
        let sqlCatAll = `SELECT * FROM products_category;`;

        db.query(sqlCatAll, function (err, result) {
            res.send(result);
        })
    });

    app.get('/test', (req, res) => { // test services
        console.log(productServ.getAll());
        res.send('');
    });

    app.get('/src', (req, res) => { // get search
        let srcQ = req.query.q;
        let sqlSrc = `SELECT products.id,
        products.title, 
        products.description, 
        products.price, 
        products.created_unix as "unix", 
        products_category.category_name as "category",
        products_manufacturer.name as "manufacturer",
        products.image
        FROM products
        INNER JOIN products_category ON products.category_fk = products_category.id
        INNER JOIN products_manufacturer ON products.manufacturer_fk = products_manufacturer.id
        WHERE products.active = 1 AND title LIKE '%${srcQ}%';`;

        db.query(sqlSrc, function (err, result) {
            res.send(result);
        })
    });

};
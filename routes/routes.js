module.exports = function (app) {

    app.get('/', function (req, res) {
       let sql = `SELECT products.title,
        products.image, 
        products.description, 
        products.price, 
        products.created_unix as "unix", 
        products_category.category_name as "category",
        products_manufacturer.name as "manufacturer"
        FROM products
        INNER JOIN products_category ON products.category_fk = products_category.id
        INNER JOIN products_manufacturer ON products.manufacturer_fk = products_manufacturer.id
        WHERE products.active = 1;`;

        // let sqlDoubleRelation = `SELECT * FROM produkt
        // INNER JOIN produkt ON fk_produkt_id = produkt_id
        // INNER JOIN billede ON fk_billede_id = billede_id;`;
    
        db.query(sql, function (err, result) {
            console.log(result);
            res.send(result);
        })
    });

};
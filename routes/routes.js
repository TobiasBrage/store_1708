module.exports = function (app) {

    app.get('/', function (req, res) {
        let sql = `SELECT products.title, 
        products.image, 
        products.description, 
        products.price, 
        products.created_unix as "unix", 
        products_category.category_name as "category"
        FROM products_category
        INNER JOIN products ON products_category.id = products.category_fk WHERE products.active = 1;`;

        // let sqlDoubleRelation = `SELECT * FROM produkt_og_billede
        // INNER JOIN produkt ON fk_produkt_id = produkt_id
        // INNER JOIN billede ON fk_billede_id = billede_id;`;
    
        db.query(sql, function (err, result) {
            res.send(result);
        })
    });

};
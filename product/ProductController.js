var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require(__root + 'auth/VerifyToken');
var getNextSequenceValue = require(__root + 'common/Utilities');

router.use(bodyParser.urlencoded({ extended: true }));
var Product = require('./Product');

// CREATES A NEW Product
router.post('/', VerifyToken, async function (req, res) {
    var id = await getNextSequenceValue("productid")
    Product.create({
            _id : id,
            name : req.body.name,
            Description : req.body.Description,
            UnitPrice : req.body.UnitPrice,
            Quantity : req.body.Quantity
        }, 
        function (err, Product) {
            if (err) return res.status(500).send("There was a problem adding the information to the database. Id: " + id);
            res.status(200).send(Product);
        });
});

// RETURNS ALL THE ProductS IN THE DATABASE
router.get('/', VerifyToken, function (req, res) {
    Product.find({}, function (err, Products) {
        if (err) return res.status(500).send("There was a problem finding the Products.");
        res.status(200).send(Products);
    });
});

// GETS A SINGLE Product FROM THE DATABASE
router.get('/:id', VerifyToken, function (req, res) {
    Product.findById(req.params.id, function (err, Product) {
        if (err) return res.status(500).send("There was a problem finding the Product.");
        if (!Product) return res.status(404).send("No Product found.");
        res.status(200).send(Product);
    });
});

// DELETES A Product FROM THE DATABASE
router.delete('/:id', VerifyToken, function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, Product) {
        if (err) return res.status(500).send("There was a problem deleting the Product.");
        res.status(200).send("Product: "+ Product.name +" was deleted.");
    });
});

// UPDATES A SINGLE Product IN THE DATABASE
router.put('/:id', VerifyToken, function (req, res) {
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, Product) {
        if (err) return res.status(500).send("There was a problem updating the Product.");
        res.status(200).send(Product);
    });
});


module.exports = router;
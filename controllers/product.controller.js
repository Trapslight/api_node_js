const Product = require('../class/product');

exports.create = (req,res) => {
    var product = new Product(req.body);
    product.save((err) => {
        req.app.io.emit('data', product);
        if(err) res.status(400).send({error: err});
        else res.status(201).send(product);
    });
};

exports.findAll = (req,res) => {
    Product.find({}, (error, results) => {res.json(results)}).catch(err =>{
        res.status(500).send({message : "Error while retrieving products."});
    });
    res.status(200);
}

exports.findOne = (req,res) => {
    Product.findOne({ id: req.params.id })
    .then(product => { res.send(product) })
    .catch(err => { res.status(404).send(err) })
}

exports.update = (req, res) => {

    Product.findOneAndUpdate({ id: req.params.id },
        { name: req.body.name, type: req.body.type, price: req.body.price },
        { upset: true }).then(product => {
        if(!product){return res.status(404).send({message: "Product not found with id " + req.params.id});}
        res.send(product);
        }).catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).send({message: "Product not found with id " + req.params.id})
            }
            return res.status(500).send({message: "Error updating product with id " + req.params.id });
        });
};

exports.delete = (req, res) => {

    Product.findOneAndDelete({ id: req.params.id }).exec()
    .then((counter) => res.status(200).send({ message: "Product with id '"+ req.params.id +"' deleted"}))
    .catch((err) => { res.status(404).send({ message: "Delete : product not found with id "+ req.params.id}) });
};
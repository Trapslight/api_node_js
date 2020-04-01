const Order = require('../class/order');

exports.create = (req,res) => {
    var order = new Order(req.body);
    order.save((err) => {
        if(err) res.status(400).send({error: err});
        else res.status(201).send(order);
    });
};

exports.findAll = (req,res) => {
    Order.find({}, (error, results) => {res.json(results)}).catch(err =>{
        res.status(500).send({message : "Error while retrieving orders."});
    });
    res.status(200);
}

exports.findOne = (req,res) => {
    Order.findOne({ id: req.params.id })
    .then(order => { res.send(order) })
    .catch(err => { res.status(404).send(err) })
}

exports.update = (req, res) => {

    Order.findOneAndUpdate({ id: req.params.id },
        { name_order: req.body.name_order || "Unnamed order", price_order: req.body.price_order,
        ship_address: req.body.ship_address, billing_address: req.body.billing_address },
        { upset: true }).then(order => {
            if(!order){return res.status(404).send({message: "Order not found with id " + req.params.id});}
            res.send(order);
        }).catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).send({message: "Order not found with id " + req.params.id})
            }
            return res.status(500).send({message: "Error updating order with id " + req.params.id });
        });
};

exports.delete = (req, res) => {

    Order.findOneAndDelete({ id: req.params.id }).exec()
    .then((counter) => res.status(200).send({ message: "Order with id '"+ req.params.id +"' deleted"}))
    .catch(err => { res.status(404).send({ message: "Delete: order not found with id "+ req.params.id})})
}
const User = require('../class/user');

exports.create = (req,res) => {
    var user = new User(req.body);
    user.save((err) => {
        req.app.io.emit('data', user);
        if(err) res.status(400).send({message: "User content can not be empty."});
        else res.status(201).send(user);
    });
};

exports.findAll = (req,res) => {
    User.find({}, (error, results) => {res.json(results)}).catch(err =>{
        res.status(500).send({message : "Error while retrieving users."});
    });
    res.status(200);
}

exports.findOne = (req,res) => {
    User.findOne({ id: req.params.id })
    .then(user => { res.send(user) })
    .catch(err => { res.status(404).send(err) })
}

exports.update = (req, res) => {

    User.findOneAndUpdate({ id: req.params.id },
    { name: req.body.name || "Unnamed User", firstname: req.body.firstname, email: req.body.email, password: req.body.password },
    {upsert : true}).then(user => {
        if(!user){ return res.status(404).send({message: "User not found with id " + req.params.id}) }
            res.send(user);
        }).catch(err => {
            if(err.kind === "ObjectId") {
                return res.status(404).send({message: "User not found with id " + req.params.id})
            }
            return res.status(500).send({message: "Error updating user with id " + req.params.id });
        });
};

exports.delete = (req, res) => {
    User.findOneAndDelete({ id: req.params.id }).exec()
    .then((counter) => res.status(200).send({ message: "User with id '"+ req.params.id +"' deleted"}))
    .catch((err) => { res.status(404).send({ message: "Delete : user not found with id "+ req.params.id}) });
}
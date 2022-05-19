const User = require('../models/User');

exports.create = (req, res) => {
    const user = new User(req.body)
    user.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "Something went wrong"
            })
        }
        res.json({data});
    })
}

exports.list = (req, res) => {
    User.find().exec((err, data) => { 
        if (err) {
            return res.status(400).json({
                error: "Something went wrong"
            })
        }
        res.json({data});
    })
}
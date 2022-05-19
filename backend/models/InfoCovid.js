const mongoose = require('mongoose');

const covidSchema = new mongoose.Schema(
    {
        ultimaDosis: {
            type: Date,
            require: true
        },
        
        cantDosis: {
            type: Number,
            require: true
        }
    }
)

module.exports = mongoose.model("InfoCovid", covidSchema);
const mongoose = require('mongoose');

const gripeSchema = new mongoose.Schema(
    {
        ultimaDosis: {
            type: Date,
            require: true
        }
    }
)

module.exports = mongoose.model("InfoGripe", gripeSchema);
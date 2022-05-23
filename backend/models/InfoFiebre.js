const mongoose = require('mongoose')

const fiebreSchema = new mongoose.Schema({
  ultimaDosis: {
    type: Date,
    require: true,
  },
})

module.exports = mongoose.model('InfoFiebre', fiebreSchema)

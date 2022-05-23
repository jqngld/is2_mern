const mongoose = require('mongoose')
const Usuario = require('./Usuario')

const turnoSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  // aca no sería ref a una vacuna?
  vax: {
    type: String,
    required: true,
  },
  patient: {
    type: Usuario,
    required: true,
  },
})

module.exports = mongoose.model('Turno', turnoSchema)

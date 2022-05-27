const mongoose = require('mongoose');

const historiaSchema = new mongoose.Schema(
    {
        ultimaDosisCovid: {
            type: Date,
            require: false
        },
        cantidadDosisCovid: {
            type: Number,
            require: false
        },
        ultimaDosisFiebre: {
            type: Date,
            require: false,
          },
        ultimaDosisGripe: {
            type: Date,
            require: false,
          }
    }
)

module.exports = mongoose.model("HistoriaClinica", historiaSchema);
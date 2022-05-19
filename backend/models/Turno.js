const mongoose = require('mongoose');
const User = require('./User');

const turnoSchema = new mongoose.Schema(
    {
        date: {
            type: Date,
            required: true
        },
        vax: {
            type: String,
            required: true
        },
        patient: {
            type: User,
            required: true
        }
    }
)

module.exports = mongoose.model("Turno", turnoSchema);
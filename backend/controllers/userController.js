const Usuario = require('../models/Usuario.js')

exports.create = (req, res) => {
  const user = new Usuario(req.body)
  user.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: 'Something went wrong',
      })
    }
    res.json({ data })
  })
}

const getPerfil = async (req, res = response) => {

  var user = req.url.split('/')[1]
  console.log(user)

  // let info = await Usuario.findById(ObjectId(user)).exec()
  let info2 = await Usuario.findOne({ _id: user })
  console.log(info2.email)
  let fechita = info2.date
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let fechaza = fechita.toLocaleString('es-SP', options)
  // console.log(info)
  res.json({
    email: info2.email,
    name: info2.name,
    lastname: info2.lastname,
    dni: info2.dni,
    tel: info2.tel,
    date: fechaza,
    age: info2.age,
  })
}

module.exports = {
  getPerfil
}

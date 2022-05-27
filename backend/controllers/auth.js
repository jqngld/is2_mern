const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')
const { isObjectIdOrHexString } = require('mongoose')
// const mongoose = require('mongoose')
// const Excercise = require('../models/Excercise')

const crearUsuario = async (req, res = response) => {
  const { name, lastname, dni, email, date, password } = req.body

  if (name.trim() == '' || lastname.trim() == '') {
    return res.status(400).json({
      ok: false,
      msg: 'El nombre o apellido deben contener caracteres',
    })
  }

  try {
    let usuario = await Usuario.findOne({ email })

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese email',
      })
    }

    let dni2 = await Usuario.findOne({ dni })

    if (dni2) {
      return res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con el mismo DNI',
      })
    }

    // registrar usuario con is_admin en false
    req.body.is_admin = false
    req.body.turnos = []
    req.body.historiaClinica = undefined
    
    function getAge(_date) {
        var today = new Date();
        var birthDate = new Date(_date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function getRiesgo(age) {
      if (age > 60)
        return true;
      return false;
  }

    let edad = getAge(req.body.date)

    const usernuevo = new Usuario({
      email: req.body.email,
      name: req.body.name,
      dni: req.body.dni,
      lastname: req.body.lastname,
      tel: req.body.tel,
      date: req.body.date,
      age: edad,
      riesgo: getRiesgo(edad),
      turnos: [],
      historiaClinica: null
    })

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usernuevo.password = bcrypt.hashSync(req.body.password, salt)

    await usernuevo.save()

    // Generar JWT
    const token = await generarJWT(usernuevo.id, usernuevo.name)

    res.status(201).json({
      ok: true,
      uid: usernuevo.id,
      name: usernuevo.name,
      is_admin: usernuevo.is_admin,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email',
      })
    }

    console.log(usuario)

    console.log(usuario['password'])

    console.log(usuario['email'])
    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario['password'])

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto',
      })
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name)

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      is_admin: usuario.is_admin,
      token,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    })
  }
}

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req

  // Generar JWT
  const token = await generarJWT(uid, name)
  try {
    let usuario = await Usuario.findById(uid).exec()
    res.json({
      ok: true,
      uid: uid,
      name: name,
      is_professor: usuario.is_professor,
      token,
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
}

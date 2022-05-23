const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')
const { generarJWT } = require('../helpers/jwt')
// const mongoose = require('mongoose')
// const Excercise = require('../models/Excercise')

const crearUsuario = async (req, res = response) => {
  const { name, lastname, dni, email, password } = req.body

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
    usuario = new Usuario(req.body)

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync()
    usuario.password = bcrypt.hashSync(req.body.password, salt)

    await usuario.save()

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name)

    res.status(201).json({
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

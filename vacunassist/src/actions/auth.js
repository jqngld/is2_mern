import { fetchSinToken, fetchConToken } from '../helpers/fetch'
import { types } from '../types/types'
import Swal from 'sweetalert2'
import { eventLogout } from './events'

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken('auth', { email, password }, 'POST')
    const body = await resp.json()
    if (body.ok) {
      const token_back = body.token.slice(0, 4)
      console.log(token_back)

      const { value: token } = await Swal.fire({
        title: `Token de acceso: ${token_back}`,
        input: 'text',
        inputPlaceholder: 'Ingresar token de acceso',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value === body['token'].slice(0, 4)) {
              resolve()
            } else {
              resolve(`Debes ingresar: ${token_back}`)
            }
          })
        },
      })
      if (token) {
        Swal.fire('', 'Acceso exitoso', 'success')
        localStorage.setItem('token', body.token)
        localStorage.setItem('token-init-date', new Date().getTime())
        dispatch(
          login({
            uid: body.uid,
            name: body.name,
            is_admin: body.is_admin,
            historia_clinica: body.historia_clinica,
            turnos: body.turnos,
          })
        )
      }
    } else {
      const { msg } = body

      if (msg !== undefined) {
        Swal.fire('Error', msg, 'error')
      } else {
        const { errors } = body
        let msg2 = ''
        errors &&
          Object.values(errors).map((element, index) => {
            msg2 = msg2 + '</br>' + element.msg
          })

        Swal.fire('Error', msg2, 'error')
      }
    }
  }
}

export const startRegister = (
  email,
  password,
  name,
  lastname,
  dni,
  tel,
  date
) => {
  return async (dispatch) => {
    console.log(email, password, name, lastname, dni, tel, date)
    const resp = await fetchSinToken(
      'auth/new',
      {
        email,
        password,
        name,
        lastname,
        dni,
        tel,
        date,
      },
      'POST'
    )

    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())

      //  dispatch(
      //    login({
      //      uid: body.uid,
      //      name: body.name,
      //      is_admin: body.is_admin,
      //    })
      //  )
      // aca deberia redirigir al login sin entrar de una pero bueno esto no lo logra

      Swal.fire({
        title: 'Registro exitoso!',
        text: '',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#70f1ff',
        confirmButtonText: 'OK',
        cancelButtonText: 'Back',
      }).then(
        function (isConfirm) {
          if (isConfirm) {
            console.log('CONFIRMED')
            window.location.href = `${process.env.REACT_APP_URL}login`
          }
        },
        function () {
          console.log('BACK')
        }
      )
    } else {
      const { msg } = body

      if (msg !== undefined) {
        Swal.fire('Error', msg, 'error')
      } else {
        const { errors } = body
        let msg2 = ''
        errors &&
          Object.values(errors).map((element, index) => {
            msg2 = msg2 + '</br>' + element.msg
          })

        Swal.fire('Error', msg2, 'error')
      }
    }
  }
}

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken('auth/renew')

    const body = await resp.json()

    if (body.ok) {
      localStorage.setItem('token', body.token)
      localStorage.setItem('token-init-date', new Date().getTime())
      //   aca podriamos preguntar si es admin para hacer un dispatch distinto

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
          is_admin: body.is_admin,
          historia_clinica: body.historia_clinica,
          turnos: body.turnos,
          // agregar esto al login back
        })
      )
    } else {
      dispatch(checkingFinish())
    }
  }
}

const checkingFinish = () => ({ type: types.authCheckingFinish })

const login = (user) => ({
  type: types.authLogin,
  payload: user,
})

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(eventLogout())
    dispatch(logout())
  }
}

const logout = () => ({ type: types.authLogout })

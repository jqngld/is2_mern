import { React, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { startLogin } from '../../actions/auth'
import Swal from 'sweetalert2'

export const Login = () => {
  const dispatch = useDispatch()

  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: '',
  })
  const [error, setError] = useState('')

  const { lEmail, lPassword } = formLoginValues
  const isInvalid = lPassword === '' || lEmail === ''

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLogin(lEmail, lPassword))
  }

  useEffect(() => {
    document.title = 'Index - Workout'
  }, [])

  return (
    <div className='max-h-screen overflow-hidden'>
      <div className='justify-start flex p-8'>
        <img className='w-2/3 sm:w-3/12 ' src='https://i.ibb.co/FYdLf8n/Sin-t-tulo-1.png' alt='' />
      </div>

      <div className='  flex justify-center max-s-screen'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col items-center'>
          <div
            className='container mx-auto max-w-screen-lg h-full'
            // ref={headerRef}
          >
            <div className='flex justify-between h-full items-end'>
              {/* logo */}

              <div className='pl-4 text-gray-700 text-center flex items-center cursor-pointer'>
                <h1 className='flex w-full text-5xl semititle'>¡Hola!</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='h-full'>
        <div className='flex flex-col items-center m-4 p-4 justify-center mb-4 rounded h-full'>
          {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

          <form
            className='w-full sm:w-1/2'
            onSubmit={handleLogin}
            method='POST'
          >
            <span className='text-white font-bold text-xl flex-start flex  pl-2'>
              Email
            </span>
            <input
              type='text'
              placeholder='Correo'
              name='lEmail'
              className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
              value={lEmail}
              onChange={handleLoginInputChange}
            />
            <span className='text-white font-bold text-xl flex-start flex  pl-2'>
              Contraseña
            </span>
            <input
              type='password'
              placeholder='Contraseña'
              name='lPassword'
              className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
              value={lPassword}
              onChange={handleLoginInputChange}
            />
            <div className='flex'>
              <div className='w-1/2 mr-2'>
                <Link to='/'>
                  <button
                    type='button'
                    className={`text-white w-full rounded h-8 font-bold boton-activo
                  `}
                  >
                    Atrás
                  </button>
                </Link>
              </div>
              <div className='w-1/2 ml-2'>
                <button
                  disabled={isInvalid}
                  type='submit'
                  value='Login'
                  className={`text-white w-full rounded h-8 font-bold boton-activo
  ${isInvalid && 'opacity-50 boton-inactivo'}`}
                >
                  Acceder
                </button>
              </div>
            </div>
          </form>
          <div className='flex justify-center items-center flex-col w-full m-4 p-4 text-white'>
            <p className='text-sm'>
              No tenés una cuenta?
              {` `}
              <Link to='/signup'>
                <span className='font-bold text-blue-medium'>Regístrate</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

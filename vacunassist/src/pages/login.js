import React from 'react'
import { useState, useContext, useEffect } from 'react'

import { Link, useHistory } from 'react-router-dom'
import * as ROUTES from './../constants/routes'

const Login = () => {
  const history = useHistory()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const isInvalid = password === '' || emailAddress === ''

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      // await firebase.auth().signInWithEmailAndPassword(emailAddress, password) await user response
      console.log('logueo')
      history.push(ROUTES.DASHBOARD)
    } catch (error) {
      setEmailAddress('')
      setPassword('')
      setError(error.message)
      // console.log(error);
    }
  }
  useEffect(() => {
    document.title = 'Login - Workout'
  }, [])

  return (
    <>
      <div className='max-h-screenfondo1'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col items-center'>
          <div
            className='container mx-auto max-w-screen-lg h-full'
            // ref={headerRef}
          >
            <div className='flex justify-between h-full items-end'>
              {/* logo */}

              <div className='pl-4 text-gray-700 text-center flex items-center cursor-pointer'>
                <Link to={ROUTES.MAIN} aria-label='Workout logo'>
                  <h1 className='flex w-full'>
                    <img
                      style={{ width: ' 250px' }}
                      src='images/Logo.svg'
                      alt='Rujan'
                      className='mt-2 w-full'
                    />
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='p-16  flex justify-center max-s-screen'>
          <div className='container mx-auto flex flex-wrap p-5 flex-col items-center'>
            <div
              className='container mx-auto max-w-screen-lg h-full'
              // ref={headerRef}
            >
              <div className='flex justify-between h-full items-end'>
                {/* logo */}

                <div className='pl-4 text-gray-700 text-center flex items-center cursor-pointer'>
                  <h1 className='flex w-full text-6xl semititle'>¡Hola!</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='h-full'>
          <div className='flex flex-col items-center m-4 p-4  mb-4 rounded h-full'>
            {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

            <form onSubmit={handleLogin} method='POST'>
              <input
                aria-label='Enter your email address'
                type='text'
                placeholder='Email address'
                className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
                onChange={({ target }) => setEmailAddress(target.value)}
                value={emailAddress}
              />
              <input
                aria-label='Enter your password'
                type='password'
                placeholder='Password'
                className='text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded m-2'
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
              <div className='flex'>
                <button
                  disabled={isInvalid}
                  type='submit'
                  className={`text-white w-full rounded h-8 font-bold boton-activo
                `}
                >
                  Atrás
                </button>
                <button
                  disabled={isInvalid}
                  type='submit'
                  className={`text-white w-full rounded h-8 font-bold boton-activo
                ${isInvalid && 'opacity-50 boton-inactivo'}`}
                >
                  Acceder
                </button>
              </div>
            </form>
            <div className='flex justify-center items-center flex-col w-full m-4 p-4 text-white'>
              <p className='text-sm'>
                No tenés una cuenta?
                {` `}
                <Link
                  to={ROUTES.SIGN_UP}
                  className='font-bold text-blue-medium'
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as ROUTES from '../constants/routes'

const Main = () => {
  return (
    <>
      <div className='max-h-screen'>
        <div className='p-16 mt-32 flex justify-center max-s-screen'>
          <img className='w-2/3 sm:w-1/3' src='images/Logo.svg' alt='' />
        </div>

        <div className='p-16 m-16 flex justify-center'>
          <button
            className='boton-activo w-full block sm:inline text-center sm:w-auto bg-spotify text-white rounded-lg px-4 py-3 text-xs md:text-sm hover:shadow-md hover:boton-activo transition-all duration-300 uppercase tracking-widest '
            // href={loginURL}
          >
            <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
              Ingresá{' '}
            </Link>
          </button>
          <button
            className='transform motion-safe:hover:scale-110 hover:boton-activo transition-all duration-300 boton-activo w-full block sm:inline text-center sm:w-auto bg-spotify text-white rounded-lg px-4 py-3 text-xs md:text-sm hover:shadow-md transition-all duration-300 uppercase tracking-widest '
            // href={loginURL}
          >
            <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>
              Creá tu cuenta
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Main

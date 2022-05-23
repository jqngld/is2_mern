import { React } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export const IndexAuth = () => {
  const dispatch = useDispatch()

  return (
    <div className='max-h-screen '>
      <div className='p-16  flex justify-center justify-center max-s-screen'>
        <img className='w-2/3 sm:w-3/12 ' src='images/Logo.svg' alt='' />
      </div>

      <div className='p-16 m-16 flex justify-center'>
          <Link to='/login'>
        <button className='boton-activo w-full block sm:inline text-center sm:w-auto bg-spotify text-white rounded-lg px-4 py-3 text-xs md:text-sm hover:shadow-md hover:boton-activo transition-all duration-300 uppercase tracking-widest '>
            <div className='font-bold text-blue-medium'>Ingresá </div>
        </button>
          </Link>
          <Link to='/signup'>
        <button className='transform motion-safe:hover:scale-110 hover:boton-activo transition-all duration-300 boton-activo w-full block sm:inline text-center sm:w-auto bg-spotify text-white rounded-lg px-4 py-3 text-xs md:text-sm hover:shadow-md transition-all duration-300 uppercase tracking-widest '>
            <div className='font-bold text-blue-medium'>Creá tu cuenta</div>
        </button>
          </Link>
      </div>
    </div>
  )
}

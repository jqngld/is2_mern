import { React } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'react-redux'
const Dropdown2 = ({ isOpen, toggle, rol, usuario }) => {
  let store = useStore().getState()
  let id = store.auth.uid
  return (
    <div
      className={
        isOpen
          ? `grid grid-rows-1 nowrap absolute flex items-center right-4 w-60 top-8 bg-gray-800 `
          : 'hidden'
      }
      onClick={toggle}
    >
      {/* <Link className='p-4' to='/brand'>
        SOY MARCA
      </Link>
      <Link className='p-4' to='/influencer'>
        SOY INFLUENCER
      </Link> */}
      <span className='p-4 text-white'>
        {' '}
        {rol ? 'Profesor: ' : 'Alumno: '}
        {usuario}
      </span>

      <Link className='p-4 text-white' to={`/account/${id}`}>
        Mi Cuenta
      </Link>

      {/* <Link className='p-4' to='/agency'>
        AGENCIA
      </Link>
      <Link className='p-4' to='/shopstreaming'>
        SHOPSTREAMING
      </Link>
      <Link className='p-4' to='/about'>
        QUIENES SOMOS
      </Link> */}
    </div>
  )
}

export default Dropdown2

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth'
import Dropdown2 from './Dropdown'

export const Navbar = () => {
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)
  // const [isColor, setColor] = useState('black')
  const toggle = () => {
    setIsOpen(!isOpen)
  }
  const auth = useSelector((state) => state.auth)
  const { name, is_professor } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <div onClick={toggle} className='absolute flex items-center right-4'>
      <span onClick={toggle} className='navbar-brand text-white p-8'>
        {is_professor ? 'Profesor: ' : 'Alumno: '}
      </span>
      <span
        onClick={toggle}
        className='navbar-brand text-white p-8 whitespace-nowrap'
      >
        ↴ {name}
      </span>

      <button
        className='text-white w-full rounded h-8 font-bold boton-danger'
        onClick={handleLogout}
      >
        <i className='fas fa-sign-out-alt'></i>
        <span className='m-2 p-2'> Salir</span>
      </button>
      <div className='relative'>
        <Dropdown2
          rol={is_professor}
          usuario={name}
          isOpen={isOpen}
          toggle={toggle}
        />
      </div>
    </div>
  )
}

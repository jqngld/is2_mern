import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { startLogout } from '../../actions/auth'
import Dropdown2 from './Dropdown'
import axios from 'axios'

export const Navbar = () => {
  const dispatch = useDispatch()

  let store = useStore().getState()
  let id = store.auth.uid

  const [isOpen, setIsOpen] = useState(false)
  // const [isColor, setColor] = useState('black')
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  const auth = useSelector((state) => state.auth)
  const { name, is_vacunador } = useSelector((state) => state.auth)

  const [perfil, setPerfil] = useState({})

  // useEffect(() => {
  //   axios.get('http://localhost:4000/api/user/' + id).then((res) => {
  //     console.log(res.data)
  //     setPerfil(res.data)
  //   })
  // }, [])

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <div onClick={toggle} className='absolute flex items-center right-4'>
      {/* <span onClick={toggle} className='navbar-brand text-white p-8'>
        {perfil.is_vacunador ? 'Vacunador: ' : 'Paciente: '}
      </span>
      <span
        onClick={toggle}
        className='navbar-brand text-white p-8 whitespace-nowrap'
      >
         {name}
      </span> */}

      <button
        className='text-white w-full rounded h-8 font-bold boton-danger'
        onClick={handleLogout}
      >
        <i className='fas fa-sign-out-alt'></i>
        <span className='m-2 p-2'> Salir</span>
      </button>
      {/* <div className='relative'>
        <Dropdown2
          rol={perfil.is_vacunador}
          usuario={name}
          isOpen={isOpen}
          toggle={toggle}
        />
      </div> */}
    </div>
  )
}

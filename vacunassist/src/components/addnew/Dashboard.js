import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../ui/Navbar'
import { useDispatch, useSelector, useStore } from 'react-redux'
import axios from 'axios'
import { loadInfo } from '../../actions/info'
import { loadGeneral } from '../../actions/general'
import Sidebar from '../ui/Sidebar'
import Sidebar22 from '../ui/SidebarVac'
import '../../App.css'

export const Dashboard = () => {
  const dispatch = useDispatch()

  let store = useStore().getState()
  let id = store.auth.uid

  const [perfil, setPerfil] = useState({})

  useEffect(() => {
    axios.get('http://localhost:4000/api/user/' + id).then((res) => {
      console.log(res.data)
      setPerfil(res.data)
    })
  }, [])

  // useEffect(() => {
  //   dispatch(loadGeneral())
  // }, [dispatch])

  // useEffect(() => {
  //   dispatch(loadInfo())
  // }, [dispatch])

  return (
    <div className='rowC'> 
    <> { perfil.is_vacunador ? <Sidebar22/> : <Sidebar/>} </>
        <div className='w-full center'><Link to='/home' aria-label='Workout logo'><h1 className=''>
          <img
            style={{ width: ' 250px' }}
            src='https://i.ibb.co/FYdLf8n/Sin-t-tulo-1.png'
            alt=''
            className='mt-2 w-full'
          />
        </h1>
      </Link>
      <h1 className='items-center text-white mt-16 justify-center'>
        Bienvenid@ al sistema de turnos online de VACUNASSIST {console.log(perfil.is_vacunador)}
      </h1></div>
    </div>
  )
}

export default Dashboard
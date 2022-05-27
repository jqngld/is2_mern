import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../ui/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { loadInfo } from '../../actions/info'
import { loadGeneral } from '../../actions/general'

export const Dashboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadGeneral())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadInfo())
  }, [dispatch])

  return (
    <div className='min-h-full w-full'>
      <Link to='/home' aria-label='Workout logo'>
        <h1 className='flex w-full justify-center'>
          <img
            style={{ width: ' 250px' }}
            src='https://i.ibb.co/FYdLf8n/Sin-t-tulo-1.png'
            alt=''
            className='mt-2 w-full'
          />
        </h1>
      </Link>

      <h1 className='flex w-full items-center text-white mt-16 justify-center'>
        Bienvenid@ al sistema de turnos online de VACUNASSIST
      </h1>
    </div>
  )
}

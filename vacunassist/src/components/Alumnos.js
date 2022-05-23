import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { loadGeneral } from '../actions/general'

export const Alumnos = () => {
  const dispatch = useDispatch()

  const store = useStore().getState()

  const quitarAlumno = (id) => {
    console.log(id)
  }

  useEffect(() => {
    dispatch(loadGeneral())
  }, [dispatch])

  const [elstore, setElstore] = useState(undefined)
  useEffect(() => {
    console.log('cargando')
    if (store.general == undefined) {
      dispatch(loadGeneral())
    }
    setElstore(store)
    console.log(elstore)
  }, [elstore])

  return (
    <div className='min-h-full w-full'>
      <Link to='/addnew' aria-label='Workout logo'>
        <h1 className='flex w-full justify-center'>
          <img
            style={{ width: ' 250px' }}
            src='../images/Logo.svg'
            alt='Rujan'
            className='mt-2 w-full'
          />
        </h1>
      </Link>

      <div className='mx-8 text-white p-8'>
        <h1 className='flex w-full flex-start items-center text-white mt-16 justify-start font-bold'>
          Tus alumnos:
        </h1>

        {store.info.info.alumnos !== undefined ? (
          <div>
            {Object.values(store.info.info.alumnos).map((value, index) => {
              return (
                <>
                  <>
                    <hr />
                    <div className='flex p-4 w-full'>
                      <Link
                        className='flex p-4 w-9/12'
                        to={`/account/${value._id}`}
                      >
                        <span>
                          <div className='w-1/3'>{value.username}</div>

                          <div className='w-1/3'> {value.email}</div>

                          <div className='w-1/3'> {value.name}</div>
                        </span>
                      </Link>
                      <button
                        className='w-3/12'
                        onClick={() => quitarAlumno(value._id)}
                      >
                        DESASIGNARME
                      </button>
                    </div>
                  </>
                  <hr />
                </>
              )
            })}
          </div>
        ) : (
          <div>Cargando...</div>
        )}
      </div>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../ui/Navbar'
import { useStore } from 'react-redux'

export const Alumno = () => {
  const store = useStore().getState()
  console.log(store.info)

  const agregarAlumno = (id) => {
    console.log(id)
  }
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
          Alumnos sin profesor:
        </h1>

        {store.general !== undefined ? (
          <div>
            {Object.values(store.general.info.alumnos).map((value, index) => {
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
                        onClick={() => agregarAlumno(value._id)}
                      >
                        ASIGNARME
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

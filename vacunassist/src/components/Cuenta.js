import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadUser } from '../actions/user'

import { useDispatch, useStore, useSelector } from 'react-redux'
import InfoAlumno from './account/InfoAlumno'
import { EditarCuenta } from './account/EditarCuenta'
import InfoCuenta from './account/InfoCuenta'

export const Cuenta = () => {
  const dispatch = useDispatch()
  let store = useStore().getState()

  const [alumno, setAlumno] = useState(true)
  let { uid } = store.auth
  const [editar, setEditar] = useState(false)

  const check = () => {
    console.log(account)
    if (account[0] !== undefined) {
      sethayCuenta(true)

      console.log('si')

      if (account[0]._id === uid) {
        console.log('sisi')
        setEditar(true)
      } else {
        console.log('nono')
        setEditar(false)
      }
    } else {
      sethayCuenta(false)
      console.log('no')
    }
  }
  const { account } = useSelector((state) => state.account)

  const [ok, setOk] = useState(false)
  const [hayCuenta, sethayCuenta] = useState(false)
  const [algo, setAlgo] = useState(false)
  let id = store.location.location.split('/')[2]

  useEffect(() => {
    dispatch(loadUser(id))
    // console.log(account)
  }, [dispatch])

  useEffect(() => {
    check()
  }, [account])
  return (
    <>
      <div className='min-h-full w-full overflow-auto'>
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

        <div onClick={() => setAlgo(true)} className=' text-white p-8'>
          {uid == id ? (
            <h1 className='flex w-full flex-start items-center text-white mt-16 justify-start font-bold'>
              Datos de tu cuenta
            </h1>
          ) : hayCuenta ? (
            <h1 className='flex w-full flex-start items-center text-white mt-16 justify-start font-bold'>
              Datos de la cuenta de {account[0].name}
            </h1>
          ) : (
            <h1 className='flex w-full flex-start items-center text-white mt-16 justify-start font-bold'>
              No existe una cuenta con el ID
            </h1>
          )}
        </div>
        {hayCuenta && (
          <div className=' text-white p-8'>
            {editar ? (
              <EditarCuenta cuenta={account[0]}></EditarCuenta>
            ) : alumno ? (
              <div>
                <InfoAlumno cuenta={account[0]}></InfoAlumno>
              </div>
            ) : (
              <div>
                <InfoCuenta cuenta={account[0]}></InfoCuenta>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { startChecking } from '../actions/auth'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { IndexAuth } from '../components/auth/Index'
import { Addnew } from '../components/addnew/Addnew'
import CreateHistoria from '../components/addnew/CreateHistoria'
import Turnos from '../components/account/Turnos'
import MisTurnos from '../components/account/MisTurnos'
import InfoPersonal from '../components/account/InfoPersonal'
import { Dashboard } from '../components/addnew/Dashboard'
import { Alumno } from '../components/addnew/Alumno'

import { Navbar } from '../components/ui/Navbar'
import { Sidebar } from '../components/ui/Sidebar'
import { Login } from '../components/auth/Login'
import { Signup } from '../components/auth/Signup'

import { Alumnos } from '../components/Alumnos'
import { Cuenta } from '../components/Cuenta'
import { FormRutine } from '../components/addnew/FormRutine'

export const AppRouter = (history) => {
  const dispatch = useDispatch()

  const { checking, uid } = useSelector((state) => state.auth)
  const { location } = useSelector((state) => state.location)
  let fondo = ''

  useEffect(() => {
    switch (location) {
      case '/home':
        fondo = 'fondo2'

        document.body.classList.remove('fondo1')
        document.body.classList.add('fondo2')
        break

      default:
        fondo = 'fondo1'
        document.body.classList.remove('fondo2')
        document.body.classList.add('fondo1')
        break
    }
  }, [location])

  useEffect(() => {
    dispatch(startChecking())
  }, [dispatch])

  if (checking) {
    return <h5>Espere...</h5>
  }

  return (
    <div className='page'>
      <div
        style={{ height: '100vh' }}
        className={uid !== undefined && `flex flex-no-wrap`}
      >
        {uid !== undefined && (
          <>
            <Navbar />
          </>
        )}
        {uid !== undefined && (
          <div
            style={{ height: ' 100vh' }}
            className={
              uid !== undefined &&
              `shadow w-5/12 md:w-3/12 lg:w-2/12 flex-col justify-between hidden sm:flex bg-opacity-10 mr-4`
            }
          >
            <>
              <Sidebar history={history} />
            </>
          </div>
        )}

        <Switch>
          <PublicRoute
            exact
            path='/index'
            component={IndexAuth}
            isAuthenticated={!!uid}
            history={history}
          />

          <PublicRoute
            exact
            path='/login'
            component={Login}
            isAuthenticated={!!uid}
            history={history}
          />

          <PublicRoute
            exact
            path='/signup'
            component={Signup}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/addnew'
            component={CreateHistoria}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/infoperfil'
            component={InfoPersonal}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/home'
            component={Dashboard}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/addnew/alumno'
            component={Alumno}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/alumnos'
            component={Alumnos}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/turnos'
            component={MisTurnos}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/account/:id'
            component={Cuenta}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/addnew/rutine'
            component={FormRutine}
            isAuthenticated={!!uid}
            history={history}
          />

          <Redirect to='/home' />
        </Switch>
      </div>
    </div>
  )
}

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch , Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { startChecking } from '../actions/auth'

import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { IndexAuth } from '../components/auth/Index'
import { Addnew } from '../components/addnew/Addnew'
import CreateHistoria from '../components/addnew/CreateHistoria'
import Turnos from '../components/account/Turnos'
import MisTurnos from '../components/account/MisTurnos'
import HistorialVacunas from '../components/account/VerHistorialUsuario'
import InfoPersonal from '../components/account/InfoPersonal'
import EditPerfil from '../components/account/EditPerfil'
import Dashboard from '../components/addnew/Dashboard'
import { Alumno } from '../components/addnew/Alumno'

import ReporteVacunas from '../components/ui/ReporteVacunas'
import GestionarTurno from '../components/ui/GestionarTurno'
import ModificarCentro from '../components/ui/ModificarCentro'

import { Navbar } from '../components/ui/Navbar'
import { Sidebar } from '../components/ui/Sidebar'
import { Login } from '../components/auth/Login'
import { Signup } from '../components/auth/Signup'

import { Alumnos } from '../components/Alumnos'
import { Cuenta } from '../components/Cuenta'
import { FormRutine } from '../components/addnew/FormRutine'

import VerHistClinica from '../components/account/InfoClinica'
import { VerTurnosVac } from '../components/account/VerTurnosVacunador'
import CreateUsuarioTurno from '../components/addnew/CreateUsuarioTurno'
import VacunarExpress from '../components/addnew/VacunacionExpress'
import ReporteRegistrados from '../components/ui/ReporteRegistrados'

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
            <div
              style={{ height: ' 100vh' }}
              className={
                uid !== undefined &&
                `shadow w-auto flex-col justify-between hidden sm:flex bg-opacity-10 mr-4`
              }
            >
              <>
                
              </>
            </div>
          </>
        )}

        <Switch >
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
            path='/historialvacunas'
            component={HistorialVacunas}
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
            path='/gestionarturnos'
            component={GestionarTurno}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/reportevacunas'
            component={ReporteVacunas}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/modificarcentro'
            component={ModificarCentro}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/reporteregistrados'
            component={ReporteRegistrados}
            isAuthenticated={!!uid}
            history={history}
          />

<PrivateRoute
            exact
            path='/vacunacionexpress'
            component={VacunarExpress}
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
            path='/modificarperfil'
            component={EditPerfil}
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

          <PrivateRoute
            exact
            path='/crearusuarioturno'
            component={CreateUsuarioTurno}
            isAuthenticated={!!uid}
            history={history}
          />

          <PrivateRoute
            exact
            path='/verturnosvacunador'
            component={VerTurnosVac}
            isAuthenticated={!!uid}
            history={history}
          />

<PrivateRoute
            exact
            path='/infoclinica'
            component={VerHistClinica}
            isAuthenticated={!!uid}
            history={history}
          />

          <Redirect to='/home' />
        </Switch >
      </div>
    </div>
  )
}

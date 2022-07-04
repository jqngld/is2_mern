import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'
import Card from '../../utils/card'
import axios from 'axios'
import Sidebar33 from './SidebarAdm'

export const GestionarTurno = () => {
    const dispatch = useDispatch()
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

    let store = useStore().getState()
    let id = store.auth.uid
  
    const [perfil, setPerfil] = useState({})
    const [turnos, setTurnos] = useState({})
    const [startDate, setStartDate] = useState(new Date());
    const [dateOpen, setDateOpen] = useState(false);

    const openDatePicker = () => {
      setDateOpen(!dateOpen);
    };

    const handleDate = (date, turno) => {
      setStartDate(date)
      const asdasd = {
        fecha: date
      }
      axios.post("http://localhost:4000/api/turno/gestionarturno/" + turno._id, asdasd).then(function (response) {
        Swal.fire('', response.data.msg, 'success').then(function() {
          window.location.reload()
      })
      })
    .catch(function (err) {
        Swal.fire('Error', err.response.data.msg, 'error')
    })
      // .then(function (response) {
      //                      Swal.fire('', 'Fecha yasss', 'success').then(function() {
      //                        window.location.reload()
      //                    })
      //                   })
    };
  
    useEffect(() => {
      setStartDate(new Date())
      axios.post('http://localhost:4000/api/turno/turnospendientes/')
      .then((res) => {
        setTurnos(res.data)
      })
      axios.get('http://localhost:4000/api/user/' + id).then((res) => {
        console.log(res.data)
        setPerfil(res.data)
      })
    }, [])
  
    return (
        <div className='rowC'> 
            <Sidebar33/>
            <div classname=''>
                <div className='text-white font-bold text-4xl p-5 pb-4'>
                    Turnos esperando confirmación
                </div>
                {console.log(turnos)}
                <div className='text-white text-left font-bold text-2xl flex-col p-4'>
                {turnos.turno !=0 ? (
    <div className='text-white text-left font-bold text-2xl flex-col p-4'>
      {Array.isArray(turnos.turno) &&
        turnos.turno.map((turno, index) => (
          <div key={index}>
            <div className='rowC'>
              Vacuna: {turno.vax}
            </div>
            <h1>
              Email del paciente: {turno.paciente} <br></br>
              <div className="form-group text-sm text-black p-4 w-full py-3 rounded m-2 bg-black bg-opacity-30">
              <DatePicker
                  selected={startDate}
                  onChange={(date) => handleDate(date, turno)}
                  maxDate={new Date()}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
              />        
              </div>
              {/* <button
                onClick={async () => {
                  <DatePicker
                  selected={new Date()}
                  onChange={(date) => handleDate(date, turno)}
                  maxDate={new Date()}
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                /> 

                      console.log('asd', fecha)

                      const test = {
                        fecha: fecha
                      }
                       if (fecha) {
                         console.log('a', fecha)
                         axios.post("http://localhost:4000/api/turno/gestionarturno/" + turno._id, test).then(function (response) {
                           Swal.fire('', 'Fecha yasss', 'success').then(function() {
                             window.location.reload()
                         })
                        })
                       .catch(function (err) {
                           Swal.fire('Error', err.response.data.msg, 'error')
                       })
                      }
                    }}
              className="boton-activo rounded text-sm w-full">Asignar fecha</button> */}
            </h1>
            <br></br>
          </div>
        ))}
    </div> ) : ( <> <h1 className='text-white text-left font-bold flex-col p-4'> No hay ningún turno programado. </h1> </>)}
            </div>
        </div>
    </div>     
    )
  }
  
  export default GestionarTurno
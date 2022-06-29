import { React, useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { modalStyles } from "../../utils/modalStyles";
import axios from "axios";
import { startRegisterVac } from "../../actions/auth";
import Sidebar22 from "../ui/SidebarVac";
import DatePicker from "react-datepicker";
import { array } from "prop-types";

function VacunarExpress() {
  let store = useStore().getState();
  const dispatch = useDispatch();

  const [formRegisterValues, handleRegisterInputChange, reset] = useForm({
    dni: 0,
  });

  let {
    dni
  } = formRegisterValues;

  const [paciente, setPaciente] = useState({
    name: 'No hay información.',
    lastname: 'No hay información.',
    dni: 'No hay información.',
    email: 'No hay información.'
  });
  const [historia, setHistoria] = useState();

  const fetchPaciente = (e) => {
    e.preventDefault()

    const buscar = {
      dni: formRegisterValues.dni
    };

    axios.post("http://localhost:4000/api/user/getpaciente", buscar)
    .then((res) => {
      setPaciente(res.data.paciente)
      setHistoria(res.data.historia)
    }).catch(function (err) {
      Swal.fire('Error', err.response.data.msg, 'error')
      setPaciente({
        name: 'No hay información.',
        lastname: 'No hay información.',
        dni: 'No hay información.',
        email: 'No hay información.'
      })
  })

  }

  return (
    <div className="grid text-center poppinsSemiBold nowrap flex-start flex rowC">
      <Sidebar22 />
        <div className="">
          <div className="text-white font-bold text-4xl flex-start px-5 py-2 flex">
            Vacunación express
          </div>
          <div className="w-full p-4">
            <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
              DNI del paciente
            </span>
            <input
            className="text-sm p-4 text-white w-full py-3 rounded m-2 bg-black bg-opacity-30"
            type="text"
            placeholder="Ingresá el DNI del paciente..."
            name="dni"
            value={dni}
            onChange={handleRegisterInputChange}
            />
          <div className="">
            <Link to="/home">
              <button onClick={fetchPaciente} className="text-white w-full rounded h-8 font-bold boton-activo">
                Buscar
              </button>
            </Link>
          </div>
          <div className="">
            <button type="reset" className="text-white w-full rounded h-8 font-bold boton-activo">
              <Link to="/home">Cancelar</Link>
            </button>
          </div>
        </div>
        <div className="w-full p-4">
            <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
              Nombre: {paciente.name}
            </span>
            <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
              Apellido: {paciente.lastname}
            </span>
            <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
              DNI: {paciente.dni}
            </span>
            <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
              Email: {paciente.email}
            </span>
        </div>
        <div>
        <button
        className={'text-white w-full text-sm rounded h-8 font-bold boton-activo'}
        onClick={() => {
          const send = {
            paciente: paciente,
            historia: historia
          }

          axios.post('http://localhost:4000/api/user/vacunar/COVID19', send).then(function (response) {
            Swal.fire('', 'Registraste la vacunación del paciente con éxito', 'success').then(function() {
              window.location.reload()
          })
          })
        .catch(function (err) {
            Swal.fire('Error', err.response.data.msg, 'error')
        })
        }}>
          Vacunar COVID-19
        </button>
        <button
        className={'text-white w-full text-sm rounded h-8 font-bold boton-activo'}
        onClick={() => {
          const send = {
            paciente: paciente,
            historia: historia
          }

          axios.post('http://localhost:4000/api/user/vacunar/GRIPE', send).then(function (response) {
            Swal.fire('', 'Registraste la vacunación del paciente con éxito', 'success')
          })
        .catch(function (err) {
            Swal.fire('Error', err.response.data.msg, 'error')
        })
        }}>
          Vacunar GRIPE
        </button>
        <button
        className={'text-white w-full text-sm rounded h-8 font-bold boton-activo'}
        onClick={() => {
          const send = {
            paciente: paciente,
            historia: historia
          }

          axios.post('http://localhost:4000/api/user/vacunar/FIEBREAMARILLA', send).then(function (response) {
            Swal.fire('', 'Registraste la vacunación del paciente con éxito', 'success').then(function() {
              window.location.reload()
          })
          })
        .catch(function (err) {
            Swal.fire('Error', err.response.data.msg, 'error')
        })
        }}>
          Vacunar FIEBRE AMARILLA</button>
        </div>
      </div>
    </div>
  );
}

export default VacunarExpress;

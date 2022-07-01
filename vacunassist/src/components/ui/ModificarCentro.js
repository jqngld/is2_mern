import { React, useState, useEffect } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { modalStyles } from "../../utils/modalStyles";
import axios from "axios";
import { startRegisterVac } from "../../actions/auth";
import Sidebar33 from "../ui/SidebarAdm";
import DatePicker from "react-datepicker";
import { array } from "prop-types";

function ModificarCentro() {
  let store = useStore().getState();
  const dispatch = useDispatch();

  const [formRegisterValues, handleRegisterInputChange, reset] = useForm({
    dni: 0,
  });

  let {
    dni
  } = formRegisterValues;

  const [centro, setCentro] = useState([])
  const [centroBusqueda, setCentroBusqueda] = useState();

  useEffect(() => {
    axios.post('http://localhost:4000/api/user/getallpacientes')
    .then((res) => {
      setCentro(res.data.centros)
    })
  }, [])

  function parseCentro(string) {
    if (string === "62b543062f480d487924f74a"){
        return centro[0].name
    } else {
        if (string === "62b543062f480d487924f74b"){
            return centro[1].name
        } else {
            if (string === "62b543062f480d487924f74c"){
                return centro[2].name
            } 
        }
    } 
  }

  function checkCentro() {
    if (!centroBusqueda) return true;
    return ""
  }


  return (
    <div className="grid text-center poppinsSemiBold nowrap flex-start flex rowC">
      <Sidebar33 />
        <div className="">
          <div className="text-white font-bold text-4xl flex-start px-5 py-2 flex">
            Modificar nombre de centro de vacunación
          </div>
          <div className="w-full p-4">
          <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
              Seleccioná un centro
            </span>
          <select
            onChange={(e) => {
                console.log(e.target.value)
                setCentroBusqueda(e.target.value)
            }}
            value={centroBusqueda}
            name="centro"
            className="text-sm p-4 text-white w-full py-3 rounded m-2 bg-black bg-opacity-30">
              <option selected="true" disabled="true">Seleccioná un centro</option>
              {Array.isArray(centro) && centro.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}</select>
        <button 

        disabled={checkCentro()}
        
        onClick={async () => {
            const { value: nombre } = await Swal.fire({
                title: 'Ingresá el nuevo nombre del ' + parseCentro(centroBusqueda),
                input: 'text',
                inputLabel: 'Nombre',
                autocapitalize: 'on',
              })

               const nuevoNombre = {
                name: nombre
               }

                 if (nombre) {
                      axios.post('http://localhost:4000/api/centros/modificarcentro/' + centroBusqueda, nuevoNombre).then(function (response) {
                        Swal.fire('', 'Se actualizó el nombre del vacunatorio', 'success').then(function() {
                          window.location.reload()
                      })
                      })
                    .catch(function (err) {
                        Swal.fire('Error', err.response.data.msg, 'error')
                    })
                 }
        }} className={checkCentro() ? "text-white w-full rounded h-8 font-bold boton-inactivo" : "text-white w-full rounded h-8 font-bold boton-activo"}>
                Modificar
        </button>
        </div>
        <div className="w-full p-4 text-sm">
        </div>
      </div>
    </div>
  );
}

export default ModificarCentro;

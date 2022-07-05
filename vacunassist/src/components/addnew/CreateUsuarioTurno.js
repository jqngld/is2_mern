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

function CreateUsuarioTurno() {
  let store = useStore().getState();
  const dispatch = useDispatch();

  //   const [input, setInput] = useState({
  //     cant: "0",
  //     fechaCovid: '',
  //     fechaGripe: '',
  //     fechaFiebre: '',
  //     risk: '',
  //     checkGripe: '',
  //     checkFiebre: '',
  //     name: '',
  //     lastname: '',
  //     tel: '',
  //     dni: '',
  //     email: '',
  //     date: undefined,
  //     password: makeid(6),
  //     cant: '',
  //     fechaCovid: '',
  //     fechaFiebre: '',
  //     risk: '',
  //     fechaGripe: '',
  //     centro: '',
  //     vacuna_recibida: '',
  //   });

  const [formRegisterValues, handleRegisterInputChange, reset] = useForm({
    name: "",
    lastname: "",
    tel: 0,
    dni: 0,
    email: "",
    date: undefined,
    password: makeid(6),
    cant: "",
    fechaCovid: "",
    fechaFiebre: "",
    risk: "",
    fechaGripe: "",
    centro: "",
    vacuna_recibida: "",
  });

  let {
    name,
    email,
    password,
    lastname,
    dni,
    tel,
    date,
    centro,
    cant,
    fechaCovid,
    fechaFiebre,
    fechaGripe,
    risk,
    vacuna_recibida,
    checkGripe,
    checkFiebre,
  } = formRegisterValues;

  const [startDate, setStartDate] = useState();
  const [centros, setCentros] = useState([]);
  let arrayCentros = []

  useEffect(() => {
    axios.get("http://localhost:4000/api/centros/getallcentros").then((res) => {
      setCentros(res.data);
      arrayCentros = res.data.centros
      console.log(res.data.centros)
    });
    document.title = "VACUNASSIST";
    setStartDate(new Date());
    let ev = {};
    ev.target = {};
    ev.target.name = "date";
    ev.target.value = startDate;
    handleRegisterInputChange(ev);
    let listaCentros = arrayCentros.length > 0
    	&& arrayCentros.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.name}</option>
      )
    }, this);
  }, []);
  
  const handleDate = (date) => {
    setStartDate(date);
    let ev = {};
    ev.target = {};
    ev.target.name = "date";
    ev.target.value = date;
    handleRegisterInputChange(ev);
  };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function validateEmail(email) {
    if (email.length != undefined) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    } else return true;
  }

  function handleClick(event) {
    event.preventDefault();
    console.log("email", email);
    console.log("nom", name);
    console.log("pass", password);
    console.log("dni", dni);

    if (!validateEmail(email) && email != undefined) {
      return Swal.fire("Error", "El formato del email no es válido.", "error");
    }

    if (formRegisterValues.cant == 0) {
      // si la cantidad de covid19 es 0 no se recibio ninguna, se deja la fecha vacia
      formRegisterValues.fechaCovid = "";
    }
    if (!formRegisterValues.checkFiebre) {
      formRegisterValues.fechaFiebre = "";
    }
    if (!formRegisterValues.checkGripe) {
      formRegisterValues.fechaGripe = "";
    }
    if (formRegisterValues.vacuna_recibida == "COVID19") {
      formRegisterValues.fechaCovid = new Date();
    }
    if (formRegisterValues.vacuna_recibida == "GRIPE") {
      formRegisterValues.fechaGripe = new Date();
    }
    if (formRegisterValues.vacuna_recibida == "FIEBRE AMARILLA") {
      formRegisterValues.fechaFiebre = new Date();
    }

    const newHistoria = {
      ultDosisCovid: formRegisterValues.fechaCovid,
      cDosisCovid: 0,
      ultDosisFiebre: formRegisterValues.fechaFiebre,
      ultDosisGripe: formRegisterValues.fechaGripe,
      riesgo: formRegisterValues.risk,
    };

    console.log("FIEBRE :: ", newHistoria.ultDosisFiebre);
    console.log("GRIPE :", newHistoria.ultDosisGripe);
    console.log("CANT :: ", newHistoria.cDosisCovid);
    console.log("COVID :: ", newHistoria.ultDosisCovid);

    const newUsuarioPorVacunador = {
      name: formRegisterValues.name,
      lastname: formRegisterValues.lastname,
      email: formRegisterValues.email,
      tel: formRegisterValues.tel,
      dni: formRegisterValues.dni,
      password: formRegisterValues.password,
      date: formRegisterValues.date,
      centro: formRegisterValues.centro,
    };

    // dispatch(startRegisterVac(email, password, name, lastname, dni, tel, date, centro, newHistoria))
    axios
      .post(
        "http://localhost:4000/api/user/nuevouserporvac",
        newUsuarioPorVacunador
      )
      .then(function (response) {
        console.log(response);
        Swal.fire("Registro exitoso", response.data.msg, "success").then(function() {
          window.location.reload()
      })
        // axios.post(
        //   "http://localhost:4000/api/historiaclinica/asignarhistoria/" +
        //     newUsuarioPorVacunador.dni,
        //   newHistoria
        // );
      })
      .catch(function (err) {
        Swal.fire("Error", err.response.data.msg, "error");
      });
  }

  return (
    <div className="grid text-center poppinsSemiBold nowrap flex-start flex rowC">
      <Sidebar22 />
      <div className="">
        <div className="text-white font-bold text-4xl flex-start px-5 py-2 flex ">
          Registrar paciente{" "}
        </div>
        <div className="w-full p-4 rowC ">
          <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
            Nombre
          </span>
          <input
            className="form-group text-sm p-4 text-white w-full py-3 rounded m-2 bg-black bg-opacity-30"
            type="text"
            placeholder="Ingresá el nombre del paciente..."
            name="name"
            value={name}
            onChange={handleRegisterInputChange}
          />
          <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
            Apellido
          </span>
          <input
            className="form-group text-sm p-4 text-white w-full py-3 rounded m-2 bg-black bg-opacity-30"
            type="text"
            placeholder="Ingresá el apellido del paciente..."
            name="lastname"
            value={lastname}
            onChange={handleRegisterInputChange}
          />
          <span className="text-white font-bold text-xl flex-start flex pl-2">
            Contraseña autogenerada
          </span>
          <input
            className="form-group text-sm p-4 text-white w-full py-3 rounded m-2 bg-black bg-opacity-30"
            type="text"
            placeholder=""
            readonly="true"
            name="password"
            value={password}
            onChange={handleRegisterInputChange}
          />
        </div>
        <div className="w-full p-4 rowC ">
          <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
            DNI
          </span>
          <input
            className="form-group text-sm p-4 text-white w-full py-3 rounded m-2 bg-black bg-opacity-30"
            type="text"
            placeholder="Ingresá el DNI del paciente..."
            name="dni"
            value={dni}
            onChange={handleRegisterInputChange}
          />
          <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
            Teléfono
          </span>
          <input
            className="form-group text-sm p-4 text-white w-full py-3 rounded m-2 bg-black bg-opacity-30"
            type="text"
            placeholder="Ingresá el teléfono del paciente..."
            name="tel"
            value={tel}
            onChange={handleRegisterInputChange}
          />
        </div>
        <div className="w-full sm:w-1/2 p-4 rowC">
          <span className="text-white font-bold text-xl flex-start flex pl-2 py-3">
            E-mail
          </span>
          <input
            style={{ width: 250 }}
            className="form-group text-sm p-4 text-white py-3 rounded m-2 bg-black bg-opacity-30"
            type="email"
            placeholder="Ingresá el email del paciente..."
            name="email"
            value={email}
            onChange={handleRegisterInputChange}
          />
          <span className="text-white font-bold text-xl flex-start flex pl-2">
            Fecha de Nacimiento
          </span>
          <div className="form-group text-sm p-4 w-full py-3 rounded m-2 bg-black bg-opacity-30">
            <DatePicker
              selected={startDate}
              onChange={(date) => handleDate(date)}
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <span className="text-white font-bold text-xl flex-start flex  pl-2">
            Centro de preferencia
          </span>
          <select onChange={handleRegisterInputChange}
            value={centro}
            name="centro"
            className="form-group text-white text-sm rounded m-2 bg-black bg-opacity-30">
              {Array.isArray(centros.centros) && centros.centros.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}</select>
        </div>
        <div className="h-full">
          <div className="flex flex-col  m-2 p-2 mb-4 rounded h-full">
            {/* <div className="form-group">
              <span className="text-white font-bold flex-start flex  p-2">
                Vacuna que recibe el paciente
              </span>
              <select
                onChange={handleRegisterInputChange}
                value={vacuna_recibida}
                name="vacuna_recibida"
                className="form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30"
              >
                <option value="" selected="true" disabled="true">
                  Seleccioná una vacuna
                </option>
                <option value="COVID19">COVID 19</option>
                <option value="GRIPE">Gripe</option>
                <option value="FIEBRE AMARILLA">Fiebre amarilla</option>
              </select>
            </div> */}
            {/* <div className="form-group">
              <span className="text-white font-bold flex-start flex  p-2">
                Cantidad de dosis recibidas contra el COVID19 (contando la
                vacuna recibida si corresponde)
              </span>
              <select
                onChange={handleRegisterInputChange}
                value={cant}
                name="cant"
                className="form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30"
              >
                <option value="" selected="true" disabled="true">
                  Seleccioná una cantidad
                </option>
                <option
                  value="0"
                  disabled={vacuna_recibida == "COVID19" ? "true" : ""}
                >
                  0
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div> */}
            {/* <div className="form-group">
              <div>
                <span className="text-white font-bold flex-start flex p-2">
                  Fecha de la última dosis recibida contra el COVID19
                </span>
                <input
                  onChange={handleRegisterInputChange}
                  type="date"
                  name="fechaCovid"
                  value={fechaCovid}
                  autoComplete="off"
                  className={
                    "form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30" +
                    (cant == 0 || vacuna_recibida == "COVID19"
                      ? "bg-black bg-opacity-10"
                      : "")
                  }
                  disabled={
                    (cant == 0 ? true : false) ||
                    (vacuna_recibida == "COVID19" ? true : false)
                  }
                ></input>
              </div>
            </div> */}
            {/* <div className="form-group">
              <span className="text-white font-bold flex-start flex p-2">
                Indicá si recibió la vacuna contra la gripe
              </span>{" "}
              <select
                disabled={vacuna_recibida == "GRIPE" ? "true" : ""}
                onChange={handleRegisterInputChange}
                value={checkGripe}
                name="checkGripe"
                className={
                  "form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30" +
                  (vacuna_recibida == "GRIPE" ? "bg-black bg-opacity-10" : "")
                }
              >
                {" "}
                <option value="false" selected="true">
                  No recibida
                </option>
                <option value="true">Recibida</option>
              </select>
              <div>
                <span className="text-white font-bold flex-start flex p-2">
                  Fecha de la última dosis recibida contra la gripe
                </span>
                <input
                  onChange={handleRegisterInputChange}
                  disabled={vacuna_recibida == "GRIPE" ? "true" : ""}
                  type="date"
                  name="fechaGripe"
                  value={fechaGripe}
                  autoComplete="off"
                  className={
                    "form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30" +
                    (vacuna_recibida == "GRIPE" ? "bg-black bg-opacity-10" : "")
                  }
                ></input>
              </div>
            </div> */}
            {/* <div className="form-group">
              <span className="text-white font-bold flex-start flex p-2">
                Indicá si recibió la vacuna contra la fiebre amarilla
              </span>{" "}
              <select
                disabled={vacuna_recibida == "FIEBRE AMARILLA" ? "true" : ""}
                onChange={handleRegisterInputChange}
                value={checkFiebre}
                name="checkFiebre"
                className={
                  "form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30" +
                  (vacuna_recibida == "FIEBRE AMARILLA"
                    ? "bg-black bg-opacity-10"
                    : "")
                }
              >
                {" "}
                <option value="false" selected="true">
                  No recibida
                </option>
                <option value="true">Recibida</option>
              </select>
              <div>
                <span className="text-white font-bold flex-start flex p-2">
                  Fecha de la última dosis recibida contra la fiebre amarilla
                </span>
                <input
                  disabled={vacuna_recibida == "FIEBRE AMARILLA" ? "true" : ""}
                  onChange={handleRegisterInputChange}
                  type="date"
                  name="fechaFiebre"
                  value={fechaFiebre}
                  autoComplete="off"
                  className={
                    "form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30" +
                    (vacuna_recibida == "FIEBRE AMARILLA"
                      ? "bg-black bg-opacity-10"
                      : "")
                  }
                ></input>
              </div>
            </div> */}
            {/* <div className="form-group">
              <span className="text-white font-bold flex-start flex p-2">
                ¿Tiene factores preexistentes que lo convierten en un paciente
                de riesgo?
              </span>
              <select
                onChange={handleRegisterInputChange}
                value={risk}
                name="risk"
                className="form-select form-select text-sm text-white w-full py-3 rounded m-2 bg-black bg-opacity-30"
              >
                <option value="" selected="true" disabled="true">
                  Seleccioná una opción
                </option>
                <option value="true" selected="true">
                  Sí
                </option>
                <option value="false">No</option>
              </select>
            </div> */}

            <hr className="m-4" />

            <div className="flex">
              <div className="w-1/2 p-4 pl-0">
                <button
                  type="reset"
                  className="text-white w-full rounded h-8 font-bold boton-activo"
                >
                  <Link to="/home">Cancelar</Link>
                </button>
              </div>
              <div className="w-1/2 p-4 pr-0">
                <Link to="/home">
                  <button
                    onClick={handleClick}
                    className="text-white w-full rounded h-8 font-bold boton-activo"
                  >
                    Guardar
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUsuarioTurno;

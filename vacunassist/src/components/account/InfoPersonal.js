import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Convert } from 'mongo-image-converter'
import { useForm } from '../../hooks/useForm'
import { addExcercise } from '../../actions/excercise'
import { elements } from '../../utils/elements'
import { parts_body } from '../../utils/body'
import { difficulty1 } from '../../utils/difficulty'
import { typeReps } from '../../utils/reps'
import Modal from 'react-modal'
import { modalStyles } from '../../utils/modalStyles'
import Card from '../../utils/card'
import axios from 'axios'



function CreateHistoria() {

    let store = useStore().getState()

    const [input, setInput] = useState({
        cant: '',
        fechaCovid: '',
        fechaGripe: '',
        fechaFiebre: '',
    })

    function handleChange(event) {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }


    function handleClick(event) {
        event.preventDefault();

        let id = store.auth.uid

        console.log('EL ID ES :: ', id)
        console.log('LA CANT ES :: ', input.cant)

        const newHistoria = {
            dni: id,
            ultDosisCovid: input.fechaCovid,
            cDosisCovid: input.cant,
            ultDosisFiebre: input.fechaFiebre,
            ultDosisGripe: input.fechaGripe
        }
        
        axios.post('http://localhost:4000/api/historiaclinica/nuevahistoriaclinica', newHistoria)

        Swal.fire('', 'Se actualizó tu historia clínica', 'success')

    }

    return (
        <div className='grid text-center  poppinsSemiBold nowrap'>
            <div className='text-white font-bold text-6xl flex-start flex p-4'>Mi información personal</div>
        </div>
    )
    }

export default CreateHistoria


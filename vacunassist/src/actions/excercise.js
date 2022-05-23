import Swal from 'sweetalert2'

import { types } from '../types/types'
import { fetchConToken } from '../helpers/fetch'
import { prepareEvents } from '../helpers/prepareEvents'

export const addExcercise = (data) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth
    data.professor_id = uid

    try {
      const resp = await fetchConToken('excercise', data, 'POST')
      const body = await resp.json()

      if (body.ok) {
        data.id = body.excercise.id
        data.user = {
          _id: uid,
          name: name,
        }
        Swal.fire('Listo!', 'Has agregado el ejercicio', 'success')
        dispatch(eventAddNew(data))
      } else {
        const { msg } = body

        if (msg !== undefined) {
          Swal.fire('Error', msg, 'error')
        } else {
          const { errors } = body
          let msg = ''
          Object.values(errors).map((element, index) => {
            msg = msg + '</br>' + element.msg
          })
          Swal.fire('Error', msg, 'error')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const getAllExcercises = () => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth
    try {
      const resp = await fetchConToken('excercise')
      const body = await resp.json()
    } catch (error) {
      console.log(error)
    }
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
})

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
})

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`events/${event.id}`, event, 'PUT')
      const body = await resp.json()

      if (body.ok) {
        dispatch(eventUpdated(event))
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event,
})

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent
    try {
      const resp = await fetchConToken(`events/${id}`, {}, 'DELETE')
      const body = await resp.json()

      if (body.ok) {
        dispatch(eventDeleted())
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventDeleted = () => ({ type: types.eventDeleted })

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('events')
      const body = await resp.json()

      const events = prepareEvents(body.eventos)
      dispatch(eventLoaded(events))
    } catch (error) {
      console.log(error)
    }
  }
}

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events,
})

export const eventLogout = () => ({ type: types.eventLogout })

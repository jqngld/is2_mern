import React from 'react'

const Card = ({ id, img, nombre, rol, isChecked = false, check }) => {
  return (
    <div id={id} onClick={check}>
      {img !== undefined ? (
        <div id={id} className='card relative px-4 py-4 my-4 mx-4 imagen-card'>
          {/* <p className='pink poppinsSemiBold italic px-4 pt-4 text-9xl'> “ </p> */}

          {isChecked == true ? (
            <div id={id} className='absolute top-2 text-white text-3xl left-4 z-20 p-2 bg-gray-900 w-8 h-8 flex items-center justify-center top-4 pb-4 cursor-pointer '>
              -
            </div>
          ) : (
            <div id={id} className='absolute top-2 text-white text-3xl left-4 z-20 p-2 bg-gray-900 w-8 h-8 flex items-center justify-center top-4 pb-4 cursor-pointer '>
              +
            </div>
          )}

          <img
            src={img}
            id={id}
            className='relative object-cover  max-h-full min-w-full object-top imagen-card'
            alt=''
          />
          <div id={id} className='relative bg-gray-900 rounded-br-md bottom-0 '>
            {/* <img
        className='absolute formita-card '
        src='images/formita-cita.png'
        alt=''
      /> */}
            <p id={id} className='px-2 yellow p-2 text-white text-2xl'>
              {nombre}
            </p>
            <p id={id} className=' px-2 yellow p-2  text-gray-200 italic '>
              {rol}
            </p>
          </div>
          { isChecked &&
          <span className='italic text-white'>Añadido!</span>
          }
        </div>
      ) : (
        <div id={id} className='card relative px-4 py-4 my-4 mx-4'>
          {/* <p className='pink poppinsSemiBold italic px-4 pt-4 text-9xl'> “ </p> */}

          <p id={id} className='px-2 yellow p-2 text-white text-2xl'>
            {nombre}
          </p>
          <p id={id} className=' px-2 yellow p-2  text-gray-200 italic '>
            {rol}
          </p>
          {/* <img
        className='absolute formita-card '
        src='images/formita-cita.png'
        alt=''
      /> */}
        </div>
      )}
    </div>
  )
}

export default Card

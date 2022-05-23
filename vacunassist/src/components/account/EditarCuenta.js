import React from 'react'

export const EditarCuenta = () => {
  return (
    <div>
      <h1>Información del alumno</h1>
      <div className='flex flex-wrap'>
        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full izq'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Nombre
                </span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese el nombre del ejercicio...'
                  name='nameE'
                  className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                  value='asd'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full der'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Apellido
                </span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese el nombre del ejercicio...'
                  name='nameE'
                  className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                  value='asd'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/* fila 2
         */}

        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full izq'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Telefono
                </span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese el nombre del ejercicio...'
                  name='nameE'
                  className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                  value='asd'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full der'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  DNI
                </span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese el nombre del ejercicio...'
                  name='nameE'
                  className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                  value='asd'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/* fila 3 */}

        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full izq'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Usuario
                </span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese el nombre del ejercicio...'
                  name='nameE'
                  className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                  value='asd'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full der'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Email
                </span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese el nombre del ejercicio...'
                  name='nameE'
                  className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                  value='asd'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/* fila 4 */}

        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full izq'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Contraseña
                </span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese el nombre del ejercicio...'
                  name='nameE'
                  className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                  value='asd'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full der'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Repetir Contraseña
                </span>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ingrese el nombre del ejercicio...'
                  name='nameE'
                  className='text-sm text-white w-full py-5 px-4 h-2 rounded m-2 bg-black bg-opacity-30'
                  value='asd'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/*  fila 5 o avatar */}

        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full izq'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Imagen o avatar
                </span>
                <div
                  type='text'
                  className='form-control '
                  placeholder='Ingrese el nombre del ejercicio...'
                  name='nameE'
                  className='text-sm text-white bg-black bg-opacity-30  w-80 h-80 rounded-full'
                  value='asd'
                  disabled
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className='sm:w-1/2 w-full flex flex-start items-center'>
          <div className='h-full flex items-center'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full izq items-center '>
              <div className='flex flex-col justify-center'>
                <button className='text-white w-full rounded h-8 font-bold boton-ok'>
                  {' '}
                  Aceptar
                </button>
                <button className='text-white w-full rounded h-8 font-bold boton-danger'>
                  Borrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

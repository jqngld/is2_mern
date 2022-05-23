import React from 'react'

const InfoCuenta = ({ cuenta }) => {
  console.log(cuenta)
  return (
    <div>
      <div className='flex justify-between p-2'>
        <h1>Información del alumno</h1>
        <span className='pr-8'>Notificionaciones: </span>
      </div>

      <hr />

      <div className='flex flex-wrap'>
        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full izq'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Nombre
                </span>
                <span className='text-md text-white p-2 h-20 flex items-center'>
                  {cuenta.name}
                </span>
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
                <span className='text-md text-white p-2 h-20 flex items-center'>
                  {cuenta.lastname}
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* fila 2
         */}

        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full izq'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Telefono
                </span>
                <span className='text-md text-white p-2 h-20 flex items-center'>
                  {cuenta.tel}
                </span>
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
                <span className='text-md text-white p-2 h-20 flex items-center'>
                  {cuenta.dni}
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* fila 3 */}

        <div className='sm:w-1/2 w-full'>
          <div className='h-full'>
            <div className='flex flex-col  m-2 p-2  mb-4 rounded h-full izq'>
              <div>
                <span className='text-white font-bold text-2xl flex-start flex  p-2'>
                  Usuario
                </span>
                <div className='flex items-center'>
                  <span>
                    <img
                      className='rounded-full mx-4 w-16 h-16'
                      src='/images/foto1.png'
                      alt=''
                    />
                  </span>
                  <span className='text-md text-white p-2 h-20 flex items-center'>
                    {cuenta.username}
                  </span>
                </div>
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
                <span className='text-md text-white p-2 h-20 flex items-center'>
                  {cuenta.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className='w-full' />

        {/* fila 4 */}
        <div className=' w-full'>
          <div className='h-full'>
            <div className='flex  m-2 p-2  mb-4 rounded h-full der'>
              <div className='w-full'>
                <span className='text-white font-bold'>
                  Cantidad de días por semana:
                  <span className='font-normal'>
                    &nbsp; {cuenta.num_of_day}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/*  fila 5 o avatar */}
        <div className=' w-full'>
          <div className='h-full'>
            <div className='flex  m-2 p-2  mb-4 rounded h-full der'>
              <div className='w-full'>
                <div className='text-white font-bold'>
                  Dolencias o padecimientos:
                </div>
                <div className='font-normal'>{cuenta.illnes}</div>
              </div>
            </div>
          </div>
        </div>

        <hr className='w-full' />

        <div className=' w-full'>
          <div className='h-full'>
            <div className='flex  m-2 p-2  mb-4 rounded h-full der'>
              <div className='flex flex-col w-full'>
                <span className='text-white font-bold'>Rutina actual:</span>
                {cuenta.has_rutine ? (
                  <div className='w-full flex justify-between'>
                    <span className='text-white '>
                      no tiene rutina asignada
                    </span>

                    {/* tiene rutina ? : */}
                    <button className='font-normal'>crear rutina</button>
                  </div>
                ) : (
                  <div className='w-full flex justify-between'>
                    <span className='text-white '>tiene rutina asignada</span>

                    {/* tiene rutina ? : */}
                    <button className='font-normal'>mostrar rutina</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoCuenta

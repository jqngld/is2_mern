import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

function Sidebar33() {
  return (
    <>
      <div
        style={{ height: '200vh' }}
        className='flex min-h-full flex-no-wrap'
      >
        <div className='w-64 min-h-full absolute sm:relative bg-gray-800 shadow flex-col justify-between hidden sm:flex bg-opacity-50'>
          <div className='px-8'>
            <div className='h-16 w-full flex items-center'>
              <img src='https://i.ibb.co/FYdLf8n/Sin-t-tulo-1.png' alt='' />
            </div>
            <ul className='mt-12'>
              <li className='flex w-full justify-between text-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-gray-500 cursor-pointer items-center mb-6'>
                <div className='flex items-center text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-grid'
                    width={18}
                    height={18}
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <rect x={4} y={4} width={6} height={6} rx={1} />
                    <rect x={14} y={4} width={6} height={6} rx={1} />
                    <rect x={4} y={14} width={6} height={6} rx={1} />
                    <rect x={14} y={14} width={6} height={6} rx={1} />
                  </svg>
                  <Link
                    to='/'
                    className='font-bold text-white hover:text-gray-200'
                  >
                    <span className='text-xs  ml-2'>Inicio</span>
                  </Link>
                </div>
              </li>
              <li className='flex w-full justify-between text-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-gray-500 cursor-pointer items-center mb-6'>
                <div className='flex items-center text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-puzzle'
                    width={18}
                    height={18}
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1' />
                  </svg>
                  <Link
                    to='/reportevacunas'
                    className='font-bold text-white hover:text-gray-200'
                  >
                    <span className='text-xs  ml-2 whitespace-nowrap'>
                      Gestionar turnos pendientes
                    </span>
                  </Link>
                </div>
              </li>
              <li className='flex w-full justify-between text-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-gray-500 cursor-pointer items-center mb-6'>
                <div className='flex items-center text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-puzzle'
                    width={18}
                    height={18}
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1' />
                  </svg>
                  <Link
                    to='/reportepacientes'
                    className='font-bold text-white hover:text-gray-200'
                  >
                    <span className='text-xs  ml-2 whitespace-nowrap'>
                      Obtener reporte de pacientes
                    </span>
                  </Link>
                </div>
                {/* <div className='py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs'>
                  8
                </div> */}
              </li>
              <li className='flex w-full justify-between text-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-gray-500 cursor-pointer items-center mb-6'>
                <div className='flex items-center text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-puzzle'
                    width={18}
                    height={18}
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <path d='M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1' />
                  </svg>
                  <Link
                    to='/vacunacionexpress'
                    className='font-bold text-white hover:text-gray-200'
                  >
                    <span className='text-xs  ml-2 whitespace-nowrap'>
                      Vacunación express
                    </span>
                  </Link>
                </div>
              </li>
            </ul>

    
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar33

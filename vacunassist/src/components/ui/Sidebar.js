import React from 'react'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <>
      <div
        style={{ height: '100vh' }}
        className='flex min-h-full flex-no-wrap w-full '
      >
        {/* Sidebar starts */}
        {/* Remove class [ hidden ] and replace [ sm:flex ] with [ flex ] */}
        <div className='w-64 min-h-full  absolute sm:relative bg-gray-800 shadow flex-col justify-between hidden sm:flex bg-opacity-50'>
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
                    <span className='text-sm  ml-2'>Inicio</span>
                  </Link>
                </div>
                {/* <div className='py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs'>
                  5
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
                    to='/addnew'
                    className='font-bold text-white hover:text-gray-200'
                  >
                    <span className='text-sm  ml-2 whitespace-nowrap'>
                      Añadir ejercicio
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
                    className='icon icon-tabler icon-tabler-compass'
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
                    <polyline points='8 16 10 10 16 8 14 14 8 16' />
                    <circle cx={12} cy={12} r={9} />
                  </svg>
                  <Link
                    to='/addnew/alumno'
                    className='font-bold text-white hover:text-gray-200'
                  >
                    <span className='text-sm  ml-2'>Añadir alumno</span>
                  </Link>
                </div>
              </li>

              <li className='flex w-full justify-between text-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-gray-500 cursor-pointer items-center mb-6'>
                <div className='flex items-center text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-compass'
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
                    <polyline points='8 16 10 10 16 8 14 14 8 16' />
                    <circle cx={12} cy={12} r={9} />
                  </svg>
                  <Link
                    to='/addnew/rutine'
                    className='font-bold text-white hover:text-gray-200'
                  >
                    <span className='text-sm  ml-2'>Añadir rutina</span>
                  </Link>
                </div>
              </li>

              <div className='bg-gray-600 bg-opacity-10'>
                <div className='h-24'></div>
                <h3 className='text-white text-center'>Tu información</h3>
                <hr />
                <div className='h-4'></div>

                <li className='flex w-full justify-between text-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-gray-500 cursor-pointer items-center mb-6'>
                  <div className='flex items-center text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='icon icon-tabler icon-tabler-compass'
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
                      <polyline points='8 16 10 10 16 8 14 14 8 16' />
                      <circle cx={12} cy={12} r={9} />
                    </svg>
                    <Link
                      to='/alumnos'
                      className='font-bold text-white hover:text-gray-200'
                    >
                      <span className='text-sm  ml-2'>Tus alumnos</span>
                    </Link>
                  </div>
                </li>
              </div>
              {/* 
              <li className='flex w-full justify-between text-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-gray-500 cursor-pointer items-center mb-6'>
              <div className='flex items-center text-white'>
                  <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-code'
                    width={20}
                    height={20}
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    fill='none'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' />
                    <polyline points='7 8 3 12 7 16' />
                    <polyline points='17 8 21 12 17 16' />
                    <line x1={14} y1={4} x2={10} y2={20} />
                  </svg>
                  <span className='text-sm  ml-2'>Deliverables</span>
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
                  <span className='text-sm  ml-2'>Invoices</span>
                </div>
                <div className='py-1 px-3 bg-gray-700 rounded text-gray-500 flex items-center justify-center text-xs'>
                  25
                </div>
              </li>
              <li className='flex w-full justify-between text-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-gray-500 cursor-pointer items-center mb-6'>
                <div className='flex items-center text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-stack'
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
                    <polyline points='12 4 4 8 12 12 20 8 12 4' />
                    <polyline points='4 12 12 16 20 12' />
                    <polyline points='4 16 12 20 20 16' />
                  </svg>
                  <span className='text-sm  ml-2'>Inventory</span>
                </div>
              </li>
              <li className='flex w-full justify-between text-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:text-gray-500 cursor-pointer items-center'>
                <div className='flex items-center text-white'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='icon icon-tabler icon-tabler-settings'
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
                    <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                    <circle cx={12} cy={12} r={3} />
                  </svg>
                  <span className='text-sm  ml-2'>Settings</span>
                </div>
              </li>
            */}
            </ul>

            {/* BUSCADOR */}

            {/* <div className='flex justify-center mt-48 mb-4 w-full'>
                    <div className='relative '>
                      <div className='text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4 absolute bottom-0'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='icon icon-tabler icon-tabler-search'
                          width={16}
                          height={16}
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' />
                          <circle cx={10} cy={10} r={7} />
                          <line x1={21} y1={21} x2={15} y2={15} />
                        </svg>
                      </div>
                      <input
                        className=' bg-gray-700 focus:outline-none rounded w-full text-sm text-gray-500 bg-gray-100 pl-10 py-2'
                        type='text'
                        placeholder='Search'
                      />
                    </div>
                  </div> */}
            {/* </div> */}

            {/* FOOTER SIDEBAR */}

            {/* <div className='px-8 border-t border-gray-800  bg-opacity-10'>
            <ul className='w-full flex items-center justify-between bg-gray-800 bg-opacity-10'>
              <li className='cursor-pointer text-white pt-5 pb-3 '>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-bell'
                  width={20}
                  height={20}
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <path d='M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6' />
                  <path d='M9 17v1a3 3 0 0 0 6 0v-1' />
                </svg>
              </li>
              <li className='cursor-pointer text-white pt-5 pb-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-messages'
                  width={20}
                  height={20}
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <path d='M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10' />
                  <path d='M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2' />
                </svg>
              </li>
              <li className='cursor-pointer text-white pt-5 pb-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-settings'
                  width={20}
                  height={20}
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <path d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                  <circle cx={12} cy={12} r={3} />
                </svg>
              </li>
              <li className='cursor-pointer text-white pt-5 pb-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-archive'
                  width={20}
                  height={20}
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' />
                  <rect x={3} y={4} width={18} height={4} rx={2} />
                  <path d='M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10' />
                  <line x1={10} y1={12} x2={14} y2={12} />
                </svg>
              </li> */}
            {/* </ul> */}
          </div>
        </div>
      </div>
    </>
  )
}

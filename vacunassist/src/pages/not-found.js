import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found - Workout'
  }, [])

  return (
    <div className='bg-gray-background'>
      <div className='mx-auto max-w-screen-lg'>
        <p className='text-center text-2xl'>NotFound</p>
      </div>
    </div>
  )
}

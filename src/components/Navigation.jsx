import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <nav className='flex justify-around items-center p-4 cursor-pointer'>
        <div>
            <Link to='/'>
            <h3 className='font-bold text-3xl hover:text-white'> MovieApp </h3>
            </Link>
        </div>
        <div>
            <ul className='flex'>
                <li className='py-1.5 px-4 cursor-pointer font-bold text-blue-600 font-sans text-lg'>
                    <Link to='/' className='hover:text-yellow-500'> Movie </Link>
                </li>
                <li className='py-1.5 px-4 ms-6 cursor-pointer font-bold text-blue-600 font-sans text-lg'>
                    <Link to='/series' className='hover:text-yellow-500'> Tv Series </Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navigation
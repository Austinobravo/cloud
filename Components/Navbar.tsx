import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-white w-full py-7 px-8 shadow-md fixed'>
        <Image src={`/logo-no-background.svg`} alt='' width={100} height={100}/>
    </nav>
  )
}

export default Navbar
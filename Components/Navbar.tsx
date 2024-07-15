import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-white w-full h-20 py-7 px-8 shadow-md fixed'>
        <Link href={`/`} className=' '>
            <Image src={`/logo-no-background.svg`} alt='' width={100} height={100} className=''/>
        </Link>
    </nav>
  )
}

export default Navbar
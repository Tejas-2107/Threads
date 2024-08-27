import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {sidebarLinks} from '@/constants/index'
const LeftSidebar = () => {
  return (
   <section className='left_sidebar'>
    <nav className='flex flex-col gap-6 h-screen'>
        <Link href="/" className='flex items-center gap-1 pb-10'>
         <Image src="/icons/logo.svg" alt='logo' width={20} height={2}/>
         <h1>Podcastr</h1>
        </Link>
        {
            sidebarLinks.map(({route,label,imgURL} )=>{
                return <Link href={route} key={label} className='flex items-center gap-1 '>
                    <Image src={imgURL} alt={label} width={20} height={2}></Image>
                    {label}
                </Link>
            })
        }
    </nav>
   </section>
  )
}

export default LeftSidebar

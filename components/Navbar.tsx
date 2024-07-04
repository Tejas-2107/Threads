'use client'
import { usePathname } from 'next/navigation';
import { CiSearch } from "react-icons/ci";
const Navbar = () => {
    let router = usePathname();
    let path = router.split('/').pop() || "";
  return (
    <div className='bg-slate-800 text-white h-20 ml-2 flex justify-between items-center'>
        <div className="container flex mx-auto items-center justify-between w-5/6">
        <div className="navbar_header">
            <h1>{path.toLocaleUpperCase()}</h1>
        </div>
        <div className='navbar_searh_bar flex items-center mr-4 gap-x-2'>
        <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search" />
            <button><CiSearch size={30}/></button>
        </div>
        </div>
    </div>
  )
}

export default Navbar
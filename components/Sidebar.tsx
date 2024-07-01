'use client'
import Link from 'next/link'
import React from 'react'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
    let router = usePathname();
    let path = router.split('/').pop() || "";
    return (
        <div className='bg-slate-800 h-screen text-white font-medium sticky'>
            <ul className='flex flex-col  gap-y-4 p-10 '>
                <li className={`${path === "dashboard" ? "active" : ""}`}><Link href='/dashboard' ><MdOutlineSpaceDashboard /> Dashboard</Link></li>
                <li className={`${path === "users" ?"active":""}`}><Link href='/dashboard/users' ><FiUsers />Users</Link></li>
                <li className={`${path === "products" ?"active":""}`}><Link href='/dashboard/products' ><MdProductionQuantityLimits />Products</Link></li>
                <li className={`${path=="transactions" ?"active":""}`}><Link href='/dashboard/transactions' ><GrTransaction />Transactions</Link></li>
            </ul>
        </div>
    )
}

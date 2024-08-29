'use client'
import Link from 'next/link';
import Image from 'next/image';
import { sidebarLinks } from '@/constants/index'
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
const LeftSidebar = () => {
    const path = usePathname();
    return (
        <section className='left_sidebar'>
            <nav className='flex flex-col gap-6 h-screen'>
                <Link href="/" className='flex items-center gap-1 pb-10'>
                    <Image src="/icons/logo.svg" alt='logo' width={20} height={2} />
                    <h1>Podcastr</h1>
                </Link>
                {
                    sidebarLinks.map(({ route, label, imgURL }) => {
                        const isActive = path === route;
                        return <Link href={route} key={label} className={cn('flex items-center gap-1 py-4', { 'bg-nav-focus border-r-4 border-orange-1': isActive })}>
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

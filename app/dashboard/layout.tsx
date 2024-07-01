import Navbar from '@/components/Navbar'
import { Sidebar } from '@/components/Sidebar'
const DashboradLayout = ({ children }: any) => {
    return (
        <div className='dashboard_layout flex'>
            <div className='sidebar w-1/5'>
                <Sidebar />
            </div>
            <div className='right_container w-full'>

                <div className="navbar">
                    <Navbar />
                </div>
                <div className="childre">
                    {children}
                </div>
            </div>

        </div>
    )
}

export default DashboradLayout
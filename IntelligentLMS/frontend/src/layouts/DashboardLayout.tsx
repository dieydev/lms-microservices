import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Navbar'

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-8 bg-background-light dark:bg-background-dark">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout

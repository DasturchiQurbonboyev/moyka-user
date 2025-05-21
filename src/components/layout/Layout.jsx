// components/Layout.jsx
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        {/* <Navbar /> */}
        <main style={{marginTop:"30px", borderRadius:"10px"}} className="bg-white ">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout

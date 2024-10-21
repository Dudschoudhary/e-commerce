import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import '../src/assets/style/style.css'
const Layout: React.FC = () => {
  return (
    <>
      <main className='min-h-[calc(100vh-56px)]'>
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useCompanyInfo } from '../../hooks/useCompanyInfo'
import { useServices } from '../../hooks/useServices'

export default function Layout() {
  const info = useCompanyInfo()
  const services = useServices()

  if (!info || services.length === 0) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

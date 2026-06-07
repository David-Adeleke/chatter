import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import '@/styles/layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <main className="layout-main" id="main-content">
        <Outlet />
      </main>
    </div>
  )
}
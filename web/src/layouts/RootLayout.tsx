import { Header } from '@/components/Header'
import { Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-l from-app-600 to-app-950 text-white">
      <Header />
      <Outlet />
    </div>
  )
}

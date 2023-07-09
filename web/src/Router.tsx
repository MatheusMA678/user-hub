import { Routes, Route } from 'react-router-dom'

import { RootLayout } from './layouts/RootLayout'
import { Home, Register, Login, Settings } from './pages'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

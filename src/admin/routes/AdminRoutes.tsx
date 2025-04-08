import { Routes, Route, Navigate } from 'react-router-dom'
import { UserRoutes } from '../users/routes/UserRoutes'

export const AdminRoutes = () => {
  return (
    <Routes>
        <Route path="/users/*" element={<UserRoutes />} />
        <Route path='/*' element={<Navigate to="/" />} />
    </Routes>
  )
}

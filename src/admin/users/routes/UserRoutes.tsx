
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserPage } from '../pages/UserPage'

export const UserRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path='/*' element={<Navigate to="/" />} />
    </Routes>
  )
}

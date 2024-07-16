import { JSX } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import type { RootState } from '@src/store'
export default function AdminRoute(): JSX.Element {
  const { userInfo } = useSelector((state: RootState) => state.auth)

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" replace />
}
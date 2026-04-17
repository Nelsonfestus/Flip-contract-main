import { Navigate, useLocation } from '@tanstack/react-router'
import { useAuth } from '@/context/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#12161c]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff7e5f] border-t-transparent" />
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" search={{ returnTo: location.pathname }} />
  }

  return <>{children}</>
}

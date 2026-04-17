import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: SignupRedirect,
})

function SignupRedirect() {
  // TanStack Router typesafe search config allows passing search object. 
  // Wait, actually query params need to define search schema. For simplicity, we can use the 'to' prop and manually append string via search if we want, or just let login handle it locally.
  // We'll navigate to /login and pass the tab state via URL query or window.location.
  return <Navigate to="/login" search={{ tab: 'signup' }} />
}

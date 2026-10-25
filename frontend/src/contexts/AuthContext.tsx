import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from 'firebase/auth'
import { osservaUtente, logout as authLogout } from '../services/auth'

interface AuthContextType {
  utente: User | null
  caricamento: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [utente, setUtente] = useState<User | null>(null)
  const [caricamento, setCaricamento] = useState(true)

  useEffect(() => {
    const unsub = osservaUtente((user) => {
      setUtente(user)
      setCaricamento(false)
    })
    return unsub
  }, [])

  const logout = async () => {
    await authLogout()
  }

  return (
    <AuthContext.Provider value={{ utente, caricamento, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve essere usato dentro AuthProvider')
  return ctx
}

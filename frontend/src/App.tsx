import { useState } from 'react'
import './App.css'
import { useAuth } from './contexts/AuthContext'
import Login from './components/Login'
import DashboardManager from './components/DashboardManager'
import VistaDipendente from './components/VistaDipendente'

type Vista = 'manager' | 'dipendente'

function App() {
  const { utente, caricamento, logout } = useAuth()
  const [vista, setVista] = useState<Vista>('manager')

  if (caricamento) {
    return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Caricamento...</div>
  }

  if (!utente) {
    return <Login />
  }

  return (
    <div className="app">
      <header className="header">
        <h1>TurningMind</h1>
        <div className="header-right">
          <nav>
            <button
              className={vista === 'manager' ? 'active' : ''}
              onClick={() => setVista('manager')}
            >
              Manager
            </button>
            <button
              className={vista === 'dipendente' ? 'active' : ''}
              onClick={() => setVista('dipendente')}
            >
              Dipendente
            </button>
          </nav>
          <span className="user-info">{utente.email}</span>
          <button className="logout-btn" onClick={logout}>
            Esci
          </button>
        </div>
      </header>

      <main>
        {vista === 'manager' ? <DashboardManager /> : <VistaDipendente />}
      </main>
    </div>
  )
}

export default App

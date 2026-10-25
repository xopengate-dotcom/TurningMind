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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <nav>
            <button
              className={vista === 'manager' ? 'active' : ''}
              onClick={() => setVista('manager')}
            >
              Dashboard Manager
            </button>
            <button
              className={vista === 'dipendente' ? 'active' : ''}
              onClick={() => setVista('dipendente')}
            >
              Vista Dipendente
            </button>
          </nav>
          <span style={{ fontSize: '0.9rem' }}>{utente.email}</span>
          <button onClick={logout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 6, cursor: 'pointer' }}>
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

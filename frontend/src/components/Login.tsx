import { useState } from 'react'
import { login, registra } from '../services/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistrazione, setIsRegistrazione] = useState(false)
  const [errore, setErrore] = useState('')
  const [caricamento, setCaricamento] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrore('')
    setCaricamento(true)
    try {
      if (isRegistrazione) {
        await registra(email, password)
      } else {
        await login(email, password)
      }
    } catch (err: any) {
      setErrore(err.message || 'Errore di autenticazione')
    } finally {
      setCaricamento(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: '4rem auto' }}>
      <h2>{isRegistrazione ? 'Registrati' : 'Accedi'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '0.75rem', marginBottom: '0.75rem', borderRadius: 6, border: '1px solid #cbd5e1' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '0.75rem', marginBottom: '0.75rem', borderRadius: 6, border: '1px solid #cbd5e1' }}
        />
        {errore && <p style={{ color: '#dc2626' }}>{errore}</p>}
        <button className="primary" type="submit" disabled={caricamento} style={{ width: '100%' }}>
          {caricamento ? 'Attendere...' : isRegistrazione ? 'Crea account' : 'Accedi'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button
          onClick={() => setIsRegistrazione(!isRegistrazione)}
          style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer' }}
        >
          {isRegistrazione ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati'}
        </button>
      </p>
    </div>
  )
}

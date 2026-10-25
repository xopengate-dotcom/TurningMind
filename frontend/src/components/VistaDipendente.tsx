import { useState } from 'react'

export default function VistaDipendente() {
  const [messaggio, setMessaggio] = useState('')
  const [risposta, setRisposta] = useState<string | null>(null)

  const inviaRichiesta = () => {
    if (!messaggio.trim()) return
    setRisposta(
      `Messaggio inviato: "${messaggio}"\n\n(Qui arriverà l'intento estratto da Gemini)`
    )
    setMessaggio('')
  }

  return (
    <div>
      <div className="card">
        <h2>I tuoi turni</h2>
        <p>Qui verranno mostrati i turni assegnati per la settimana corrente.</p>
        <div className="grid">
          <div className="card" style={{ background: '#f8fafc' }}>
            <strong>Lunedì</strong>
            <p>Banco – 18:00-23:00</p>
          </div>
          <div className="card" style={{ background: '#f8fafc' }}>
            <strong>Mercoledì</strong>
            <p>Cucina – 18:00-23:00</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Invia una richiesta</h2>
        <p>Scrivi in italiano naturale (es. "sono malato stasera", "posso scambiare con Marco?")</p>
        <textarea
          value={messaggio}
          onChange={(e) => setMessaggio(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
          placeholder="Scrivi qui la tua richiesta..."
        />
        <br />
        <button className="primary" onClick={inviaRichiesta} style={{ marginTop: '0.75rem' }}>
          Invia richiesta
        </button>

        {risposta && (
          <pre style={{ marginTop: '1rem', background: '#f1f5f9', padding: '1rem', borderRadius: '6px', whiteSpace: 'pre-wrap' }}>
            {risposta}
          </pre>
        )}
      </div>
    </div>
  )
}

import { useState } from 'react'
import type { ConfigurazioneManager, Ruolo } from '../types/models'
import { CONFIGURAZIONE_DEFAULT } from '../types/models'

const RUOLI: Ruolo[] = ['esterno', 'banco', 'cucina', 'lavapiatti']

interface Fascia {
  id: string
  nome: string
  oraInizio: string
  oraFine: string
  ruoliRichiesti: Partial<Record<Ruolo, number>>
}

export default function DashboardManager() {
  const [config, setConfig] = useState<ConfigurazioneManager>({
    id: 'default',
    nome: 'Settimana standard',
    ...CONFIGURAZIONE_DEFAULT,
    fasceOrarie: [
      {
        id: 'pranzo',
        nome: 'Pranzo',
        oraInizio: '12:00',
        oraFine: '15:00',
        ruoliRichiesti: { esterno: 1, banco: 1, cucina: 1, lavapiatti: 1 },
      },
      {
        id: 'cena',
        nome: 'Cena',
        oraInizio: '18:00',
        oraFine: '23:00',
        ruoliRichiesti: { esterno: 1, banco: 2, cucina: 2, lavapiatti: 1 },
      },
    ],
  })

  const [fasce, setFasce] = useState<Fascia[]>(config.fasceOrarie as Fascia[])

  const aggiornaFascia = (index: number, campo: keyof Fascia, valore: any) => {
    const nuove = [...fasce]
    nuove[index] = { ...nuove[index], [campo]: valore }
    setFasce(nuove)
    setConfig((prev) => ({ ...prev, fasceOrarie: nuove }))
  }

  const aggiornaRuoloFascia = (indexFascia: number, ruolo: Ruolo, valore: number) => {
    const nuove = [...fasce]
    nuove[indexFascia].ruoliRichiesti = {
      ...nuove[indexFascia].ruoliRichiesti,
      [ruolo]: valore,
    }
    setFasce(nuove)
    setConfig((prev) => ({ ...prev, fasceOrarie: nuove }))
  }

  const aggiungiFascia = () => {
    const nuova: Fascia = {
      id: `fascia-${Date.now()}`,
      nome: 'Nuova fascia',
      oraInizio: '18:00',
      oraFine: '23:00',
      ruoliRichiesti: { esterno: 1, banco: 1, cucina: 1, lavapiatti: 1 },
    }
    const nuove = [...fasce, nuova]
    setFasce(nuove)
    setConfig((prev) => ({ ...prev, fasceOrarie: nuove }))
  }

  const generaTurni = () => {
    alert('Configurazione con fasce orarie pronta.\n(Qui verrà chiamata la Cloud Function)')
    console.log(config)
  }

  return (
    <div>
      <div className="card">
        <h2>Dashboard Manager</h2>
        <p>Configura fasce orarie e copertura per ruolo.</p>
        <button className="primary" onClick={generaTurni}>
          Genera turni
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ margin: 0 }}>Fasce orarie</h2>
          <button className="primary" onClick={aggiungiFascia} style={{ fontSize: '0.9rem', padding: '0.4rem 0.8rem' }}>
            + Aggiungi fascia
          </button>
        </div>

        {fasce.map((fascia, i) => (
          <div key={fascia.id} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '1rem', marginTop: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
              <input
                type="text"
                value={fascia.nome}
                onChange={(e) => aggiornaFascia(i, 'nome', e.target.value)}
                placeholder="Nome fascia"
                style={{ flex: '1 1 140px', padding: '0.5rem', borderRadius: 6, border: '1px solid #cbd5e1' }}
              />
              <input
                type="time"
                value={fascia.oraInizio}
                onChange={(e) => aggiornaFascia(i, 'oraInizio', e.target.value)}
                style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #cbd5e1' }}
              />
              <span style={{ alignSelf: 'center' }}>→</span>
              <input
                type="time"
                value={fascia.oraFine}
                onChange={(e) => aggiornaFascia(i, 'oraFine', e.target.value)}
                style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #cbd5e1' }}
              />
            </div>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Ruolo</th>
                    <th>Persone richieste</th>
                  </tr>
                </thead>
                <tbody>
                  {RUOLI.map((ruolo) => (
                    <tr key={ruolo}>
                      <td style={{ textTransform: 'capitalize' }}>{ruolo}</td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          max={10}
                          value={fascia.ruoliRichiesti[ruolo] ?? 0}
                          onChange={(e) => aggiornaRuoloFascia(i, ruolo, Number(e.target.value))}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>Regole globali</h2>
        <label>
          Max ruoli per giorno:&nbsp;
          <input
            type="number"
            min={1}
            max={3}
            value={config.regole.maxRuoliPerGiorno}
            onChange={(e) =>
              setConfig((prev) => ({
                ...prev,
                regole: { ...prev.regole, maxRuoliPerGiorno: Number(e.target.value) },
              }))
            }
          />
        </label>
      </div>
    </div>
  )
}

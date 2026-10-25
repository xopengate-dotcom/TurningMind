import { useState } from 'react'
import type { ConfigurazioneManager, Ruolo } from '../types/models'
import { CONFIGURAZIONE_DEFAULT } from '../types/models'

const RUOLI: Ruolo[] = ['esterno', 'banco', 'cucina', 'lavapiatti']
const GIORNI = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']

export default function DashboardManager() {
  const [config, setConfig] = useState<ConfigurazioneManager>({
    id: 'default',
    nome: 'Settimana standard',
    ...CONFIGURAZIONE_DEFAULT,
  })

  const aggiornaCopertura = (giorno: number, ruolo: Ruolo, valore: number) => {
    setConfig((prev) => ({
      ...prev,
      copertura: {
        ...prev.copertura,
        [giorno]: {
          ...prev.copertura[giorno as keyof typeof prev.copertura],
          [ruolo]: valore,
        },
      },
    }))
  }

  const generaTurni = () => {
    alert('Qui verrà chiamata la Cloud Function genera_turni con la configurazione corrente.')
    console.log('Configurazione da inviare:', config)
  }

  return (
    <div>
      <div className="card">
        <h2>Dashboard Manager</h2>
        <p>Configura i vincoli e genera i turni della settimana.</p>
        <button className="primary" onClick={generaTurni}>
          Genera turni
        </button>
      </div>

      <div className="card">
        <h2>Copertura minima per ruolo</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Giorno</th>
              {RUOLI.map((r) => (
                <th key={r} style={{ padding: '0.5rem' }}>{r}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GIORNI.map((nome, g) => (
              <tr key={g}>
                <td style={{ padding: '0.5rem' }}>{nome}</td>
                {RUOLI.map((ruolo) => (
                  <td key={ruolo} style={{ padding: '0.5rem', textAlign: 'center' }}>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={config.copertura[g as keyof typeof config.copertura]?.[ruolo] ?? 0}
                      onChange={(e) => aggiornaCopertura(g, ruolo, Number(e.target.value))}
                      style={{ width: '60px', textAlign: 'center' }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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

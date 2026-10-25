// Modelli dati per TurningMind

export type Ruolo = 'esterno' | 'banco' | 'cucina' | 'lavapiatti';

export type GiornoSettimana = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface FasciaOraria {
  id: string;
  nome: string;
  oraInizio: string;
  oraFine: string;
  ruoliRichiesti: Partial<Record<Ruolo, number>>;
}

export interface ConfigurazioneManager {
  id: string;
  nome: string;
  attiva: boolean;
  copertura: {
    [giorno in GiornoSettimana]?: Partial<Record<Ruolo, number>>;
  };
  fasceOrarie?: FasciaOraria[];
  regole: {
    maxRuoliPerGiorno: number;
    minGiorniRiposoSettimana?: number;
    maxGiorniConsecutivi?: number;
    penalitaBassaAffidabilita: boolean;
  };
}

export const CONFIGURAZIONE_DEFAULT: Omit<ConfigurazioneManager, 'id' | 'nome'> = {
  attiva: true,
  copertura: {
    0: { esterno: 1, banco: 2, cucina: 2, lavapiatti: 1 },
    1: { esterno: 1, banco: 2, cucina: 2, lavapiatti: 1 },
    2: { esterno: 1, banco: 2, cucina: 2, lavapiatti: 1 },
    3: { esterno: 1, banco: 2, cucina: 2, lavapiatti: 1 },
    4: { esterno: 1, banco: 2, cucina: 2, lavapiatti: 1 },
    5: { esterno: 2, banco: 3, cucina: 2, lavapiatti: 1 },
    6: { esterno: 2, banco: 3, cucina: 2, lavapiatti: 1 },
  },
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
  regole: {
    maxRuoliPerGiorno: 1,
    minGiorniRiposoSettimana: 1,
    maxGiorniConsecutivi: 5,
    penalitaBassaAffidabilita: true,
  },
};

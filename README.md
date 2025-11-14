# Test di Programmazione per Candidati

Questo progetto contiene un test di programmazione per valutare le capacità di debug e problem-solving dei candidati sviluppatori.

## Descrizione

Il test simula un sistema di monitoraggio dati dei sensori con 2 bug intenzionali che il candidato deve trovare e correggere.

## Requisiti del Test

- **Tempo limite**: 15 minuti
- **Obiettivo**: Trova e correggi esattamente 2 bug nel codice
- **Tipo di bug**: Errori logici (non errori di sintassi)
- **Verifica**: Testa le correzioni eseguendo la funzione di test

## Come Eseguire il Test

### Prerequisiti
- Node.js (versione 14 o superiore)
- npm

### Installazione
```bash
npm install
```

### Esecuzione del Test
```bash
npm test
```
oppure
```bash
npm start
```
oppure
```bash
npx ts-node candidate-test.ts
```

## Risultati Attesi

Dopo aver corretto i bug, l'output dovrebbe essere:

```
=== TEST SISTEMA SENSORI ===
Riassunto: { total: 2, online: 1, offline: 1 }
Sensor1 offline? false
Sensor2 offline? true  
Dati recenti sensor1 (ultimi 300s): 2
Dati recenti sensor2 (ultimi 300s): 1
```

## Struttura del Progetto

- `candidate-test.ts` - Il file principale contenente il codice da debuggare
- `package.json` - Configurazione del progetto e dipendenze
- `tsconfig.json` - Configurazione TypeScript
- `README.md` - Questo file con le istruzioni

## Note per i Valutatori

- **Bug 1 (FACILE)**: Errore logico semplice - dovrebbe essere trovato in ~3 minuti
- **Bug 2 (DIFFICILE)**: Errore logico sottile - richiede analisi attenta delle condizioni di filtraggio

Il test valuta:
- Capacità di lettura e comprensione del codice
- Abilità di debugging logico
- Comprensione di operatori booleani e condizioni
- Capacità di testing e verifica delle correzioni

## Licenza

MIT
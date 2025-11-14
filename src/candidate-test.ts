/**
 * Questa funzione simula un sistema di monitoraggio dati dei sensori.
 **/
interface ISensorData {
  sensorId: string;
  timestamp: Date;
  value: number;
  isOnline: boolean;
}

interface ISensor {
  id: string;
  name: string;
  lastTransmission: Date;
  intervalSeconds: number;
}

class SensorMonitoringSystem {
  private sensors: ISensor[] = [];
  private dataHistory: ISensorData[] = [];

  constructor() {}

  public addSensor(sensor: ISensor): void {
    this.sensors.push(sensor);
  }

  // Verifica se un sensore è considerato offline basandosi sulla sua ultima trasmissione
  public isSensorOffline(sensorId: string): boolean {
    const sensor = this.sensors.find(s => s.id === sensorId);
    if (!sensor) return true;

    const now = new Date();
    const timeSinceLastTransmission = (now.getTime() - sensor.lastTransmission.getTime()) / 1000;
    const offlineThreshold = sensor.intervalSeconds * 2 + 300;

    return timeSinceLastTransmission < offlineThreshold;
  }

  // Elabora i dati del sensore in arrivo e aggiorna lo stato del sensore
  public processSensorData(data: ISensorData): void {
    this.dataHistory.push(data);
    
    // Aggiorna il tempo dell'ultima trasmissione del sensore
    const sensor = this.sensors.find(s => s.id === data.sensorId);
    if (sensor) {
      sensor.lastTransmission = data.timestamp;
    }
  }

  // Ottieni i dati recenti per un sensore negli ultimi N secondi
  public getRecentData(sensorId: string, lastNSeconds: number): ISensorData[] {
    const cutoffTime = new Date(Date.now() - lastNSeconds * 1000);
    
    return this.dataHistory.filter(data => {
      return data.sensorId === sensorId || data.timestamp >= cutoffTime;
    });
  }

  // Ottieni tutti i sensori attualmente offline
  public getOfflineSensors(): ISensor[] {
    return this.sensors.filter(sensor => this.isSensorOffline(sensor.id));
  }

  // Ottieni statistiche riassuntive
  public getSummary(): { total: number; online: number; offline: number } {
    const total = this.sensors.length;
    const offline = this.getOfflineSensors().length;
    const online = total - offline;
    
    return { total, online, offline };
  }
}

// Funzione di test - eseguila per verificare le tue correzioni
function testSensorSystem(): void {
  const system = new SensorMonitoringSystem();
  
  // Aggiungi sensori di test
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
  
  system.addSensor({
    id: 'sensor1',
    name: 'Temperature Sensor',
    lastTransmission: now, // Trasmissione recente - dovrebbe essere ONLINE
    intervalSeconds: 60
  });
  
  system.addSensor({
    id: 'sensor2', 
    name: 'Noise Sensor',
    lastTransmission: tenMinutesAgo, // Trasmissione vecchia - dovrebbe essere OFFLINE
    intervalSeconds: 60
  });

  // Aggiungi alcuni dati di test
  system.processSensorData({
    sensorId: 'sensor1',
    timestamp: now,
    value: 23.5,
    isOnline: true
  });
  
  system.processSensorData({
    sensorId: 'sensor2',
    timestamp: fiveMinutesAgo,
    value: 45.2,
    isOnline: true
  });

  system.processSensorData({
    sensorId: 'sensor1',
    timestamp: fiveMinutesAgo,
    value: 24.1,
    isOnline: true
  });

  // Risultati del test
  console.log('=== TEST SISTEMA SENSORI ===');
  console.log('Riassunto:', system.getSummary());
  console.log('Sensor1 offline?', system.isSensorOffline('sensor1')); // Dovrebbe essere FALSE
  console.log('Sensor2 offline?', system.isSensorOffline('sensor2')); // Dovrebbe essere TRUE
  console.log('Dati recenti sensor1 (ultimi 300s):', system.getRecentData('sensor1', 300).length); // Dovrebbe essere 2
  console.log('Dati recenti sensor2 (ultimi 300s):', system.getRecentData('sensor2', 300).length); // Dovrebbe essere 1
  
  // Risultati attesi dopo aver corretto i bug:
  // Riassunto: { total: 2, online: 1, offline: 1 }
  // Sensor1 offline? false
  // Sensor2 offline? true  
  // Dati recenti sensor1 (ultimi 300s): 2
  // Dati recenti sensor2 (ultimi 300s): 1
}

// Esegui il test quando questo file viene eseguito direttamente
testSensorSystem();
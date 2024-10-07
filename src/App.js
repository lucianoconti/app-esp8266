import React, { useState } from 'react';

function App() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLedOn = async () => {
    setLoading(true); // Comenzar carga
    try {
      const response = await fetch('http://localhost:3001/api/led/on');
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      setStatus(`Error al encender el LED: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  const handleLedOff = async () => {
    setLoading(true); // Comenzar carga
    try {
      const response = await fetch('http://localhost:3001/api/led/off');
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      setStatus(`Error al apagar el LED: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Control del LED ESP8266</h1>
      <div>
        <button onClick={handleLedOn}>Encender LED</button>
        <button onClick={handleLedOff}>Apagar LED</button>
      </div>
      {loading && <p>Cargando...</p>}
      {status && <p>{status}</p>}
    </div>
  );
}

export default App;

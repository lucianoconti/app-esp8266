const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Servidor funcionando. Usa las rutas /api/led/on o /api/led/off');
});

// Ruta para encender el LED del ESP8266
app.get('/api/led/on', async (req, res) => {
  try {
    const espResponse = await axios.get('http://192.168.1.17/led/on', { timeout: 2000 });
    console.log('LED encendido'); // Log en la consola del servidor
    res.json({ message: 'LED encendido', data: espResponse.data });
  } catch (error) {
    console.error('Error al encender el LED:', error.message); // Log del error
    res.status(500).json({ message: 'Error al encender el LED', error: error.message });
  }
});

// Ruta para apagar el LED del ESP8266
app.get('/api/led/off', async (req, res) => {
  try {
    const espResponse = await axios.get('http://192.168.1.17/led/off', { timeout: 2000 });
    console.log('LED apagado'); // Log en la consola del servidor
    res.json({ message: 'LED apagado', data: espResponse.data });
  } catch (error) {
    console.error('Error al apagar el LED:', error.message); // Log del error
    res.status(500).json({ message: 'Error al apagar el LED', error: error.message });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

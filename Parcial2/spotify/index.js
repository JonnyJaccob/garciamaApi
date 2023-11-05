const express = require('express');
const axios = require('axios');
require('dotenv').config(); //para buscar el archivo .env
const qs = require('qs'); // Este paquete se utiliza para codificar los datos del formulario

const app = express();
const PORT = process.env.PORT || 3000;


const client_id = process.env.CLIENT_ID || 'CLIENT_ID';
const client_secret = process.env.SECRET_KEY || 'CLIENT_SECRET';


async function getSpotifyToken(req, res, next) {
  //console.log(client_id)
  //console.log(client_secret)
  const credentials = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      grant_type: 'client_credentials'
    })
  };

  try {
    const response = await axios(authOptions);
    req.token = response.data.access_token;
    next(); // Continúa con la siguiente función en la cadena de middleware
  } catch (error) {
    // Asegúrate de que no se envíen varias respuestas
    if (!res.headersSent) {
      res.status(500).send('Error al obtener el token de Spotify: ' + error.message);
    }
  }
}

app.use(getSpotifyToken); 


app.get('/', (req, res) => {
  res.send('Token obtenido: ' + req.token);
  console.log("Obtencion de Token Exitosa")
});

app.get('/perfil', async (req, res) => {
  if (!req.token) {
    return res.status(401).send('Token de acceso no disponible.');
  }

  try {
    const profileData = await getProfile(req.token);
    res.send(profileData);
  } catch (error) {
    console.error('Error al obtener el perfil:', error.response.data.error);
    res.status(error.response.status).send('Error al obtener el perfil: ' + error.response.data.error.message);
  }
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  if (code) {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: qs.stringify({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: `http://localhost:${PORT}/callback`, // Asegúrate de que esta URI de redirección coincida con la configurada en Spotify
        }),
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const accessToken = response.data.access_token;
      // Ahora puedes usar el accessToken para hacer solicitudes a la API de Spotify en nombre del usuario
      // Por ejemplo, redirigir al usuario a una página con su información de perfil o almacenar el token en una sesión

    } catch (error) {
      console.error('Error al obtener el token de Spotify:', error);
      res.status(500).send('Error al obtener el token de Spotify');
    }
  } else {
    res.redirect('/#error=invalid_token');
  }
});

async function getProfile(accessToken) {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
}

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto - ' + PORT);
});

import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

import { redirectToAuthCodeFlow, getAccessToken } from "./authCodeWithPkce";

const clientId = "36bbd3b49c284e93aee2c952f8e2969a";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

// Ejemplo de uso de las funciones asincrónicas con async/await
async function handleLogin() {
  if (!code) {
      redirectToAuthCodeFlow(clientId);
  } else {
      try {
          const accessToken = await getAccessToken(clientId, code);
          const profile = await fetchProfile(accessToken);
          populateUI(profile);
      } catch (error) {
          // Manejar los errores aquí, como mostrar un mensaje al usuario
          console.error('Error during the login process:', error);
      }
  }
}

// Asegúrate de que esta función también esté definida en algún lugar de tu código o importada si está en otro archivo
async function fetchProfile(token) {
  try {
      const response = await fetch("https://api.spotify.com/v1/me", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
      });

      const profile = await response.json();
      return profile;
  } catch (error) {
      console.error('Error fetching profile:', error);
      throw error; // Re-lanzar el error para manejarlo más adelante
  }
}

handleLogin(); // Llama a la función que maneja el proceso de inicio de sesión


function populateUI(profile) {
  // Establece valores predeterminados en caso de que ciertos datos no estén disponibles
  const displayName = profile.display_name || 'Nombre no disponible';
  const email = profile.email || 'Email no disponible';
  const userId = profile.id || 'ID no disponible';
  const userUri = profile.uri || '#';
  const profileLink = profile.external_urls ? profile.external_urls.spotify : '#';
  const profileHref = profile.href || '#';
  
  // Actualiza el DOM con los valores obtenidos o los valores predeterminados
  document.getElementById("displayName").innerText = displayName;
  document.getElementById("email").innerText = email;
  document.getElementById("id").innerText = userId;
  document.getElementById("uri").innerText = userUri;
  document.getElementById("uri").setAttribute("href", profileLink);
  document.getElementById("url").innerText = profileHref;
  document.getElementById("url").setAttribute("href", profileHref);
  
  // Manejo de la imagen de perfil
  const avatarElement = document.getElementById("avatar");
  const imageUrlElement = document.getElementById("imgUrl");
  if (profile.images && profile.images.length > 0) {
      avatarElement.setAttribute("src", profile.images[0].url);
      imageUrlElement.innerText = profile.images[0].url;
  } else {
      // Establece una imagen predeterminada si no hay ninguna disponible
      const defaultAvatar = '/tron.png'; // Asegúrate de que esta ruta es correcta
      avatarElement.setAttribute("src", defaultAvatar);
      imageUrlElement.innerText = 'Imagen no disponible';
  }
}


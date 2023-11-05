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

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    getAccessToken(clientId, code).then(accessToken => {
        fetchProfile(accessToken).then(profile => {
            populateUI(profile);
        }).catch(error => {
            console.error('Error fetching profile:', error);
        });
    }).catch(error => {
        console.error('Error getting access token:', error);
    });
}

function fetchProfile(token){
    return fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.json());
}

function populateUI(profile) {
    // Aquí asumimos que `profile` tiene la estructura que esperamos, según la interfaz UserProfile de TypeScript
    document.getElementById("displayName").innerText = profile.display_name;
    document.getElementById("avatar").setAttribute("src", profile.images[0].url);
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
    // Asegúrate de que `profile.images` y `profile.images[0]` existen antes de intentar acceder a `url`
    if (profile.images && profile.images.length > 0) {
        document.getElementById("imgUrl").innerText = profile.images[0].url;
    }
}


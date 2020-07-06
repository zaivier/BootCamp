import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});

/**
 * ios com Emulador: localhost
 * ior com App Instalado: Ip da Maquina
 * Android com Emulador: Rodar comando "adb reverse tcp:3333 tcp:3333" para redirecionamento de porta.
 * Android FCom Emulador: 10.0.2.2 (Android Studio).
 * Android com Emulador GeyMotion: 10.0.3.2 
 * Android Fisico: Utilizar Ip da Maquina.
 */

 export default api;
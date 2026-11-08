/**
 * main.js — Ponto de entrada da aplicação.
 * Cria a instância Vue a partir do componente raiz App.vue e a monta no DOM.
 */
import { createApp } from 'vue';
import App from './App.vue';
import './assets/estilos.css';

createApp(App).mount('#app');

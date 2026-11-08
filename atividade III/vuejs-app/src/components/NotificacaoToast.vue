<template>
  <div
    class="toasts"
    :class="'toasts--' + posicao"
    aria-live="polite"
    aria-atomic="false"
  >
    <transition-group name="toast">
      <div
        v-for="item in notificacoes"
        :key="item.id"
        class="toast"
        :class="'toast--' + item.tipo"
      >
        <span class="toast__icone" aria-hidden="true">{{ icone(item.tipo) }}</span>

        <div class="toast__corpo">
          <strong class="toast__titulo">{{ titulo(item.tipo) }}</strong>
          <p class="toast__mensagem">{{ item.mensagem }}</p>
        </div>

        <button
          type="button"
          class="toast__fechar"
          aria-label="Fechar notificação"
          @click="fechar(item.id)"
        >
          ×
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import toastService from '../services/toastService.js';

const ICONES = { sucesso: '✓', erro: '!', aviso: '▲', informacao: 'i' };
const TITULOS = {
  sucesso: 'Tudo certo',
  erro: 'Algo deu errado',
  aviso: 'Atenção',
  informacao: 'Informação'
};

export default {
  name: 'NotificacaoToast',

  props: {
    posicao: {
      type: String,
      default: 'superior-direita',
      validator: (v) =>
        ['superior-direita', 'superior-esquerda', 'inferior-direita'].includes(v)
    }
  },

  computed: {
    notificacoes() {
      return toastService.estado.notificacoes;
    }
  },

  methods: {
    fechar(id) {
      toastService.fechar(id);
    },
    icone(tipo) {
      return ICONES[tipo] || ICONES.informacao;
    },
    titulo(tipo) {
      return TITULOS[tipo] || TITULOS.informacao;
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  z-index: 90;
  display: grid;
  gap: 10px;
  width: min(360px, calc(100vw - 24px));
  pointer-events: none;
}

.toasts--superior-direita  { top: 16px; right: 12px; }
.toasts--superior-esquerda { top: 16px; left: 12px; }
.toasts--inferior-direita  { bottom: 16px; right: 12px; }

.toast {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 11px;
  padding: 12px 14px;
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);
  border-left: 4px solid var(--cor-info);
  border-radius: var(--raio-pequeno);
  box-shadow: 0 10px 30px rgba(18, 38, 32, .16);
}

.toast__icone {
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  font-size: .8rem;
  font-weight: 700;
  color: #fff;
  background: var(--cor-info);
}

.toast__titulo { font-size: .88rem; }

.toast__mensagem { font-size: .85rem; color: var(--cor-texto-suave); }

.toast__fechar {
  margin-left: auto;
  background: none;
  border: 0;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  color: var(--cor-texto-suave);
  padding: 0 2px;
}

.toast__fechar:hover { color: var(--cor-texto); }

.toast--sucesso { border-left-color: var(--cor-sucesso); }
.toast--sucesso .toast__icone { background: var(--cor-sucesso); }
.toast--erro { border-left-color: var(--cor-erro); }
.toast--erro .toast__icone { background: var(--cor-erro); }
.toast--aviso { border-left-color: var(--cor-aviso); }
.toast--aviso .toast__icone { background: var(--cor-aviso); }
.toast--informacao { border-left-color: var(--cor-info); }
.toast--informacao .toast__icone { background: var(--cor-info); }

.toast-enter-active, .toast-leave-active { transition: all 240ms ease; }
.toast-enter-from  { opacity: 0; transform: translateX(24px); }
.toast-leave-to    { opacity: 0; transform: translateX(24px); }
.toast-leave-active { position: absolute; width: 100%; }
</style>

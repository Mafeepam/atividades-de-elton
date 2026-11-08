<!--
  COMPONENTE 3 — Barra de Progresso (Progress Bar)

  Uso:
    <BarraProgressoComponent :progresso="progressoUpload"
                             rotulo="Enviando arquivo.pdf"
                             :mostrar-percentual="true" />

  props:    progresso (0–100), rotulo, mostrarPercentual
  computed: valorSeguro (limita entre 0 e 100), classeDaFaixa (cor por estágio)
  emits:    'concluido' uma única vez, quando o progresso chega a 100
-->
<template>
  <div class="progresso">
    <div class="progresso__legenda">
      <span class="progresso__rotulo">{{ rotulo }}</span>
      <span v-if="mostrarPercentual" class="progresso__valor">{{ valorSeguro }}%</span>
    </div>

    <div
      class="progresso__trilho"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-valuenow="valorSeguro"
    >
      <div
        class="progresso__preenchimento"
        :class="classeDaFaixa"
        :style="{ width: valorSeguro + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BarraProgressoComponent',

  props: {
    progresso: { type: Number, required: true },
    rotulo: { type: String, default: 'Progresso' },
    mostrarPercentual: { type: Boolean, default: true }
  },

  emits: ['concluido'],

  computed: {
    /** Garante um valor exibível entre 0 e 100. */
    valorSeguro() {
      const valor = Number(this.progresso);
      if (Number.isNaN(valor)) return 0;
      return Math.max(0, Math.min(100, Math.round(valor)));
    },

    /** Cor da barra conforme o estágio da tarefa. */
    classeDaFaixa() {
      if (this.valorSeguro >= 100) return 'progresso__preenchimento--concluido';
      if (this.valorSeguro >= 60) return 'progresso__preenchimento--avancado';
      return 'progresso__preenchimento--inicial';
    }
  },

  watch: {
    /** Avisa o componente pai assim que a barra completa. */
    valorSeguro(novo, antigo) {
      if (novo === 100 && antigo < 100) {
        this.$emit('concluido');
      }
    }
  }
};
</script>

<style scoped>
.progresso { display: grid; gap: 8px; }

.progresso__legenda {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  font-size: .88rem;
}

.progresso__rotulo { color: var(--cor-texto-suave); }

.progresso__valor {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.progresso__trilho {
  height: 12px;
  border-radius: 999px;
  background: #e5eceb;
  overflow: hidden;
}

.progresso__preenchimento {
  height: 100%;
  width: 0;
  border-radius: 999px;
  transition: width 200ms linear, background 300ms ease;
}

.progresso__preenchimento--inicial   { background: var(--cor-primaria); }
.progresso__preenchimento--avancado  { background: #4a9b7f; }
.progresso__preenchimento--concluido { background: var(--cor-sucesso); }
</style>

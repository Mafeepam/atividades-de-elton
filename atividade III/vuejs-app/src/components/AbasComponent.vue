
<template>
  <div class="abas">
    <div class="abas__barra" role="tablist">
      <button
        v-for="(aba, indice) in itens"
        :key="aba.titulo"
        type="button"
        class="abas__titulo"
        :class="{ 'abas__titulo--ativa': indiceAtivo === indice }"
        role="tab"
        :aria-selected="indiceAtivo === indice"
        @click="selecionar(indice)"
      >
        {{ aba.titulo }}
      </button>
    </div>

    <div v-if="abaAtiva" class="abas__painel" role="tabpanel">
      <p class="abas__texto">{{ abaAtiva.texto }}</p>

      <ul v-if="abaAtiva.topicos && abaAtiva.topicos.length" class="abas__lista">
        <li v-for="topico in abaAtiva.topicos" :key="topico">{{ topico }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AbasComponent',

  props: {
    itens: { type: Array, required: true },
    abaInicial: { type: Number, default: 0 }
  },

  emits: ['trocar'],

  data() {
    return {
      indiceAtivo: this.abaInicial
    };
  },

  computed: {
    abaAtiva() {
      return this.itens[this.indiceAtivo] || null;
    }
  },

  created() {
    if (this.indiceAtivo < 0 || this.indiceAtivo >= this.itens.length) {
      this.indiceAtivo = 0;
    }
  },

  methods: {
    selecionar(indice) {
      if (this.indiceAtivo === indice) return;

      this.indiceAtivo = indice;
      this.$emit('trocar', { indice, aba: this.itens[indice] });
    }
  }
};
</script>

<style scoped>
.abas__barra {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  border-bottom: 1px solid var(--cor-borda);
  margin-bottom: 16px;
  -webkit-overflow-scrolling: touch;
}

.abas__titulo {
  flex: 0 0 auto;
  padding: 10px 14px;
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  font-size: .9rem;
  color: var(--cor-texto-suave);
  white-space: nowrap;
  transition: color var(--transicao), border-color var(--transicao);
}

.abas__titulo:hover { color: var(--cor-primaria); }

.abas__titulo--ativa {
  color: var(--cor-primaria);
  border-bottom-color: var(--cor-primaria);
  font-weight: 600;
}

.abas__texto { font-size: .92rem; color: var(--cor-texto-suave); }

.abas__lista { margin-top: 12px; display: grid; gap: 8px; }

.abas__lista li {
  position: relative;
  padding-left: 22px;
  font-size: .9rem;
}

.abas__lista li::before {
  content: "›";
  position: absolute;
  left: 6px;
  color: var(--cor-primaria);
  font-weight: 700;
}
</style>

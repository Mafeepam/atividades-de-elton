<!--
  COMPONENTE 1 — Acordeão (Accordion)

  Uso:
    <AcordeaoComponent :itens="perguntas" :apenas-um-aberto="true"
                       @alternar="aoAlternarFaq" />

  props:   itens (array de { titulo, conteudo }), apenasUmAberto (boolean)
  data:    indiceAberto / abertosMultiplos — estado local de qual item está aberto
  emits:   'alternar' com { item, indice, aberto }
  hook:    mounted — abre o primeiro item quando `abrirPrimeiro` é verdadeiro
-->
<template>
  <div class="acordeao">
    <div
      v-for="(item, indice) in itens"
      :key="item.titulo"
      class="acordeao__item"
      :class="{ 'acordeao__item--aberto': estaAberto(indice) }"
    >
      <button
        type="button"
        class="acordeao__cabecalho"
        :aria-expanded="estaAberto(indice)"
        @click="alternar(indice)"
      >
        <span class="acordeao__titulo">{{ item.titulo }}</span>
        <span class="acordeao__icone" aria-hidden="true">+</span>
      </button>

      <!-- <transition> do Vue anima a altura do painel ao abrir/fechar -->
      <transition name="expandir">
        <div v-show="estaAberto(indice)" class="acordeao__painel">
          <div class="acordeao__conteudo">{{ item.conteudo }}</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AcordeaoComponent',

  props: {
    /** Lista de { titulo, conteudo } exibida pelo acordeão. */
    itens: {
      type: Array,
      required: true,
      validator: (lista) => lista.every((i) => 'titulo' in i && 'conteudo' in i)
    },
    /** Quando verdadeiro, abrir um item fecha o anterior. */
    apenasUmAberto: {
      type: Boolean,
      default: true
    },
    /** Abre o primeiro item automaticamente ao montar o componente. */
    abrirPrimeiro: {
      type: Boolean,
      default: false
    }
  },

  emits: ['alternar'],

  data() {
    return {
      indiceAberto: -1,      // usado no modo exclusivo
      abertosMultiplos: {}   // usado quando apenasUmAberto = false
    };
  },

  /** Lifecycle hook: roda depois do componente ser inserido no DOM. */
  mounted() {
    if (this.abrirPrimeiro && this.itens.length) {
      this.alternar(0);
    }
  },

  methods: {
    /** Abre/fecha o item e avisa o componente pai via $emit. */
    alternar(indice) {
      if (this.apenasUmAberto) {
        this.indiceAberto = this.indiceAberto === indice ? -1 : indice;
      } else {
        // Reatribuição garante a reatividade do objeto no Vue 3.
        this.abertosMultiplos = {
          ...this.abertosMultiplos,
          [indice]: !this.abertosMultiplos[indice]
        };
      }

      this.$emit('alternar', {
        item: this.itens[indice],
        indice,
        aberto: this.estaAberto(indice)
      });
    },

    estaAberto(indice) {
      return this.apenasUmAberto
        ? this.indiceAberto === indice
        : !!this.abertosMultiplos[indice];
    }
  }
};
</script>

<style scoped>
.acordeao {
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio-pequeno);
  overflow: hidden;
}

.acordeao__item + .acordeao__item {
  border-top: 1px solid var(--cor-borda);
}

.acordeao__cabecalho {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
  transition: background var(--transicao);
}

.acordeao__cabecalho:hover { background: var(--cor-primaria-clara); }

.acordeao__titulo { font-weight: 600; font-size: .95rem; }

.acordeao__icone {
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--cor-primaria-clara);
  color: var(--cor-primaria);
  font-weight: 700;
  transition: transform var(--transicao), background var(--transicao);
}

.acordeao__item--aberto .acordeao__icone {
  transform: rotate(45deg);
  background: var(--cor-primaria);
  color: #fff;
}

.acordeao__conteudo {
  padding: 0 16px 16px;
  font-size: .9rem;
  color: var(--cor-texto-suave);
}

/* Transição suave de expansão/colapso */
.expandir-enter-active,
.expandir-leave-active {
  transition: max-height 280ms ease, opacity 200ms ease;
  overflow: hidden;
  max-height: 320px;
}

.expandir-enter-from,
.expandir-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>

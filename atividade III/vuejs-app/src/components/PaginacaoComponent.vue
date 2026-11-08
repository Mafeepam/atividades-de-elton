<!--
  COMPONENTE 2 — Paginação (Pagination)

  Uso:
    <PaginacaoComponent :pagina-atual="pagina" :total-paginas="totalPaginas"
                        @mudar-pagina="irParaPagina" />

  props:    paginaAtual, totalPaginas
  computed: paginas, naPrimeira, naUltima
  emits:    'mudar-pagina' com o número da página escolhida
-->
<template>
  <nav class="paginacao" aria-label="Navegação entre páginas">
    <button
      type="button"
      class="paginacao__botao paginacao__botao--seta"
      :disabled="naPrimeira"
      @click="selecionar(paginaAtual - 1)"
    >
      &larr;<span class="paginacao__texto"> Anterior</span>
    </button>

    <button
      v-for="numero in paginas"
      :key="numero"
      type="button"
      class="paginacao__botao"
      :class="{ 'paginacao__botao--ativo': numero === paginaAtual }"
      :disabled="numero === paginaAtual"
      @click="selecionar(numero)"
    >
      {{ numero }}
    </button>

    <button
      type="button"
      class="paginacao__botao paginacao__botao--seta"
      :disabled="naUltima"
      @click="selecionar(paginaAtual + 1)"
    >
      <span class="paginacao__texto">Próxima </span>&rarr;
    </button>

    <span class="paginacao__indicador">
      Página <strong>{{ paginaAtual }}</strong> de {{ totalPaginas }}
    </span>
  </nav>
</template>

<script>
export default {
  name: 'PaginacaoComponent',

  props: {
    paginaAtual: { type: Number, required: true },
    totalPaginas: { type: Number, required: true }
  },

  emits: ['mudar-pagina'],

  computed: {
    /** Vetor [1..totalPaginas] usado pelo v-for. */
    paginas() {
      return Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
    },
    naPrimeira() {
      return this.paginaAtual <= 1;
    },
    naUltima() {
      return this.paginaAtual >= this.totalPaginas;
    }
  },

  methods: {
    /** Emite o evento apenas quando a página pedida é válida e diferente. */
    selecionar(pagina) {
      if (pagina === this.paginaAtual || pagina < 1 || pagina > this.totalPaginas) {
        return;
      }
      this.$emit('mudar-pagina', pagina);
    }
  }
};
</script>

<style scoped>
.paginacao {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.paginacao__botao {
  min-width: 38px;
  height: 38px;
  padding: 0 10px;
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio-pequeno);
  background: var(--cor-superficie);
  cursor: pointer;
  font-size: .9rem;
  transition: background var(--transicao), border-color var(--transicao), color var(--transicao);
}

.paginacao__botao:hover:not(:disabled) {
  border-color: var(--cor-primaria);
  color: var(--cor-primaria);
}

.paginacao__botao--ativo,
.paginacao__botao--ativo:disabled {
  background: var(--cor-primaria);
  border-color: var(--cor-primaria);
  color: #fff;
  font-weight: 600;
  opacity: 1;
  cursor: default;
}

.paginacao__botao:disabled { opacity: .42; cursor: not-allowed; }

.paginacao__texto { display: none; }

.paginacao__indicador {
  margin-left: auto;
  font-size: .85rem;
  color: var(--cor-texto-suave);
}

@media (min-width: 640px) {
  .paginacao__texto { display: inline; }
}
</style>

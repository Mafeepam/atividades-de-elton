  <div class="dropdown" :class="{ 'dropdown--aberto': aberto }">
    <button
      type="button"
      class="dropdown__gatilho"
      aria-haspopup="true"
      :aria-expanded="aberto"
      @click.stop="alternar"
    >
      <span class="dropdown__rotulo">{{ rotulo }}:</span>
      <span class="dropdown__selecionada">{{ textoSelecionado }}</span>
      <span class="dropdown__seta" aria-hidden="true">▾</span>
    </button>

    <transition name="suave">
      <ul v-if="aberto" class="dropdown__lista" role="menu">
        <li v-for="opcao in opcoes" :key="opcao.rotulo" role="none">
          <button
            type="button"
            class="dropdown__opcao"
            :class="{ 'dropdown__opcao--ativa': ehSelecionada(opcao) }"
            role="menuitem"
            @click="escolher(opcao)"
          >
            {{ opcao.rotulo }}
          </button>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'MenuSuspensoComponent',

  props: {
    rotulo: { type: String, default: 'Opções' },
    opcoes: { type: Array, required: true },
    selecionada: { type: Object, default: null }
  },

  emits: ['selecionar'],

  data() {
    return { aberto: false };
  },

  computed: {
    textoSelecionado() {
      return this.selecionada ? this.selecionada.rotulo : 'Selecione';
    }
  },

  mounted() {
    document.addEventListener('click', this.fecharAoClicarFora);
    document.addEventListener('keydown', this.fecharComEsc);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.fecharAoClicarFora);
    document.removeEventListener('keydown', this.fecharComEsc);
  },

  methods: {
    alternar() {
      this.aberto = !this.aberto;
    },

    escolher(opcao) {
      this.aberto = false;
      this.$emit('selecionar', opcao);
    },

    ehSelecionada(opcao) {
      return !!this.selecionada && this.selecionada.valor === opcao.valor;
    },

    fecharAoClicarFora(evento) {
      if (this.aberto && !this.$el.contains(evento.target)) {
        this.aberto = false;
      }
    },

    fecharComEsc(evento) {
      if (this.aberto && evento.key === 'Escape') {
        this.aberto = false;
      }
    }
  }
};
</script>

<style scoped>
.dropdown { position: relative; }

.dropdown__gatilho {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio-pequeno);
  background: var(--cor-superficie);
  cursor: pointer;
  font-size: .9rem;
  transition: border-color var(--transicao);
}

.dropdown__gatilho:hover,
.dropdown--aberto .dropdown__gatilho { border-color: var(--cor-primaria); }

.dropdown__rotulo { color: var(--cor-texto-suave); }

.dropdown__selecionada { font-weight: 600; }

.dropdown__seta {
  margin-left: auto;
  color: var(--cor-primaria);
  transition: transform var(--transicao);
}

.dropdown--aberto .dropdown__seta { transform: rotate(180deg); }

.dropdown__lista {
  position: absolute;
  z-index: 40;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 6px;
  list-style: none;
  background: var(--cor-superficie);
  border: 1px solid var(--cor-borda);
  border-radius: var(--raio-pequeno);
  box-shadow: var(--sombra);
  max-height: 260px;
  overflow-y: auto;
}

.dropdown__opcao {
  width: 100%;
  padding: 9px 12px;
  background: none;
  border: 0;
  border-radius: 6px;
  text-align: left;
  cursor: pointer;
  font-size: .9rem;
  transition: background var(--transicao);
}

.dropdown__opcao:hover { background: var(--cor-primaria-clara); }

.dropdown__opcao--ativa {
  background: var(--cor-primaria);
  color: #fff;
  font-weight: 600;
}

.suave-enter-active,
.suave-leave-active { transition: opacity 150ms ease, transform 150ms ease; }

.suave-enter-from,
.suave-leave-to { opacity: 0; transform: translateY(-6px); }
</style>

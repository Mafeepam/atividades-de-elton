<!--
  App.vue — Componente raiz da aplicação.

  Orquestra os 6 componentes visuais: fornece os dados via props e
  responde aos eventos que eles emitem ($emit). Nenhuma regra de
  negócio vive aqui — ela está em src/services/.
-->
<template>
  <div class="aplicacao">

    <!-- ============================ CABEÇALHO ============================ -->
    <header class="cabecalho">
      <div class="container cabecalho__interno">
        <div class="marca">
          <span class="marca__simbolo" aria-hidden="true">&lt;/&gt;</span>
          <div>
            <h1 class="marca__nome">EduTech</h1>
            <p class="marca__descricao">Portal de cursos — Engenharia de Software</p>
          </div>
        </div>
        <span class="etiqueta">Vue 3 · 6 componentes</span>
      </div>
    </header>

    <main class="container conteudo">

      <!-- ============ COMPONENTE 5: MENU SUSPENSO + CATÁLOGO ============ -->
      <section class="secao">
        <div class="secao__cabecalho">
          <div>
            <h2 class="secao__titulo">Catálogo de cursos</h2>
            <p class="secao__subtitulo">
              Exibindo {{ cursos.length }} de {{ totalCursos }} cursos
              <span v-if="categoriaSelecionada && categoriaSelecionada.valor">
                na categoria <strong>{{ categoriaSelecionada.rotulo }}</strong>
              </span>
            </p>
          </div>

          <MenuSuspensoComponent
            rotulo="Categoria"
            :opcoes="categorias"
            :selecionada="categoriaSelecionada"
            @selecionar="aplicarFiltroCategoria"
          />
        </div>

        <div class="grade-cursos">
          <article v-for="curso in cursos" :key="curso.id" class="curso">
            <span class="curso__categoria">{{ curso.categoria }}</span>
            <h3 class="curso__nome">{{ curso.nome }}</h3>

            <dl class="curso__dados">
              <div>
                <dt>Carga horária</dt>
                <dd>{{ curso.cargaHoraria }}h</dd>
              </div>
              <div>
                <dt>Avaliação</dt>
                <dd>{{ curso.nota.toFixed(1) }} ★</dd>
              </div>
              <div>
                <dt>Matrículas</dt>
                <dd>{{ formatarMilhar(curso.matriculas) }}</dd>
              </div>
            </dl>

            <p class="curso__preco">{{ formatarMoeda(curso.preco) }}</p>
          </article>
        </div>

        <!-- ================= COMPONENTE 2: PAGINAÇÃO ================= -->
        <PaginacaoComponent
          :pagina-atual="pagina"
          :total-paginas="totalPaginas"
          @mudar-pagina="irParaPagina"
        />
      </section>

      <div class="colunas">
        <!-- ================= COMPONENTE 1: ACORDEÃO ================= -->
        <section class="secao">
          <h2 class="secao__titulo">Perguntas frequentes</h2>
          <p class="secao__subtitulo">Apenas uma resposta fica aberta por vez.</p>

          <AcordeaoComponent
            :itens="perguntasFrequentes"
            :apenas-um-aberto="true"
            @alternar="registrarAberturaFaq"
          />
        </section>

        <!-- ================= COMPONENTE 4: ABAS ================= -->
        <section class="secao">
          <h2 class="secao__titulo">Trilha Full Stack</h2>
          <p class="secao__subtitulo">Detalhes organizados em painéis.</p>

          <AbasComponent :itens="abasTrilha" :aba-inicial="0" @trocar="aoTrocarAba" />
        </section>
      </div>

      <div class="colunas">
        <!-- ============= COMPONENTE 3: BARRA DE PROGRESSO ============= -->
        <section class="secao">
          <h2 class="secao__titulo">Envio de material</h2>
          <p class="secao__subtitulo">
            Progresso controlado por <code>catalogoService.simularUpload()</code>.
          </p>

          <BarraProgressoComponent
            :progresso="progressoUpload"
            :rotulo="'Enviando ' + nomeArquivo"
            :mostrar-percentual="true"
            @concluido="aoConcluirUpload"
          />

          <div class="acoes">
            <button
              type="button"
              class="botao botao--primario"
              :disabled="uploadAtivo"
              @click="iniciarUpload"
            >
              {{ uploadAtivo ? 'Enviando…' : 'Iniciar envio' }}
            </button>
            <button
              type="button"
              class="botao botao--neutro"
              :disabled="!uploadAtivo"
              @click="cancelarUpload"
            >
              Cancelar
            </button>
          </div>

          <!-- O mesmo componente reaproveitado com outros dados -->
          <div class="bloco-separado">
            <p class="secao__subtitulo">Progresso do aluno em cada módulo:</p>

            <div class="pilha-progressos">
              <BarraProgressoComponent
                v-for="modulo in modulosTrilha"
                :key="modulo.nome"
                :progresso="modulo.concluido"
                :rotulo="modulo.nome"
              />
            </div>
          </div>
        </section>

        <!-- ============= COMPONENTE 6: NOTIFICAÇÃO TOAST ============= -->
        <section class="secao">
          <h2 class="secao__titulo">Inscrição na newsletter</h2>
          <p class="secao__subtitulo">Cada ação devolve uma notificação Toast.</p>

          <form class="formulario" novalidate @submit.prevent="enviarInscricao">
            <label class="campo">
              <span class="campo__rotulo">Nome completo</span>
              <!-- v-model: two-way data binding -->
              <input
                v-model="inscricao.nome"
                type="text"
                class="campo__entrada"
                placeholder="Maria Silva"
              >
            </label>

            <label class="campo">
              <span class="campo__rotulo">E-mail</span>
              <input
                v-model="inscricao.email"
                type="email"
                class="campo__entrada"
                placeholder="maria@exemplo.com"
              >
            </label>

            <label class="campo campo--linha">
              <input v-model="inscricao.receberNovidades" type="checkbox">
              <span>Quero receber novidades sobre novas turmas</span>
            </label>

            <!-- computed property reagindo ao v-model -->
            <p v-if="inscricao.nome || inscricao.email" class="previa">
              Pré-visualização: {{ resumoInscricao }}
            </p>

            <button type="submit" class="botao botao--primario">
              Confirmar inscrição
            </button>
          </form>

          <div class="acoes acoes--topo">
            <span class="acoes__rotulo">Testar os tipos de notificação:</span>
            <button type="button" class="botao botao--mini botao--sucesso" @click="demonstrarToast('sucesso')">Sucesso</button>
            <button type="button" class="botao botao--mini botao--erro"    @click="demonstrarToast('erro')">Erro</button>
            <button type="button" class="botao botao--mini botao--aviso"   @click="demonstrarToast('aviso')">Aviso</button>
            <button type="button" class="botao botao--mini botao--info"    @click="demonstrarToast('informacao')">Informação</button>
          </div>
        </section>
      </div>
    </main>

    <footer class="rodape">
      <div class="container">
        <p>Universidade Católica do Salvador — Escola de Tecnologias</p>
        <p>Atividade III — Desafio Extra Vue.js · Professor Elton Figueiredo da Silva</p>
      </div>
    </footer>

    <!-- Pilha de notificações, fora do fluxo da página -->
    <NotificacaoToast posicao="superior-direita" />
  </div>
</template>

<script>
import AcordeaoComponent from './components/AcordeaoComponent.vue';
import PaginacaoComponent from './components/PaginacaoComponent.vue';
import BarraProgressoComponent from './components/BarraProgressoComponent.vue';
import AbasComponent from './components/AbasComponent.vue';
import MenuSuspensoComponent from './components/MenuSuspensoComponent.vue';
import NotificacaoToast from './components/NotificacaoToast.vue';

import toastService from './services/toastService.js';
import {
  listarCategorias,
  contarPaginas,
  buscarPagina,
  totalDe,
  simularUpload,
  ITENS_POR_PAGINA
} from './services/catalogoService.js';

export default {
  name: 'App',

  components: {
    AcordeaoComponent,
    PaginacaoComponent,
    BarraProgressoComponent,
    AbasComponent,
    MenuSuspensoComponent,
    NotificacaoToast
  },

  data() {
    return {
      // Catálogo
      pagina: 1,
      categorias: listarCategorias(),
      categoriaSelecionada: null,
      itensPorPagina: ITENS_POR_PAGINA,

      // Upload
      progressoUpload: 0,
      nomeArquivo: 'plano-de-estudos.pdf',
      cancelarSimulacao: null,

      // O mesmo componente de progresso com outro conjunto de dados
      modulosTrilha: [
        { nome: 'Bloco 1 — Fundamentos', concluido: 100 },
        { nome: 'Bloco 2 — Front-end',   concluido: 72 },
        { nome: 'Bloco 3 — Back-end',    concluido: 35 },
        { nome: 'Bloco 4 — Engenharia',  concluido: 0 }
      ],

      // Formulário (two-way binding com v-model)
      inscricao: {
        nome: '',
        email: '',
        receberNovidades: true
      },

      // Conteúdo do acordeão
      perguntasFrequentes: [
        {
          titulo: 'Como funciona o acesso às aulas?',
          conteudo:
            'Após a matrícula o acesso é liberado imediatamente e permanece ' +
            'disponível por 12 meses, sem limite de visualizações. As aulas podem ' +
            'ser assistidas no computador, tablet ou celular.'
        },
        {
          titulo: 'Existe certificado de conclusão?',
          conteudo:
            'Sim. O certificado digital é emitido automaticamente quando o aluno ' +
            'conclui 80% das aulas e entrega o projeto final da trilha escolhida.'
        },
        {
          titulo: 'Posso trocar de curso depois de matriculado?',
          conteudo:
            'A troca pode ser solicitada uma vez por semestre, dentro dos ' +
            'primeiros 30 dias de acesso, diretamente pelo painel do aluno.'
        },
        {
          titulo: 'Qual é a política de reembolso?',
          conteudo:
            'O reembolso integral pode ser pedido em até 7 dias corridos após a ' +
            'compra, conforme o Código de Defesa do Consumidor, sem necessidade de ' +
            'justificativa.'
        },
        {
          titulo: 'As aulas têm legenda e material de apoio?',
          conteudo:
            'Todas as aulas possuem legenda em português e cada módulo acompanha ' +
            'slides, código-fonte comentado e uma lista de exercícios resolvidos.'
        }
      ],

      // Conteúdo das abas
      abasTrilha: [
        {
          titulo: 'Visão geral',
          texto:
            'A trilha de Desenvolvimento Web Full Stack reúne 18 cursos organizados ' +
            'em uma sequência progressiva, partindo da lógica de programação até a ' +
            'publicação de uma aplicação completa em produção.',
          topicos: [
            '18 cursos e 820 horas de conteúdo',
            'Projeto integrador ao final de cada módulo',
            'Mentoria coletiva quinzenal'
          ]
        },
        {
          titulo: 'Conteúdo programático',
          texto:
            'O programa está dividido em quatro blocos que podem ser cursados na ' +
            'ordem sugerida ou de forma independente, conforme o nível do aluno.',
          topicos: [
            'Bloco 1 — Fundamentos: lógica, Git e algoritmos',
            'Bloco 2 — Front-end: HTML, CSS, JavaScript, AngularJS e Vue.js',
            'Bloco 3 — Back-end: Node.js, APIs REST e banco de dados',
            'Bloco 4 — Engenharia: testes, arquitetura e boas práticas'
          ]
        },
        {
          titulo: 'Requisitos',
          texto:
            'Não é exigido conhecimento prévio em programação. É necessário apenas ' +
            'um computador com acesso à internet e disponibilidade de estudo semanal.',
          topicos: [
            'Computador com 4 GB de memória ou mais',
            'Navegador atualizado (Chrome, Firefox ou Edge)',
            'Dedicação sugerida de 8 horas semanais'
          ]
        },
        {
          titulo: 'Avaliação',
          texto:
            'A nota final combina a entrega dos projetos práticos, a participação ' +
            'nas mentorias e o resultado das avaliações objetivas de cada módulo.',
          topicos: [
            'Projetos práticos — 60% da nota',
            'Avaliações objetivas — 30% da nota',
            'Participação nas mentorias — 10% da nota'
          ]
        }
      ]
    };
  },

  computed: {
    /** Categoria ativa em formato simples (ou null). */
    filtroAtual() {
      return this.categoriaSelecionada ? this.categoriaSelecionada.valor : null;
    },

    /** Recorte de cursos da página atual — recalculado automaticamente. */
    cursos() {
      return buscarPagina(this.pagina, this.filtroAtual);
    },

    totalPaginas() {
      return contarPaginas(this.filtroAtual);
    },

    totalCursos() {
      return totalDe(this.filtroAtual);
    },

    /** Prova visual do two-way binding do formulário. */
    resumoInscricao() {
      const nome = this.inscricao.nome || 'sem nome';
      const email = this.inscricao.email || 'sem e-mail';
      return `${nome} <${email}>`;
    },

    uploadAtivo() {
      return this.cancelarSimulacao !== null;
    }
  },

  /** Lifecycle hook: a aplicação acabou de ser montada no DOM. */
  mounted() {
    toastService.informacao('Bem-vindo ao portal EduTech — versão Vue.js.', 3500);
  },

  /** Lifecycle hook: evita deixar o intervalo rodando ao destruir. */
  beforeUnmount() {
    this.cancelarUpload();
  },

  methods: {
    /* ---------------- Catálogo ---------------- */

    /** Recebido do componente <PaginacaoComponent> via $emit. */
    irParaPagina(pagina) {
      this.pagina = pagina;
    },

    /** Recebido do componente <MenuSuspensoComponent> via $emit. */
    aplicarFiltroCategoria(opcao) {
      this.categoriaSelecionada = opcao;
      this.pagina = 1;

      toastService.informacao(
        opcao.valor
          ? `Filtro aplicado: ${opcao.rotulo} (${this.totalCursos} cursos).`
          : `Filtro removido. Exibindo os ${this.totalCursos} cursos do catálogo.`
      );
    },

    /* ---------------- Upload ---------------- */

    iniciarUpload() {
      if (this.uploadAtivo) return;

      this.progressoUpload = 0;
      this.cancelarSimulacao = simularUpload(
        (valor) => { this.progressoUpload = valor; },
        () => { this.cancelarSimulacao = null; }
      );
    },

    cancelarUpload() {
      if (!this.cancelarSimulacao) return;

      this.cancelarSimulacao();
      this.cancelarSimulacao = null;
      toastService.aviso(`Envio interrompido em ${this.progressoUpload}%.`);
    },

    /** Recebido do componente <BarraProgressoComponent> via $emit. */
    aoConcluirUpload() {
      toastService.sucesso(`Arquivo "${this.nomeArquivo}" enviado com sucesso.`);
    },

    /* ---------------- Formulário ---------------- */

    enviarInscricao() {
      if (!this.inscricao.nome || !this.inscricao.email) {
        toastService.erro('Preencha nome e e-mail para concluir a inscrição.');
        return;
      }
      if (!this.inscricao.email.includes('@')) {
        toastService.erro('O e-mail informado não parece válido.');
        return;
      }

      toastService.sucesso(`Inscrição de ${this.inscricao.nome} confirmada.`);
      this.inscricao = { nome: '', email: '', receberNovidades: true };
    },

    /* ---------------- Eventos dos componentes ---------------- */

    /** Recebido do componente <AcordeaoComponent> via $emit. */
    registrarAberturaFaq({ item, aberto }) {
      if (aberto) {
        toastService.informacao(`Você abriu: "${item.titulo}"`, 2500);
      }
    },

    /** Recebido do componente <AbasComponent> via $emit. */
    aoTrocarAba({ aba }) {
      toastService.informacao(`Aba selecionada: ${aba.titulo}`, 2000);
    },

    demonstrarToast(tipo) {
      const mensagens = {
        sucesso: 'Matrícula registrada no curso selecionado.',
        erro: 'Não foi possível conectar ao servidor de pagamentos.',
        aviso: 'Sua assinatura vence em 3 dias.',
        informacao: 'Novas turmas abrem na próxima segunda-feira.'
      };
      toastService[tipo](mensagens[tipo]);
    },

    /* ---------------- Formatação ----------------
       O Vue 3 removeu os filtros do Vue 2; a formatação passa a ser
       feita por métodos ou computed properties.                     */

    /** 259.9 -> "R$ 259,90" */
    formatarMoeda(valor) {
      return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`;
    },

    /** 3310 -> "3.310" */
    formatarMilhar(valor) {
      return String(valor).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  }
};
</script>

<style scoped>
.bloco-separado {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--cor-borda);
}

.pilha-progressos {
  display: grid;
  gap: 14px;
  margin-top: 14px;
}
</style>

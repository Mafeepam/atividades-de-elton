/**
 * mainController.js — Controlador principal da página.
 *
 * Liga os dados fornecidos pelos serviços/factories às 6 diretivas visuais.
 * Demonstra: $scope, ng-model (two-way data binding), ng-click, ng-change,
 * injeção de serviços e uso de factory.
 */
(function () {
  'use strict';

  angular
    .module('eduTechApp')
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', 'catalogoFactory', 'toastService', 'uploadService'];

  function MainController($scope, catalogoFactory, toastService, uploadService) {

 
    $scope.pagina = 1;
    $scope.categoriaSelecionada = null;
    $scope.categorias = catalogoFactory.listarCategorias();
    $scope.cursos = [];
    $scope.totalPaginas = 1;
    $scope.totalCursos = 0;
    $scope.itensPorPagina = catalogoFactory.itensPorPagina;

    $scope.inscricao = {
      nome: '',
      email: '',
      receberNovidades: true
    };

    $scope.progressoUpload = 0;
    $scope.nomeArquivo = 'plano-de-estudos.pdf';
    $scope.uploadAtivo = function () { return uploadService.emAndamento; };

    $scope.modulosTrilha = [
      { nome: 'Bloco 1 — Fundamentos', concluido: 100 },
      { nome: 'Bloco 2 — Front-end',   concluido: 72  },
      { nome: 'Bloco 3 — Back-end',    concluido: 35  },
      { nome: 'Bloco 4 — Engenharia',  concluido: 0   }
    ];

    $scope.perguntasFrequentes = [
      {
        titulo: 'Como funciona o acesso às aulas?',
        conteudo: 'Após a matrícula o acesso é liberado imediatamente e permanece ' +
                  'disponível por 12 meses, sem limite de visualizações. As aulas ' +
                  'podem ser assistidas no computador, tablet ou celular.'
      },
      {
        titulo: 'Existe certificado de conclusão?',
        conteudo: 'Sim. O certificado digital é emitido automaticamente quando o aluno ' +
                  'conclui 80% das aulas e entrega o projeto final da trilha escolhida.'
      },
      {
        titulo: 'Posso trocar de curso depois de matriculado?',
        conteudo: 'A troca pode ser solicitada uma vez por semestre, dentro dos ' +
                  'primeiros 30 dias de acesso, diretamente pelo painel do aluno.'
      },
      {
        titulo: 'Qual é a política de reembolso?',
        conteudo: 'O reembolso integral pode ser pedido em até 7 dias corridos após a ' +
                  'compra, conforme o Código de Defesa do Consumidor, sem necessidade ' +
                  'de justificativa.'
      },
      {
        titulo: 'As aulas têm legenda e material de apoio?',
        conteudo: 'Todas as aulas possuem legenda em português e cada módulo acompanha ' +
                  'slides, código-fonte comentado e uma lista de exercícios resolvidos.'
      }
    ];

    $scope.abasTrilha = [
      {
        titulo: 'Visão geral',
        texto: 'A trilha de Desenvolvimento Web Full Stack reúne 18 cursos organizados ' +
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
        texto: 'O programa está dividido em quatro blocos que podem ser cursados na ' +
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
        texto: 'Não é exigido conhecimento prévio em programação. É necessário apenas ' +
               'um computador com acesso à internet e disponibilidade de estudo semanal.',
        topicos: [
          'Computador com 4 GB de memória ou mais',
          'Navegador atualizado (Chrome, Firefox ou Edge)',
          'Dedicação sugerida de 8 horas semanais'
        ]
      },
      {
        titulo: 'Avaliação',
        texto: 'A nota final combina a entrega dos projetos práticos, a participação ' +
               'nas mentorias e o resultado das avaliações objetivas de cada módulo.',
        topicos: [
          'Projetos práticos — 60% da nota',
          'Avaliações objetivas — 30% da nota',
          'Participação nas mentorias — 10% da nota'
        ]
      }
    ];

    $scope.irParaPagina = irParaPagina;
    $scope.aplicarFiltroCategoria = aplicarFiltroCategoria;
    $scope.simularUpload = simularUpload;
    $scope.cancelarUpload = cancelarUpload;
    $scope.enviarInscricao = enviarInscricao;
    $scope.aoDigitarNome = aoDigitarNome;
    $scope.registrarAberturaFaq = registrarAberturaFaq;
    $scope.demonstrarToast = demonstrarToast;

    carregarPagina();

    function carregarPagina() {
      var categoria = $scope.categoriaSelecionada
        ? $scope.categoriaSelecionada.valor
        : null;

      $scope.totalPaginas = catalogoFactory.contarPaginas(categoria);
      $scope.totalCursos = catalogoFactory.totalDe(categoria);

      if ($scope.pagina > $scope.totalPaginas) {
        $scope.pagina = $scope.totalPaginas;
      }

      $scope.cursos = catalogoFactory.buscarPagina($scope.pagina, categoria);
    }

    function irParaPagina(pagina) {
      $scope.pagina = pagina;
      carregarPagina();
    }

    function aplicarFiltroCategoria(opcao) {
      $scope.categoriaSelecionada = opcao;
      $scope.pagina = 1;
      carregarPagina();

      toastService.informacao(
        opcao.valor
          ? 'Filtro aplicado: ' + opcao.rotulo + ' (' + $scope.totalCursos + ' cursos).'
          : 'Filtro removido. Exibindo os ' + $scope.totalCursos + ' cursos do catálogo.'
      );
    }

    function simularUpload() {
      $scope.progressoUpload = 0;

      uploadService.iniciar(
        function aoProgredir(valor) {
          $scope.progressoUpload = valor;
        },
        function aoConcluir() {
          toastService.sucesso('Arquivo "' + $scope.nomeArquivo + '" enviado com sucesso.');
        }
      );
    }

    function cancelarUpload() {
      uploadService.cancelar();
      toastService.aviso('Envio interrompido em ' + $scope.progressoUpload + '%.');
    }

    function enviarInscricao() {
      if (!$scope.inscricao.nome || !$scope.inscricao.email) {
        toastService.erro('Preencha nome e e-mail para concluir a inscrição.');
        return;
      }
      if ($scope.inscricao.email.indexOf('@') === -1) {
        toastService.erro('O e-mail informado não parece válido.');
        return;
      }

      toastService.sucesso('Inscrição de ' + $scope.inscricao.nome + ' confirmada.');
      $scope.inscricao = { nome: '', email: '', receberNovidades: true };
    }

    function aoDigitarNome() {
      if ($scope.inscricao.nome.length === 20) {
        toastService.aviso('O nome está ficando longo — use o nome e o sobrenome.');
      }
    }

    function registrarAberturaFaq(item, aberto) {
      if (aberto) {
        toastService.informacao('Você abriu: "' + item.titulo + '"', 2500);
      }
    }

    function demonstrarToast(tipo) {
      var mensagens = {
        sucesso: 'Matrícula registrada no curso selecionado.',
        erro: 'Não foi possível conectar ao servidor de pagamentos.',
        aviso: 'Sua assinatura vence em 3 dias.',
        informacao: 'Novas turmas abrem na próxima segunda-feira.'
      };
      toastService[tipo](mensagens[tipo]);
    }
  }
})();

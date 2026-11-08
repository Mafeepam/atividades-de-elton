(function () {
  'use strict';

  angular
    .module('eduTech.components')
    .directive('paginacao', paginacao);

  function paginacao() {
    return {
      restrict: 'E',
      scope: {
        paginaAtual: '=',
        totalPaginas: '=',
        aoMudarPagina: '&'
      },
      template: [
        '<nav class="paginacao" aria-label="Navegação entre páginas">',
        '  <button type="button" class="paginacao__botao paginacao__botao--seta"',
        '          ng-disabled="$ctrl.naPrimeira()"',
        '          ng-click="$ctrl.anterior()">&larr;<span class="paginacao__texto"> Anterior</span></button>',
        '',
        '  <button type="button" class="paginacao__botao"',
        '          ng-repeat="numero in $ctrl.paginas() track by $index"',
        '          ng-class="{ \'paginacao__botao--ativo\': numero === $ctrl.paginaAtual }"',
        '          ng-disabled="numero === $ctrl.paginaAtual"',
        '          ng-click="$ctrl.selecionar(numero)">{{ numero }}</button>',
        '',
        '  <button type="button" class="paginacao__botao paginacao__botao--seta"',
        '          ng-disabled="$ctrl.naUltima()"',
        '          ng-click="$ctrl.proxima()"><span class="paginacao__texto">Próxima </span>&rarr;</button>',
        '',
        '  <span class="paginacao__indicador">',
        '    Página <strong>{{ $ctrl.paginaAtual }}</strong> de {{ $ctrl.totalPaginas }}',
        '  </span>',
        '</nav>'
      ].join('\n'),
      controller: PaginacaoController,
      controllerAs: '$ctrl',
      bindToController: true
    };
  }

  function PaginacaoController() {
    var vm = this;

    vm.paginas = paginas;
    vm.selecionar = selecionar;
    vm.anterior = anterior;
    vm.proxima = proxima;
    vm.naPrimeira = naPrimeira;
    vm.naUltima = naUltima;

    function paginas() {
      var lista = [];
      for (var i = 1; i <= (vm.totalPaginas || 1); i++) {
        lista.push(i);
      }
      return lista;
    }

    function naPrimeira() {
      return vm.paginaAtual <= 1;
    }

    function naUltima() {
      return vm.paginaAtual >= vm.totalPaginas;
    }

    function selecionar(pagina) {
      if (pagina === vm.paginaAtual || pagina < 1 || pagina > vm.totalPaginas) {
        return;
      }
      vm.aoMudarPagina({ pagina: pagina });
    }

    function anterior() {
      if (!naPrimeira()) {
        selecionar(vm.paginaAtual - 1);
      }
    }

    function proxima() {
      if (!naUltima()) {
        selecionar(vm.paginaAtual + 1);
      }
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('eduTech.components')
    .directive('acordeao', acordeao);

  function acordeao() {
    return {
      restrict: 'E',
      scope: {
        itens: '=',
        apenasUmAberto: '=?',
        aoAlternar: '&?'
      },
      template: [
        '<div class="acordeao">',
        '  <div class="acordeao__item" ng-repeat="item in $ctrl.itens track by $index"',
        '       ng-class="{ \'acordeao__item--aberto\': $ctrl.estaAberto($index) }">',
        '    <button type="button" class="acordeao__cabecalho"',
        '            ng-click="$ctrl.alternar($index)"',
        '            aria-expanded="{{ $ctrl.estaAberto($index) }}">',
        '      <span class="acordeao__titulo">{{ item.titulo }}</span>',
        '      <span class="acordeao__icone" aria-hidden="true">+</span>',
        '    </button>',
        '    <div class="acordeao__painel">',
        '      <div class="acordeao__conteudo">{{ item.conteudo }}</div>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n'),
      controller: AcordeaoController,
      controllerAs: '$ctrl',
      bindToController: true
    };
  }

  function AcordeaoController() {
    var vm = this;

    vm.indiceAberto = -1;
    vm.apenasUmAberto = angular.isDefined(vm.apenasUmAberto) ? vm.apenasUmAberto : true;
    vm.abertosMultiplos = {}; 

    vm.alternar = alternar;
    vm.estaAberto = estaAberto;

    function alternar(indice) {
      if (vm.apenasUmAberto) {
        vm.indiceAberto = (vm.indiceAberto === indice) ? -1 : indice;
      } else {
        vm.abertosMultiplos[indice] = !vm.abertosMultiplos[indice];
      }

      if (angular.isFunction(vm.aoAlternar)) {
        vm.aoAlternar({
          item: vm.itens[indice],
          indice: indice,
          aberto: estaAberto(indice)
        });
      }
    }

    function estaAberto(indice) {
      return vm.apenasUmAberto
        ? vm.indiceAberto === indice
        : !!vm.abertosMultiplos[indice];
    }
  }
})();

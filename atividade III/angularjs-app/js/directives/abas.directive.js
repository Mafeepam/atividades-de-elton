(function () {
  'use strict';

  angular
    .module('eduTech.components')
    .directive('abas', abas);

  function abas() {
    return {
      restrict: 'E',
      scope: {
        itens: '=',
        abaInicial: '=?',
        aoTrocar: '&?'
      },
      template: [
        '<div class="abas">',
        '  <div class="abas__barra" role="tablist">',
        '    <button type="button" class="abas__titulo"',
        '            ng-repeat="aba in $ctrl.itens track by $index"',
        '            ng-class="{ \'abas__titulo--ativa\': $ctrl.indiceAtivo === $index }"',
        '            ng-click="$ctrl.selecionar($index)"',
        '            role="tab" aria-selected="{{ $ctrl.indiceAtivo === $index }}">',
        '      {{ aba.titulo }}',
        '    </button>',
        '  </div>',
        '',
        '  <div class="abas__painel" role="tabpanel"',
        '       ng-repeat="aba in $ctrl.itens track by $index"',
        '       ng-if="$ctrl.indiceAtivo === $index">',
        '    <p class="abas__texto">{{ aba.texto }}</p>',
        '    <ul class="abas__lista" ng-if="aba.topicos.length">',
        '      <li ng-repeat="topico in aba.topicos track by $index">{{ topico }}</li>',
        '    </ul>',
        '  </div>',
        '</div>'
      ].join('\n'),
      controller: AbasController,
      controllerAs: '$ctrl',
      bindToController: true
    };
  }

  function AbasController() {
    var vm = this;

    vm.indiceAtivo = angular.isNumber(vm.abaInicial) ? vm.abaInicial : 0;
    vm.selecionar = selecionar;

    function selecionar(indice) {
      if (vm.indiceAtivo === indice) {
        return;
      }
      vm.indiceAtivo = indice;

      if (angular.isFunction(vm.aoTrocar)) {
        vm.aoTrocar({ indice: indice, aba: vm.itens[indice] });
      }
    }
  }
})();

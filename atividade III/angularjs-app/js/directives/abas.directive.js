/**
 * abas.directive.js — COMPONENTE 4: Abas (Tabs)
 *
 * Uso:
 *   <abas itens="vm.abasPerfil" aba-inicial="0"></abas>
 *
 * Bindings (escopo isolado):
 *   itens       = (two-way) array de { titulo, texto, topicos[] }
 *   abaInicial  = (two-way) índice da aba aberta ao carregar
 *   aoTrocar    & (callback) disparado com { indice, aba }
 *
 * A diretiva guarda no próprio $scope qual aba está ativa e mostra
 * apenas o painel correspondente.
 */
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

    // Estado interno: índice da aba ativa.
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

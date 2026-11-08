/**
 * menuSuspenso.directive.js — COMPONENTE 5: Menu Suspenso (Dropdown Menu)
 *
 * Uso:
 *   <menu-suspenso rotulo="Categoria"
 *                  opcoes="vm.categorias"
 *                  selecionada="vm.categoriaSelecionada"
 *                  ao-selecionar="vm.filtrarPorCategoria(opcao)"></menu-suspenso>
 *
 * Bindings (escopo isolado):
 *   rotulo       @ (texto)   nome do filtro exibido antes da seleção
 *   opcoes       = (two-way) array de { rotulo, valor }
 *   selecionada  = (two-way) opção atualmente escolhida
 *   aoSelecionar & (callback) recebe { opcao }
 *
 * Fecha ao escolher uma opção, ao clicar fora (listener em $document)
 * e ao pressionar ESC.
 */
(function () {
  'use strict';

  angular
    .module('eduTech.components')
    .directive('menuSuspenso', menuSuspenso);

  menuSuspenso.$inject = ['$document'];

  function menuSuspenso($document) {
    return {
      restrict: 'E',
      scope: {
        rotulo: '@',
        opcoes: '=',
        selecionada: '=?',
        aoSelecionar: '&?'
      },
      template: [
        '<div class="dropdown" ng-class="{ \'dropdown--aberto\': $ctrl.aberto }">',
        '  <button type="button" class="dropdown__gatilho"',
        '          ng-click="$ctrl.alternar($event)"',
        '          aria-haspopup="true" aria-expanded="{{ $ctrl.aberto }}">',
        '    <span class="dropdown__rotulo">{{ $ctrl.rotulo }}:</span>',
        '    <span class="dropdown__selecionada">{{ $ctrl.textoSelecionado() }}</span>',
        '    <span class="dropdown__seta" aria-hidden="true">▾</span>',
        '  </button>',
        '',
        '  <ul class="dropdown__lista" ng-if="$ctrl.aberto" role="menu">',
        '    <li ng-repeat="opcao in $ctrl.opcoes track by $index" role="none">',
        '      <button type="button" class="dropdown__opcao" role="menuitem"',
        '              ng-class="{ \'dropdown__opcao--ativa\': $ctrl.ehSelecionada(opcao) }"',
        '              ng-click="$ctrl.escolher(opcao)">',
        '        {{ opcao.rotulo }}',
        '      </button>',
        '    </li>',
        '  </ul>',
        '</div>'
      ].join('\n'),
      controller: MenuSuspensoController,
      controllerAs: '$ctrl',
      bindToController: true,

      /**
       * link: registra os listeners de "clicar fora" e "ESC".
       * Eles são removidos no $destroy para não vazar memória.
       */
      link: function (scope, element, attrs, ctrl) {
        function fecharAoClicarFora(evento) {
          if (!element[0].contains(evento.target) && ctrl.aberto) {
            scope.$apply(function () {
              ctrl.aberto = false;
            });
          }
        }

        function fecharComEsc(evento) {
          if (evento.keyCode === 27 && ctrl.aberto) {
            scope.$apply(function () {
              ctrl.aberto = false;
            });
          }
        }

        $document.on('click', fecharAoClicarFora);
        $document.on('keydown', fecharComEsc);

        scope.$on('$destroy', function () {
          $document.off('click', fecharAoClicarFora);
          $document.off('keydown', fecharComEsc);
        });
      }
    };
  }

  function MenuSuspensoController() {
    var vm = this;

    vm.aberto = false;
    vm.alternar = alternar;
    vm.escolher = escolher;
    vm.ehSelecionada = ehSelecionada;
    vm.textoSelecionado = textoSelecionado;

    /** Abre/fecha o menu. stopPropagation evita o fechamento imediato. */
    function alternar(evento) {
      evento.stopPropagation();
      vm.aberto = !vm.aberto;
    }

    /** Seleciona uma opção, fecha o menu e avisa o componente pai. */
    function escolher(opcao) {
      vm.selecionada = opcao;
      vm.aberto = false;

      if (angular.isFunction(vm.aoSelecionar)) {
        vm.aoSelecionar({ opcao: opcao });
      }
    }

    function ehSelecionada(opcao) {
      return !!vm.selecionada && vm.selecionada.valor === opcao.valor;
    }

    function textoSelecionado() {
      return vm.selecionada ? vm.selecionada.rotulo : 'Selecione';
    }
  }
})();

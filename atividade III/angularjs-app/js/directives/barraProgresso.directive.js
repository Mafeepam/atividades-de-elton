/**
 * barraProgresso.directive.js — COMPONENTE 3: Barra de Progresso (Progress Bar)
 *
 * Uso:
 *   <barra-progresso progresso="vm.progressoUpload"
 *                    rotulo="Enviando material.pdf"
 *                    mostrar-percentual="true"></barra-progresso>
 *
 * Bindings (escopo isolado):
 *   progresso         = (two-way) número de 0 a 100
 *   rotulo            @ (texto)   descrição da tarefa em andamento
 *   mostrarPercentual = (two-way) exibe ou não o número ao lado da barra
 *
 * A largura do preenchimento é calculada a partir do valor recebido,
 * com ng-style, e muda de cor conforme a faixa de progresso.
 */
(function () {
  'use strict';

  angular
    .module('eduTech.components')
    .directive('barraProgresso', barraProgresso);

  function barraProgresso() {
    return {
      restrict: 'E',
      scope: {
        progresso: '=',
        rotulo: '@',
        mostrarPercentual: '=?'
      },
      template: [
        '<div class="progresso">',
        '  <div class="progresso__legenda">',
        '    <span class="progresso__rotulo">{{ $ctrl.rotulo || "Progresso" }}</span>',
        '    <span class="progresso__valor" ng-if="$ctrl.mostrarPercentual !== false">',
        '      {{ $ctrl.valorSeguro() }}%',
        '    </span>',
        '  </div>',
        '  <div class="progresso__trilho" role="progressbar"',
        '       aria-valuemin="0" aria-valuemax="100"',
        '       aria-valuenow="{{ $ctrl.valorSeguro() }}">',
        '    <div class="progresso__preenchimento"',
        '         ng-class="$ctrl.classeDaFaixa()"',
        '         ng-style="{ width: $ctrl.valorSeguro() + \'%\' }"></div>',
        '  </div>',
        '</div>'
      ].join('\n'),
      controller: BarraProgressoController,
      controllerAs: '$ctrl',
      bindToController: true
    };
  }

  function BarraProgressoController() {
    var vm = this;

    vm.valorSeguro = valorSeguro;
    vm.classeDaFaixa = classeDaFaixa;

    /** Garante que o valor exibido fique sempre entre 0 e 100. */
    function valorSeguro() {
      var valor = Number(vm.progresso);
      if (isNaN(valor)) {
        return 0;
      }
      return Math.max(0, Math.min(100, Math.round(valor)));
    }

    /** Cor da barra conforme o estágio da tarefa. */
    function classeDaFaixa() {
      var valor = valorSeguro();
      if (valor >= 100) {
        return 'progresso__preenchimento--concluido';
      }
      if (valor >= 60) {
        return 'progresso__preenchimento--avancado';
      }
      return 'progresso__preenchimento--inicial';
    }
  }
})();

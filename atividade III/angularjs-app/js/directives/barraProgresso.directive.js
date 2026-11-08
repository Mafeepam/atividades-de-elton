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

    function valorSeguro() {
      var valor = Number(vm.progresso);
      if (isNaN(valor)) {
        return 0;
      }
      return Math.max(0, Math.min(100, Math.round(valor)));
    }

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

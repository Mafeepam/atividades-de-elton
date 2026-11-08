(function () {
  'use strict';

  angular
    .module('eduTech.components')
    .directive('notificacaoToast', notificacaoToast);

  function notificacaoToast() {
    return {
      restrict: 'E',
      scope: {
        posicao: '@'
      },
      template: [
        '<div class="toasts" ng-class="\'toasts--\' + ($ctrl.posicao || \'superior-direita\')"',
        '     aria-live="polite" aria-atomic="false">',
        '  <div class="toast" ng-repeat="item in $ctrl.notificacoes() track by item.id"',
        '       ng-class="\'toast--\' + item.tipo">',
        '    <span class="toast__icone" aria-hidden="true">{{ $ctrl.icone(item.tipo) }}</span>',
        '    <div class="toast__corpo">',
        '      <strong class="toast__titulo">{{ $ctrl.titulo(item.tipo) }}</strong>',
        '      <p class="toast__mensagem">{{ item.mensagem }}</p>',
        '    </div>',
        '    <button type="button" class="toast__fechar"',
        '            ng-click="$ctrl.fechar(item.id)" aria-label="Fechar notificação">×</button>',
        '  </div>',
        '</div>'
      ].join('\n'),
      controller: NotificacaoToastController,
      controllerAs: '$ctrl',
      bindToController: true
    };
  }

  NotificacaoToastController.$inject = ['toastService'];

  function NotificacaoToastController(toastService) {
    var vm = this;

    var ICONES = { sucesso: '✓', erro: '!', aviso: '▲', informacao: 'i' };
    var TITULOS = {
      sucesso: 'Tudo certo',
      erro: 'Algo deu errado',
      aviso: 'Atenção',
      informacao: 'Informação'
    };

    vm.notificacoes = function () { return toastService.notificacoes; };
    vm.fechar = toastService.fechar;
    vm.icone = function (tipo) { return ICONES[tipo] || ICONES.informacao; };
    vm.titulo = function (tipo) { return TITULOS[tipo] || TITULOS.informacao; };
  }
})();

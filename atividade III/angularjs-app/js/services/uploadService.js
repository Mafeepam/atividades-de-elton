(function () {
  'use strict';

  angular
    .module('eduTech.core')
    .service('uploadService', uploadService);

  uploadService.$inject = ['$interval'];

  function uploadService($interval) {
    var servico = this;
    var execucaoAtual = null;

    servico.emAndamento = false;
    servico.iniciar = iniciar;
    servico.cancelar = cancelar;

    /**
     * Inicia uma simulação de upload de 0 a 100%.
     * @param {function(number)} aoProgredir chamado a cada incremento
     * @param {function()}       aoConcluir  chamado ao atingir 100%
     */
    function iniciar(aoProgredir, aoConcluir) {
      if (servico.emAndamento) {
        return;
      }

      var progresso = 0;
      servico.emAndamento = true;

      execucaoAtual = $interval(function () {
        progresso = Math.min(100, progresso + Math.round(4 + Math.random() * 9));
        aoProgredir(progresso);

        if (progresso >= 100) {
          cancelar();
          if (angular.isFunction(aoConcluir)) {
            aoConcluir();
          }
        }
      }, 180);
    }

    function cancelar() {
      if (execucaoAtual) {
        $interval.cancel(execucaoAtual);
        execucaoAtual = null;
      }
      servico.emAndamento = false;
    }
  }
})();

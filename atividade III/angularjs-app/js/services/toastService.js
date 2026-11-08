/**
 * toastService.js — Serviço global de notificações Toast.
 *
 * Centraliza a fila de notificações para que qualquer controlador ou
 * diretiva da aplicação possa disparar uma mensagem sem conhecer a
 * implementação visual. A diretiva <notificacao-toast> apenas lê esta fila.
 */
(function () {
  'use strict';

  angular
    .module('eduTech.core')
    .service('toastService', toastService);

  toastService.$inject = ['$timeout'];

  function toastService($timeout) {
    var servico = this;
    var proximoId = 1;
    var DURACAO_PADRAO = 4000; // ms

    /** Fila observada pela diretiva de exibição. */
    servico.notificacoes = [];

    servico.exibir = exibir;
    servico.sucesso = atalho('sucesso');
    servico.erro = atalho('erro');
    servico.informacao = atalho('informacao');
    servico.aviso = atalho('aviso');
    servico.fechar = fechar;
    servico.limpar = limpar;

    /**
     * Adiciona uma notificação à fila e agenda sua remoção automática.
     * @param {string} mensagem texto exibido
     * @param {string} tipo     'sucesso' | 'erro' | 'informacao' | 'aviso'
     * @param {number} [duracao] tempo em ms antes de sumir sozinha
     */
    function exibir(mensagem, tipo, duracao) {
      var notificacao = {
        id: proximoId++,
        mensagem: mensagem,
        tipo: tipo || 'informacao',
        criadaEm: new Date()
      };

      servico.notificacoes.push(notificacao);

      // $timeout dispara o ciclo de digest, atualizando a view automaticamente.
      notificacao.temporizador = $timeout(function () {
        fechar(notificacao.id);
      }, duracao || DURACAO_PADRAO);

      return notificacao.id;
    }

    /** Remove uma notificação específica (clique no "x" ou fim do tempo). */
    function fechar(id) {
      for (var i = 0; i < servico.notificacoes.length; i++) {
        if (servico.notificacoes[i].id === id) {
          $timeout.cancel(servico.notificacoes[i].temporizador);
          servico.notificacoes.splice(i, 1);
          return;
        }
      }
    }

    /** Esvazia a fila inteira. */
    function limpar() {
      servico.notificacoes.slice().forEach(function (notificacao) {
        fechar(notificacao.id);
      });
    }

    /** Gera os atalhos sucesso/erro/informacao/aviso. */
    function atalho(tipo) {
      return function (mensagem, duracao) {
        return exibir(mensagem, tipo, duracao);
      };
    }
  }
})();

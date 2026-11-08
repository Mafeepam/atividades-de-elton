(function () {
  'use strict';

  angular
    .module('eduTech.core')
    .filter('moedaBrasileira', moedaBrasileira)
    .filter('cargaHoraria', cargaHoraria)
    .filter('milhar', milhar)
    .filter('resumo', resumo);

  function moedaBrasileira() {
    return function (valor) {
      if (valor === null || valor === undefined || isNaN(valor)) {
        return 'R$ 0,00';
      }
      return 'R$ ' + Number(valor).toFixed(2).replace('.', ',');
    };
  }

  function cargaHoraria() {
    return function (horas, formatoLongo) {
      if (!horas) {
        return '—';
      }
      return formatoLongo ? horas + ' horas de conteúdo' : horas + 'h';
    };
  }

  function milhar() {
    return function (valor) {
      if (valor === null || valor === undefined) {
        return '0';
      }
      return String(valor).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
  }

  function resumo() {
    return function (texto, limite) {
      var max = limite || 90;
      if (!texto || texto.length <= max) {
        return texto;
      }
      var cortado = texto.substring(0, max);
      return cortado.substring(0, cortado.lastIndexOf(' ')) + '…';
    };
  }
})();

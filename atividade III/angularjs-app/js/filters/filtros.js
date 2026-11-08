/**
 * filtros.js — Filtros personalizados para formatação de dados na view.
 *
 * Atende ao requisito "Uso de filtros para formatação de dados".
 */
(function () {
  'use strict';

  angular
    .module('eduTech.core')
    .filter('moedaBrasileira', moedaBrasileira)
    .filter('cargaHoraria', cargaHoraria)
    .filter('milhar', milhar)
    .filter('resumo', resumo);

  /** 259.9 -> "R$ 259,90" */
  function moedaBrasileira() {
    return function (valor) {
      if (valor === null || valor === undefined || isNaN(valor)) {
        return 'R$ 0,00';
      }
      return 'R$ ' + Number(valor).toFixed(2).replace('.', ',');
    };
  }

  /** 72 -> "72h" | 90 -> "1h30" quando usado em minutos (modo opcional) */
  function cargaHoraria() {
    return function (horas, formatoLongo) {
      if (!horas) {
        return '—';
      }
      return formatoLongo ? horas + ' horas de conteúdo' : horas + 'h';
    };
  }

  /** 3310 -> "3.310" */
  function milhar() {
    return function (valor) {
      if (valor === null || valor === undefined) {
        return '0';
      }
      return String(valor).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };
  }

  /** Corta um texto longo preservando palavras inteiras. */
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

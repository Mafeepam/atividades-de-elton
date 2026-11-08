/**
 * app.js — Módulo principal da aplicação.
 *
 * Responsabilidade: orquestrar os demais módulos da aplicação.
 * Nenhuma lógica de negócio vive aqui; ela está distribuída entre
 * os módulos 'eduTech.core' (serviços/factories/filtros) e
 * 'eduTech.components' (diretivas visuais reutilizáveis).
 */
(function () {
  'use strict';

  angular.module('eduTechApp', [
    'eduTech.core',       // serviços, factories e filtros
    'eduTech.components'  // diretivas dos 6 componentes visuais
  ]);
})();

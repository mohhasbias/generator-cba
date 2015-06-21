(function () {
  'use strict';

  angular.module('app.<%= module_name %>')
    .config(set<%= route_function_name %>Route);

  set<%= route_function_name %>Route.$inject = ['$stateProvider'];
  function set<%= route_function_name %>Route($stateProvider) {
    $stateProvider
      .state('<%= module_name %>', {
        url: '/<%= module_name %>',
        templateUrl: 'app/<%= module_name %>/<%= module_name %>.html',
        controller: '<%= controller_name %>Controller',
        controllerAs: 'vm'
      });
  }
})();
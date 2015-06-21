(function () {
  'use strict';

  angular.module('app.<%= module_name %>')
    .controller('<%= controller_name %>Controller', <%= controller_name %>Controller);

  <%= controller_name %>Controller.$inject = ['$state'];
  function <%= controller_name %>Controller($state) {
    var vm = this;

    vm.filepath = $state.current.templateUrl;
  }
})();
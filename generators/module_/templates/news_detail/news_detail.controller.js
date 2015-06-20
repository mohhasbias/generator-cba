/**
 * Created by rumaisyah on 6/18/2015
 */

(function () {
  'use strict';

  angular.module('app.news_detail')
    .controller('newsDetailController', newsDetailController);

  newsDetailController.$inject = ['$state'];
  function newsDetailController($state) {
    var vm = this;

    vm.filepath = $state.current.templateUrl;
  }
})();
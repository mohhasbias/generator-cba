/**
 * Created by rumaisyah on 6/18/2015.
 */

(function () {
  'use strict';

  angular.module('app.news_detail')
    .config(setNewsDetailRoute);

  setNewsDetailRoute.$inject = ['$stateProvider'];
  function setNewsDetailRoute($stateProvider) {
    $stateProvider
      .state('news_detail', {
        url: '/news_detail',
        templateUrl: 'app/news_detail/news_detail.html',
        controller: 'newsDetailController',
        controllerAs: 'vm'
      });
  }
})();
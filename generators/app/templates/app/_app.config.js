/**
 * Created by rumaisyah on 6/15/2015.
 */

(function () {
  'use strict';

  angular.module('<%= app_name %>App')
    .config(setDefaultRoute)
    .run(attachFastClick)
    .run(logAllStates);

  setDefaultRoute.$inject = ['$urlRouterProvider', '$stateProvider'];
  function setDefaultRoute($urlRouterProvider, $stateProvider){
    $stateProvider.state('404',{
      url: '/404',
      template: '<h1>Not Found</h1>'
    });

    $urlRouterProvider.otherwise('/404');

    // entry point / default URL
  }

  function attachFastClick(){
    FastClick.attach(document.body);
  }

  logAllStates.$inject = ['$state', '$log'];
  function logAllStates($state, $log){
    $log.info('Available states:');
    $state.get().forEach(function(state){
      $log.info(state);
    });
  }
})();


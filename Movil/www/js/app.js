'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'carsControllers', 'profileControllers', 'auth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.routes', {
    url: '/rutas',
    views: {
      'tab-cars': {
        templateUrl: 'templates/cars/tab-routes.html',
        controller: 'PickRouteCtrl'
      }
    }
  })
  .state('tab.cars', {
    url: '/autos/:route_id',
    views: {
      'tab-cars': {
        templateUrl: 'templates/cars/view-routes.html',
        controller: 'ViewRouteCtrl'
      }
    }
  })
  .state('tab.reservation', {
    url: '/reserve/:trip_id',
    views: {
      'tab-cars': {
        templateUrl: 'templates/cars/reserve.html',
        controller: 'ReserveCarCtrl'
      }
    }
  })
  .state('tab.confirm', {
    url: '/confirmReserve/:driver_id',
    views: {
      'tab-cars': {
        templateUrl: 'templates/cars/confirm-reserve.html',
        controller: 'ConfReserCarCtrl'
      }
    }
  })
  .state('tab.reportincidence', {
    url: '/incidence/:driver_id',
    views: {
      'tab-cars': {
        templateUrl: 'templates/cars/repo-incidence.html',
        controller: 'RepoIndicenceCtrl'
      }
    }
  })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/profiles/tab-account.html',
        controller: 'profileCtrl'
      }
    }
  })
  .state('tab.history', {
    url: '/account/history',
    views: {
      'tab-account': {
        templateUrl: 'templates/profiles/travel-history.html',
        controller: 'HistoryCtrl'
      }
    }
  })
  .state('tab.history-detail', {
    url: '/account/history/:history_id',
    views: {
      'tab-account': {
        templateUrl: 'templates/profiles/history-detail.html',
        controller: 'DetailHistoryCtrl'
      }
    }
  })
  .state('tab.qualify-trip', {
    url: '/account/review/:route_id',
    views: {
      'tab-account': {
        templateUrl: 'templates/profiles/qualify-trip.html',
        controller: 'QuantifyHistoryCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/rutas');
  $httpProvider.interceptors.push('AuthInterceptor');
});

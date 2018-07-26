'use strict';

angular.module('auth', ['auth.storage', 'auth.gui', 'auth.api'])
.factory('AuthInterceptor', ['AuthStorageService', '$rootScope', function(AuthStorageService, $rootScope) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      var token = AuthStorageService.token;

      if (typeof token !== 'undefined') {
        config.headers.Authorization = 'Bearer ' + token;
      }

      return config;
    },
    response: function(response) {
      if (response.status === 401 || response.status === 403) {
        //fires an event to open the log in modal
        $rootScope.$broadcast('authUnauthorizedEvent');
      }

      return response || $q.when(response);
    },
    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        //fires an event to open the log in modal
        $rootScope.$broadcast('authUnauthorizedEvent');
      }

      return response || $q.when(response);
    }
  };
}])
.factory('AuthService', ['$q', 'AuthAPIService', 'AuthStorageService', function($q, AuthAPIService, AuthStorageService) {
  var signUp = function(data) {
    var deferred = $q.defer();
    var signUpData = {};
    //procesing the data for the endpoint
    signUpData.name = data.firstName || '';
    signUpData.lastName = data.lastName || '';
    signUpData.email = data.email || '';
    signUpData.password1 = data.password || '';

    AuthAPIService.signUpWithUserData(signUpData).then(function(data) {
    //save on storage
      var token = data.token;
      var user = data.user;
      AuthStorageService.clear();
      AuthStorageService.token = token;
      AuthStorageService.user = user;
      //resolve the promise
      deferred.resolve(data);
    }, function(data) {
      deferred.reject(data);
    });
    return deferred.promise;
  };

  var logIn = function(data) {
    var deferred = $q.defer();
    var logInData = {};
    //procesing the data for the endpoint
    logInData.email = data.email || '';
    logInData.password = data.password || '';

    AuthAPIService.logInWithUserData(logInData).then(function(data) {
    //save on storage
      var token = data.token;
      var user = data.user;
      AuthStorageService.clear();
      AuthStorageService.token = token;
      AuthStorageService.user = user;
      //resolve the promise
      deferred.resolve(data);
    }, function(data) {
      deferred.reject(data);
    });
    return deferred.promise;
  };

  var logInFB = function() {
    var deferred = $q.defer();
    //login with faceboook
    return deferred.promise;
  };

  var setEndpoint = function(urlString) {
    AuthAPIService.globalEndpoint = urlString;
  };

  return {
    setEndpoint: setEndpoint,
    signUp: signUp,
    logIn: logIn,
    logInFB: logInFB
  };
}]);

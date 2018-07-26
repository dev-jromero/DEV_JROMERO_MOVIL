'use strict';

angular.module('auth.api', [])
.factory('AuthAPIService', ['$http', '$q', function($http, $q) {
  var endpoint = undefined;
  function getEnpoint() {
    if (!endpoint) {
      endpoint = '';
    }
    return endpoint;
  }

  function signUpWithUserData(data) {
    var deferred = $q.defer();
    var url = getEnpoint() + '/signUpNodeAPI';
    $http.post(url, data).success(function(resp, status) {
      if (status !== 200) {
        deferred.reject(resp);
      } else {
        deferred.resolve(resp);
      }
    }).error(function(resp) {
      deferred.reject(resp);
    });
    return deferred.promise;
  }

  function logInWithUserData(data) {
    var deferred = $q.defer();
    var url = getEnpoint() + '/authenticate';
    $http.post(url, data).success(function(resp, status) {
      if (status !== 200) {
        deferred.reject(resp);
      } else {
        deferred.resolve(resp);
      }
    }).error(function(resp) {
      deferred.reject(resp);
    });
    return deferred.promise;
  }

  function logInWithFacebookUser(fbUser) {
    var deferred = $q.defer();
    var url = getEnpoint() + '/signUpLoginFBAPI';
    $http.post(url, fbUser).success(function(resp, status) {
      if (status !== 200) {
        deferred.reject(resp);
      } else {
        deferred.resolve(resp);
      }
    }).error(function(resp) {
      deferred.reject(resp);
    });
    return deferred.promise;
  }

  return {
    get globalEndpoint() {
      return getEnpoint();
    },
    set globalEndpoint(e) {
      endpoint = e;
    },
    signUpWithUserData: signUpWithUserData,
    logInWithUserData: logInWithUserData,
    logInWithFacebookUser: logInWithFacebookUser
  };
}]);

'use strict';
angular.module('auth.storage.localStorage', [])
.factory('AuthStorageLocalStorageProvider', ['$window', function($window) {
  //the fallback provider stores in the local memory
  var globalUser = undefined;

  var getToken = function() {
    return $window.localStorage['globalToken'] || undefined;
  };

  var setToken = function(token) {
    $window.localStorage['globalToken'] = token;
  };

  var clearToken = function() {
    $window.localStorage['globalToken'] = undefined;
  };

  var getUser = function() {
    if (typeof $window.localStorage['globalUser'] !== 'undefined') {
      return JSON.parse($window.localStorage['globalUser']);
    }
    return undefined;
  };

  var setUser = function(user) {
    $window.localStorage['globalUser'] = JSON.stringify(user);
  };

  var clearUser = function() {
    $window.localStorage['globalUser'] = undefined;
  };

  return {
    getToken: getToken,
    setToken: setToken,
    clearToken: clearToken,
    getUser: getUser,
    setUser: setUser,
    clearUser: clearUser
  };
}]);

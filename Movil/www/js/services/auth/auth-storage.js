'use strict';
angular.module('auth.storage', ['auth.storage.localStorage'])
.factory('AuthStorageFallbackProvider', function() {
  //the fallback provider stores in the local memory
  var globalToken = undefined;
  var globalUser = undefined;

  var getToken = function() {
    return globalToken;
  };

  var setToken = function(token) {
    globalToken = token;
  };

  var clearToken = function() {
    globalToken = undefined;
  };

  var getUser = function() {
    return globalUser;
  };

  var setUser = function(user) {
    globalUser = user;
  };

  var clearUser = function() {
    globalUser = undefined;
  };

  return {
    getToken: getToken,
    setToken: setToken,
    clearToken: clearToken,
    getUser: getUser,
    setUser: setUser,
    clearUser: clearUser
  };
})
.factory('AuthStorageService', ['AuthStorageFallbackProvider', function(AuthStorageFallbackProvider) {
  //main service for the auth storage
  //just user the token, user as properties and clear method
  var currentProvider = undefined;

  var getProvider = function() {
    if (typeof(currentProvider) === 'undefined') {
      currentProvider = AuthStorageFallbackProvider;
    }
    return currentProvider;
  };

  var setProvider = function(provider) {
    currentProvider = provider;
  };

  var clear = function() {
    getProvider().clearToken();
    getProvider().clearUser();
  };

  return {
    getProvider: getProvider,
    setProvider: setProvider,
    get token() {
      return getProvider().getToken();
    },
    set token(t) {
      return getProvider().setToken(t);
    },
    get user() {
      return getProvider().getUser();
    },
    set user(u) {
      return getProvider().setUser(u);
    },
    clear: clear
  };
}]);

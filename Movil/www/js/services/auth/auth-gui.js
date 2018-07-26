'use strict';
angular.module('auth.gui', ['ionic', 'auth'])
.factory('AuthModalService', ['$ionicModal', '$rootScope', '$state', '$window', 'AuthService', function($ionicModal, $rootScope, $state, $window, AuthService) {
  var modalScope = $rootScope.$new();
  //sign up process
  var signUpModal;
  modalScope.isShown = false;
  modalScope.signUpModel = {};
  modalScope.signUpUser = function() {
    AuthService.signUp(modalScope.signUpModel).then(function(data) {
      signUpModal.hide();
      $state.go($state.current, {}, {reload: true});
    }, function(data) {
      alert(data);
    });
  };

  var loginModal;
  modalScope.logInModel = {};
  modalScope.logInUser = function() {
    AuthService.logIn(modalScope.logInModel).then(function(data) {
      loginModal.hide().then(function() {
        $state.go($state.current, {}, {reload: true});
      });
    }, function(data) {
      alert(data);
    });
  };

  modalScope.logInFB = function() {
    AuthService.logInFB().then(function() {
      welcomeLoginModal.hide().then(function() {
        $state.go($state.current, {}, {reload: true});
      });
    });
  };

  var welcomeLoginModal;
  var openWelcomeModal = function() {
    if (!welcomeLoginModal) {
      $ionicModal.fromTemplateUrl('templates/auth/login-choice-modal.html', {
        scope: modalScope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        welcomeLoginModal = modal;
        welcomeLoginModal.show();
      }).catch(function(e) {
        console.log('error');
        console.log(e);
      });
    } else {
      if (!modalScope.isShown) {
        welcomeLoginModal.show();
        modalScope.isShown = true;
      }
    }
  };

  modalScope.openSignUpModal = function() {
    if (!signUpModal) {
      $ionicModal.fromTemplateUrl('templates/auth/login-signup-modal.html', {
        scope: modalScope,
        animation: 'fade-in'
      }).then(function(modal) {
        signUpModal = modal;
        signUpModal.show();
        welcomeLoginModal.hide();
      }).catch(function(e) {
        console.log('error');
        console.log(e);
      });
    } else {
      signUpModal.show();
      welcomeLoginModal.hide();
    }
  };

  modalScope.openLogInModal = function() {
    if (!loginModal) {
      $ionicModal.fromTemplateUrl('templates/auth/login-login-modal.html', {
        scope: modalScope,
        animation: 'fade-in'
      }).then(function(modal) {
        loginModal = modal;
        loginModal.show();
        welcomeLoginModal.hide();
      }).catch(function(e) {
        console.log('error');
        console.log(e);
      });
    } else {
      loginModal.show();
      welcomeLoginModal.hide();
    }
  };

  modalScope.closeWelcomeModal = function() {
    modalScope.isShown = false;
    welcomeLoginModal.hide();
    $window.history.back();
  };

  modalScope.closeSignUpModal = function() {
    modalScope.isShown = false;
    signUpModal.hide();
    $window.history.back();
  };

  modalScope.closeLogInModal = function() {
    modalScope.isShown = false;
    loginModal.hide();
    $window.history.back();
  };

  return {
    openWelcomeModal: openWelcomeModal
  };
}])
.run(function($rootScope, AuthModalService) {
  $rootScope.$on('authUnauthorizedEvent', function() {
    AuthModalService.openWelcomeModal();
  });
});

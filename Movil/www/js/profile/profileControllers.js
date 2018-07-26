'use strict';

angular.module('profileControllers', ['hermesAPIServices'])

.controller('HistoryCtrl', function($scope, Routes) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var user_id = 1;
  $scope.TravelList = [];
  Routes.getTravelHistory(user_id).then(function(traList) {
    $scope.TravelList = traList;
  });
})
.controller('DetailHistoryCtrl', function($scope, $stateParams, Routes) {
  Routes.getHistoryDetail($stateParams.history_id).then(function(detail_history) {
    $scope.Details = detail_history;
  });

  $scope.getNumber = function(num) {
    return new Array(num);
  };
})
.controller('QuantifyHistoryCtrl', function($scope, $ionicPopup, $stateParams, Routes, $location) {
  Routes.getHistoryDetail($stateParams.route_id).then(function(quantify_trip) {
    $scope.calificar = quantify_trip;
  });
  $scope.getNumber = function(num) {
    return new Array(num);
  };
  $scope.califica = function(num) {
    $scope.calificar.ranking = num + 1;
  };
  $scope.showConfirm = function() {
    var envio = $ionicPopup.alert({
      title:'!Calificacion Enviada!',
      template:'Gracias por calificar tu viaje'
    });
    envio.then(function() {
      $location.path('/tab/account');
    });
  };
})
.controller('profileCtrl', function($scope, Routes, $location) {
  $scope.editable = false;
  Routes.getProfile().then(function(DtlProfile) {
    $scope.user = DtlProfile;
  });
  $scope.cambiar = function() {
    $scope.editable = $scope.editable ? false : true;
  };
  $scope.logout = function() {
    $location.path('/tab/rutas');
  };
});

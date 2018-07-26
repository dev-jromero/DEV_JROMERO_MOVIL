'use strict';

angular.module('carsControllers', ['hermesAPIServices'])

.controller('PickRouteCtrl', function($scope, Routes, $location) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.departure_id = '';
  $scope.route_id = '';
  $scope.departureList = [];
  $scope.arrivalList = [{'id': 0, 'name': 'Seleccionar origen'}];
  Routes.getDetarureCities().then(function(resultList) {
    $scope.departureList = resultList;
    $scope.departure_id = String($scope.departureList[0].id);
    $scope.refreshArrivals($scope.departure_id);
  });

  $scope.refreshArrivals = function(id) {
    Routes.getArrivalByDeparture(id).then(function(arrList) {
      $scope.arrivalList = arrList;
      $scope.route_id = String(arrList[0].route_id);
    });
  };
  $scope.goRoute = function() {
    $location.path('tab/autos/' + $scope.route_id);
  };
})
.controller('ViewRouteCtrl', function($scope, $stateParams, Routes, $ionicPopup, $location) {
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.autosList = [];
  Routes.getCarsByRoute(parseInt($stateParams.route_id)).then(function(resultList) {
    $scope.autosList = resultList;
  });
  $scope.getNumber = function(num) {
    return new Array(parseInt(num));
  };
  $scope.showAlert = function() {
    var alerta = $ionicPopup.alert({
      title:'!usuario no autenticado!',
      template:'para que usted reserve un viaje necesitar estar autenticado'
    });
    alerta.then(function() {
      $location.path('/tab/account');
    });
  };
})
.controller('ReserveCarCtrl', function($scope, Routes, $stateParams, $location) {
  $scope.infoDriver = [];

  $scope.$on('$ionicView.enter', function() {
    Routes.getProfile();

    Routes.getTravelByTrip($stateParams.trip_id).then(function(resultList) {
      $scope.infoDriver = resultList;
    });
  });

  $scope.getNumber = function(num) {
    return new Array(num);
  };

  $scope.asiento = 0;
  $scope.total = 0;
  $scope.disminuir = function() {
    if ($scope.asiento > 0) {
      $scope.asiento--;
    }
    $scope.total = $scope.infoDriver['price'] * $scope.asiento;
  };
  $scope.aumentar = function() {
    if ($scope.asiento < $scope.infoDriver['seating']) {
      $scope.asiento++;
    }
    $scope.total = $scope.infoDriver['price'] * $scope.asiento;
  };
  $scope.reservar = function(id, seatnumber) {
    // accion de reducir los asientos disponibles del conductor y descontar los creditos
    // deberia estar el id del usuario.
    Routes.reserveSeat(id, seatnumber).then(function(result) {
      if (result.status == 'ok') {
        $location.path('/tab/confirmReserve/' + id);
      } else {
        $location.path('/tab/reserve/' + id);
      }
    });

  };
})
.controller('ConfReserCarCtrl', function($scope, Routes, $stateParams, $location) {
  $scope.infoDriver = [];
  Routes.getTravelByTrip($stateParams.driver_id).then(function(dptList) {
    $scope.infoDriver = dptList;
  });
  $scope.clkcancelar = function() {
    // accion de restablecer los asientos disponibles y devolver los creditos al conductor
    $location.path('/tab/rutas');
  };
  $scope.clkreportar = function(id) {
    $location.path('/tab/incidence/' + id);
  };
})
.controller('RepoIndicenceCtrl', function($scope, Routes, $stateParams, $location, $ionicPopup) {
  $scope.infoDriver = [];
  Routes.getTravelByTrip($stateParams.driver_id).then(function(dptList) {
    $scope.infoDriver = dptList;
  });
  $scope.showAlert = function() {
    $ionicPopup.alert({
      title: 'Reporte del Incidente',
      okType: 'button-balanced',
      template: 'Gracias por reportar el incidente, en un momento atenderemos su reclamo y nos comunicaremos con Usted.'
    });
    $location.path('/tab/rutas');
  };
});

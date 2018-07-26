'use strict';

//localhost
//var SERVICE_ENDPOINT = 'http://127.0.0.1:8000/api/v1';
var SERVICE_ENDPOINT = 'http://104.131.109.93/api/v1';

angular.module('hermesAPIServices', [])

.factory('Routes', function($q, $http) {

  var CARS_ROUTES = [];

  var TRAVEL_HISTORY = [
    {'id': 1, 'history': [
      {'id': 1, 'date': '12-dec-2015 8:45 am', 'route_id':1, 'driver_name':'Juan Perez1', 'route': 'Hyo - Hvca', 'ranking':4},
      {'id': 2, 'date': '13-dec-2015 2:45 pm', 'route_id':2, 'driver_name':'Juan Perez2', 'route': 'Hyo - Tar'},
      {'id': 3, 'date': '14-dec-2015 4:45 pm', 'route_id':3, 'driver_name':'Juan Perez3', 'route': 'Hvca - Hyo'},
      {'id': 4, 'date': '15-dec-2015 9:45 am', 'route_id':4, 'driver_name':'Juan Perez4', 'route': 'Tar - Hyo', 'ranking':3}
    ]}
  ];

  return {
    getDetarureCities: function() {
      var url = SERVICE_ENDPOINT + '/route/departures';
      var deferred = $q.defer();
      var result_list = [];
      $http.get(url).then(function(result) {

        var city_list = result.data.results;
        for (var i = 0; i < city_list.length; i++) {
          result_list.push({'id': city_list[i].city_id, 'name': city_list[i].name});
        }
        deferred.resolve(result_list);
      });


      return deferred.promise;
    },
    getArrivalByDeparture: function(departure_id) {
      var url = SERVICE_ENDPOINT + '/route/arrivals/' + departure_id;
      var deferred = $q.defer();
      $http.get(url).then(function(result_arrival) {
        var route_list = result_arrival.data.results;
        deferred.resolve(route_list);
      });

      return deferred.promise;
    },
    getCarsByRoute: function(route_id) {
      var url = SERVICE_ENDPOINT + '/trip/' + route_id + '/available_drivers';
      var deferred = $q.defer();
      $http.get(url).then(function(result_route) {
        CARS_ROUTES = result_route.data.results;
        deferred.resolve(CARS_ROUTES);
      });
      return deferred.promise;
    },
    getTravelByTrip: function(trip_id) {
      var deferred = $q.defer();
      for (var i = 0; i < CARS_ROUTES.length; i++) {
        if (CARS_ROUTES[i].trip_id == trip_id)
        {
          deferred.resolve(CARS_ROUTES[i]);
        }
      }
      return deferred.promise;
    },
    reserveSeat: function(trip_id, seatnumber) {
      var url = SERVICE_ENDPOINT + '/trip/' + trip_id + '/book';
      var deferred = $q.defer();
      var data = {'seats': seatnumber};
      $http.put(url, data).then(function() {
        deferred.resolve({'status': 'ok'});
      }, function(resultfalled) {
        deferred.resolve({'status' : 'failed', 'message': resultfalled.data.detail});
      });
      return deferred.promise;
    },
    getTravelHistory: function(user_id) {
      var deferred = $q.defer();
      for (var i = 0; i < TRAVEL_HISTORY.length; i++) {
        if (TRAVEL_HISTORY[i].id === user_id) {
          deferred.resolve(TRAVEL_HISTORY[i].history);
        }
      }
      return deferred.promise;
    },
    getHistoryDetail: function(history_id) {
      var deferred = $q.defer();
      for (var i = 0; i < TRAVEL_HISTORY.length; i++) {
        for (var j = 0; j < TRAVEL_HISTORY[i].history.length; j++) {
          if (TRAVEL_HISTORY[i].history[j].id == history_id) {
            deferred.resolve(TRAVEL_HISTORY[i].history[j]);
          }
        }
      }
      return deferred.promise;
    },
    getProfile: function() {
      var url = SERVICE_ENDPOINT + '/profile';
      var deferred = $q.defer();
      $http.get(url).then(function(result) {
        var user_profile = result.data;
        deferred.resolve(user_profile);
      });
      return deferred.promise;
    }
  };
});

angular.module('shiftStarter')

.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('slots');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})
 
.controller('RegisterCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.signup = function() {
    AuthService.register($scope.user).then(function(msg) {
      $state.go('outside.login');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: msg
      });
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})
 
.controller('SlotCtrl', function($scope, AuthService, $ionicPopup, API_ENDPOINT, $http, $state) {

  $scope.destroySession = function() {
    AuthService.logout();
  };
 
  $scope.getSlots = function() {
    getSlots();
  };

  $scope.toggleAssignment = function(id) {
    $http.put(API_ENDPOINT.url + '/slots/' + id + '/assign')
    .success(function(response, status) {
      getSlots();
    })
    .error(function(data, status, headers, config) {
      console.log(status);
      var alertPopup = $ionicPopup.alert({
        title: 'Assignment failed!',
        template: 'Unable to assign this slot.'
      });
    });
  };
 
  $scope.logout = function() {
    AuthService.logout();
    $state.go('outside.login');
  };

  getSlots = function() {
    $http.get(API_ENDPOINT.url + '/slots').then(function(result) {
      $scope.slots = result.data;
    });
  };

  getSlots();

})
 
.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('outside.login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
});
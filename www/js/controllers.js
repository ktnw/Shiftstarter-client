angular.module('shiftStarter')

.controller('LoginCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.user = {
    name: '',
    password: ''
  };
 
  $scope.login = function() {
    AuthService.login($scope.user).then(function(msg) {
      $state.go('tab.shifts');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})
 
.controller('ShiftCtrl', function($scope, AuthService, $ionicPopup, API_ENDPOINT, $http, $state) {
 
  // BUG: see below $scope.toggleMode function why this is commented out
  // $scope.manageMode = false;

  $scope.getShifts = function() {
    getShifts();
  };

  $scope.toggleAssignment = function(id) {
    $http.put(API_ENDPOINT.url + '/shifts/' + id + '/assign')
    .success(function(response, status) {
      getShifts();
    })
    .error(function(data, status, headers, config) {
      console.log(status);
      var alertPopup = $ionicPopup.alert({
        title: 'Assignment failed!',
        template: 'Unable to assign this shift.'
      });
    });
  };

  // BUG: when the toggle is placed in header or subheader everything works fine with this:
  // (also need to uncommend above the initial setting of $scope.manageMode = false )
  /*
  $scope.toggleMode = function() {
    getShifts();
  };
  */

  // Once the toggle is placed in the content it stops updating the ng-model on ng-change
  // hence we have to toggle the value here manually and everything works.
  $scope.toggleMode = function() {
    if (! $scope.manageMode == true) {
      $scope.manageMode = true;
    } else {
      $scope.manageMode = false;
    }
    getShifts();
  };


  getShifts = function() {
    let url = API_ENDPOINT.url + '/shifts';
    if (! $scope.manageMode)
      url += '?f=my';
    $http.get(url).then(function(result) {
      $scope.shifts = result.data;
    });
  };

  getShifts();

})

.controller('ProfileCtrl', function($scope, AuthService, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };
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
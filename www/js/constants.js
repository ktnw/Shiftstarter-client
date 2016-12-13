angular.module('shiftStarter')
 
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})
 
.constant('API_ENDPOINT', {
  url: 'http://127.0.0.1:3000/api/v1'
  //  For a simulator use: url: 'http://127.0.0.1:3000/api/v1'
});
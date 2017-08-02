'use strict';

const app = angular.module('rumi', [
  'rumi.service',
  'rumi.signup',
  'rumi.login',
  'rumi.profile',
  'rumi.create',
  'ngRoute',
  // 'angularFileUpload'
]);

app.config(['$routeProvider', '$locationProvider',
  function config($routeProvider, $locationProvider) {

    $routeProvider
      .when('/signup', {
        templateUrl: 'views/signup.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html'
      })
      .when('/create',{
        templateUrl: 'views/create_rumi.html'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html'
      })
      .otherwise('/login');
    
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
  }
]);
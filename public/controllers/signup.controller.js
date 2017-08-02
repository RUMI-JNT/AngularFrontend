angular.module('rumi.signup', [])
  .controller('RumiSignup', function ($scope, RumiService, $window) {
    this.greeting = "Sup";
    this.signup = async function() {
      let user = await RumiService.signUp($scope.username, $scope.password, $scope.email, $scope.number);
      return typeof user.id === 'number' ? $window.location.href = '/#/profile' : $window.alert('Invalid username or email, plese try again.');
    }
  })
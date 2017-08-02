angular.module('rumi.login', [])
  .controller('RumiLogin', function ($scope, RumiService, $window) {
    this.login = async function () {
      let user = await RumiService.logIn($scope.username, $scope.password);
      return typeof user.id === 'number' ? $window.location.href = '/#/profile' : $window.alert('Invalid username or email, plese try again.');
    }
  })
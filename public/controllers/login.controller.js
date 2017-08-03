angular.module('rumi.login', [])
  .controller('RumiLogin', function ($scope, RumiService, $window) {
    this.login = async function (username, password) {
      console.log($scope.username, password)
      let user = await RumiService.logIn(username, password);
      return typeof user.id === 'number' ? $window.location.href = '/#/profile' : $window.alert('Invalid username or email, plese try again.');
    }
  })
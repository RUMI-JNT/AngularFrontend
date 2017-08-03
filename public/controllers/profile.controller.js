angular.module('rumi.profile', [])
  .controller('RumiProfile', function ($scope, RumiService, $window, FileUploader) {
    this.user = RumiService.getUserInfo();
    this.myRumis = [];
    // inject a working provider for fileUpload
    this.uploadFile = function () {
      var file = $scope.myFile;

      console.log('file is ');
      console.dir(file);

      var uploadUrl = "/#/profile";
      fileUpload.uploadFileToUrl(file, uploadUrl);
    };
    this.createRumi = function() {
      $window.location.href = '/#/create';
    }

    this.getRumis = async function() {
      this.myRumis = await RumiService.getUserRumis($window.localStorage.getItem('id'));
      console.log(this.myRumis)
    }
  })
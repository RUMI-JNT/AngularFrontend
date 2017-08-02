angular.module('rumi.profile', [])
  .controller('RumiProfile', function (RumiService, $window) {
    this.user = RumiService.getUserInfo();
    this.myRumis = [];
    // inject a working provider for fileUpload
    // this.uploadFile = function () {
    //   var file = this.myFile;
    //   console.log('file is ');
    //   console.dir(file);
    //   var uploadUrl = "/profile";
    //   fileUpload.uploadFileToUrl(file, uploadUrl);
    // };
    this.createRumi = function() {
      $window.location.href = '/#/create';
    }

    this.getRumis = async function() {
      this.myRumis = await RumiService.getUserRumis();
      console.log(this.myRumis)
    }
  })
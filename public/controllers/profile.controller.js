angular.module('rumi.profile', [])
  .controller('RumiProfile', function (RumiService) {
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
      console.log(this.user)
    }

    this.getRumis = function() {
      // this.myRumis = RumiService.getUserRumis();
    }
  })
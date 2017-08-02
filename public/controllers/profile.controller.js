angular.module('rumi.profile', [])
  .controller('RumiProfile', function (fileUpload) {
    this.greeting = "Sup";
    this.uploadFile = function () {
      var file = this.myFile;
      console.log('file is ');
      console.dir(file);
      var uploadUrl = "/profile";
      fileUpload.uploadFileToUrl(file, uploadUrl);
    };
  })
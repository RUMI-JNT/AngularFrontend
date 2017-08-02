angular.module('rumi.create', [])
  .controller('RumiCreate', function ($scope, RumiService, $window, $moment, calendarConfig) {
    this.currentRumi = {};
    this.otherUserName = "";
    this.showInput =  false;
    this.fullFumi;
    this.events = [];
    this.calendarView = 'day';
    this.viewDate = moment().startOf('month').toDate();

    this.rangeSelected = function (startDate, endDate) {
      this.firstDateClicked = startDate;
      this.lastDateClicked = endDate;
    };

    
    this.next = async function() {
      let emailValidation = await RumiService.validateEmail($scope.email);
      this.otherUserName = emailValidation.username;
      this.otherUserImage = emailValidation.image;
      this.currentRumi['name'] = $scope.name;
      this.currentRumi['image'] = "image goes here";
      this.currentRumi['description'] = $scope.description;
      this.currentRumi['acceptor'] = emailValidation.id;
      this.currentRumi['sendInfo'] = {
        number: emailValidation.number,
        email: emailValidation.email
      }

      if (typeof emailValidation.id === 'number') {
        return this.showInput = !this.showInput;
        console.log(this.showInput)
      } else {
        console.log('fes')
        // alert enter a new email
        return $scope.email.text = "";
      }
    }

    this.create = function() {
      // let rumiInfo = {
      //   times,
      //   requester,
      //   sendBy,
      //   sendInfo
      // }
      console.log('create')
    }
  })
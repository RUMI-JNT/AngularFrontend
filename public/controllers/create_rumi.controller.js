angular.module('rumi.create', [])
  .controller('RumiCreate', function ($scope, RumiService, $window, moment, calendarConfig, $compile, $timeout, uiCalendarConfig) {
    this.currentRumi = {};
    this.otherUserName = "";
    this.showInput =  false;
    this.fullFumi;
    this.create1 = true;
    this.create2 = false;
    this.create3 = false;
    
    
    this.firstNext = async function (name, email, description) {
      this.user = RumiService.getUserInfo();
      let emailValidation = await RumiService.validateEmail(email);
      this.otherUserName = emailValidation.username;
      this.otherUserImage = emailValidation.image;
      this.currentRumi['name'] = name;
      this.currentRumi['image'] = "image goes here";
      this.currentRumi['description'] = description;
      this.currentRumi['requester'] = $window.localStorage.getItem('id');
      this.currentRumi['acceptor'] = emailValidation.id;
      this.currentRumi['sendInfo'] = {
        number: emailValidation.number,
        email: emailValidation.email
      }
      if (typeof emailValidation.id === 'number') {
        this.create1 = false;
        this.create2 = true;
        return this.showInput = !this.showInput;
      } else {
        $window.alert('Please check your email and try again');
        return $scope.email.text = "";
      }
    }

    this.secondNext = function() {
      console.log('second next')
      this.currentRumi['times'] = $scope.events[$scope.events.length - 1];
      
      this.create2 = false;
      this.create3 = true;
    }

    this.create = function() {
      RumiService.createRumi(this.currentRumi);
      $window.location.href = '/#/profile';
    }

  let date = new Date();
  let d = date.getDate();
  let m = date.getMonth();
  let y = date.getFullYear();

  $scope.changeTo = 'Hungarian';
  $scope.currentView = 'month';

  /* event source that contains custom events on the scope */
  $scope.events = [];
  /* event source that calls a function on every view switch */
  $scope.eventsF = function (start, end, timezone, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [{
      title: 'Feed Me ' + m,
      start: s + (50000),
      end: s + (100000),
      allDay: false,
      className: ['customFeed']
    }];
    // callback(events);
  };


  $scope.ev = {};

  /* alert on dayClick */
  $scope.alertOnDayClick = function (date) {
    // console.log("date", date.toISOString().split('T')[0])
    // console.log("date", $window.moment(date))
    // console.log("date", typeof date.toISOString().split('T')[0])
    this.alertMessage = (date.toString() + ' was clicked ');
    $scope.ev = {
      from: date,
      to: date,
      title: '',
      allDay: true
    };

  };

  /* alert on eventClick */
  $scope.alertOnEventClick = function (date, jsEvent, view) {
    $scope.alertMessage = (date.title + ' was clicked ');
  };
  /* alert on Drop */
  $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
    $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
  };
  /* alert on Resize */
  $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
    $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
  };
  /* add and removes an event source of choice */
  $scope.addRemoveEventSource = function (sources, source) {
    var canAdd = 0;
    angular.forEach(sources, function (value, key) {
      if (sources[key] === source) {
        sources.splice(key, 1);
        canAdd = 1;
      }
    });
    if (canAdd === 0) {
      sources.push(source);
    }
  };
  /* add custom event*/
  this.addEvent = function () {
    console.log($scope.timeInput1)
    console.log($scope.timeInput2)
    console.log({
      title: $scope.ev.title,
      start: $window.moment($scope.ev.from),
      end: $window.moment($scope.ev.to),
      startTime: `${$scope.timeInput1} ${$scope.amPm1}`,
      endTime: `${$scope.timeInput2} ${$scope.amPm2}`,
      // allDay: true,
      className: ['openSesame']
    })
    $scope.events.push({
      title: $scope.ev.title,
      start: $window.moment($scope.ev.from),
      end: $window.moment($scope.ev.to),
      startTime: `${$scope.timeInput1} ${$scope.amPm1}`,
      endTime: `${$scope.timeInput2} ${$scope.amPm2}`,
      // allDay: true,
      className: ['openSesame']
    });
    console.log($scope.events)
  };
  /* remove event */
  this.remove = function (index) {
      $scope.events.splice(index, 1);
  };
  /* Change View */
  this.changeView = function (view, calendar) {
    $scope.currentView = view;
    $scope.myCalendar1.fullCalendar('changeView', view);
  };
  /* Change View */
  $scope.renderCalender = function (calendar) {
    $timeout(function () {
      if ($scope.myCalendar1) {
        $scope.myCalendar1.fullCalendar('render');
      }
    });
  };
  /* Render Tooltip */
  $scope.eventRender = function (event, element, view) { };
  /* config object */
  $scope.uiConfig = {
    calendar: {
      height: 450,
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      header: {
        left: 'title',
        center: 'myCustomButton',
        right: 'today prev,next'
      },
      dayClick: $scope.alertOnDayClick,
      eventClick: $scope.alertOnEventClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize,
      eventRender: $scope.eventRender,
      businessHours: {
        start: '10:00', // a start time (10am in this example)
        end: '18:00', // an end time (6pm in this example)

        dow: [1, 2, 3, 4]
        // days of week. an array of zero-based day of week integers (0=Sunday)
        // (Monday-Thursday in this example)
      }
    }
  };

  /* event sources array*/
  $scope.eventSources = [$scope.events, $scope.eventsF];
  $scope.eventSources2 = [$scope.eventsF, $scope.events];


  })


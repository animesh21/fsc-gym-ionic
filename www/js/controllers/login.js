/**
 * Login controller
 */
angular.module('invisionApp')
  .controller('LoginController', function ($ionicSideMenuDelegate, $state, $ionicHistory,
                                           $ionicPopup, $ionicLoading, $scope, remoteService,
                                           $localstorage) {

    'use strict';

    $ionicSideMenuDelegate.canDragContent(false);

    var vm = this;

    vm.doLogin = doLogin;

    vm.doSignup = doSignup;

    var userID;

    userID = parseInt($localstorage.get('userid', 0));

    if (userID !== 0) {
      console.log("user ID in login from storage: " + userID);

      $state.go('app.stories');
    }

    function doLogin(data) {

      remoteService.login(data.username, data.password).then(function (res) {
        console.log('Response of login: ' + JSON.stringify(res));
        if (res.status === 200) {
          userID = res.data.data.pk;
          console.log('User id: ' + userID);
          $localstorage.set('userid', userID);
          $state.go('app.stories'); //, {}, {location: "replace", reload: true});
        }
        else {
          $scope.showPopup("Invalid Credentials", "The credentials provided by you did not match, " +
            "please try again with valid set of credentials");
        }
      }, function (err) {
        console.error('Error in login: ' + JSON.stringify(err));
        $scope.showPopup("Invalid Credentials", "The credentials provided by you did not match, " +
          "please try again with valid set of credentials");
      });

      // $ionicHistory.nextViewOptions({
      //   disableBack: true
      // });
      // $state.go('app.categories', {}, {location: "replace", reload: true});
    }

    function doSignup(data) {
      remoteService.signup(
        data.firstName,
        data.lastName,
        data.email,
        data.password)
        .then(function (res) {
          console.log('response of signup: ' + JSON.stringify(res));
          var data = res.data;
          if (res.status === 201) {
            $scope.showPopup("Info", "Signup Successful, please login to continue");
            $state.go('app.login');
          }
          else {
            $scope.showPopup("Invalid Data", "There was error in the data provided during signup");
            $state.go('app.register');
          }
        }, function (err) {
          console.error('error in signup: ' + JSON.stringify(err));
          $scope.showPopup("Invalid Data", "There was error in the data provided during signup");
          $state.go('app.register');
        });
    }

    $scope.showLoading = function (message) {
      $ionicLoading.show({
        template: '<p>Loading...</p><ion-spinner></ion-spinner><p>' +
        message + '</p>'
      });
    };

    $scope.hide = function () {
      $ionicLoading.hide();
    };

    $scope.showPopup = function (title, message) {
      var popup = $ionicPopup.show({
        title: title,
        template: message,
        buttons: [
          {
            'text': 'OK'
          }
        ]
      });
    };

  });

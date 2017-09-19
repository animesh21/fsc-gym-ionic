/**
 * Application controller
 */
angular
  .module('invisionApp')

  .controller('ApplicationController',
    function ($scope, $ionicModal, $state, remoteService, popupService, $localstorage) {

      'use strict';

      var vm = this;

      $scope.data = {
        duration: 600,
        idpconfig: {
          format: 'MM:SS'
        }
      };

      vm.showMenu = true;
      $scope.$on('hideMenu', function () {
        vm.showMenu = false;
      });

      $scope.$on('$stateChangeStart', function () {
        vm.showMenu = true;
      });

      $scope.day = false;
      $scope.slot = true;

      function showModal(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      }

      function openBookingModal() {
        // Get the booking days from remote server
        remoteService.getDays().then(function (res) {
          $scope.days = res.data;
          var day_lookup = {};
          var item;
          for (var i = 0; i < $scope.days.length; i++) {
            item = $scope.days[i];
            day_lookup[item.pk] = item.name;
          }
          $scope.day_lookup = day_lookup;
          $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
          }).then(showModal);
        });
      }

      function selectDay(day) {
        $scope.day = day;
        $scope.slot = null;
        $scope.day_name = $scope.day_lookup[day];
        // $scope.modal.hide();
        remoteService.getSlots(day).then(function (res) {
          console.log('Response of slots: ' + JSON.stringify(res));
          $scope.slots = res.data;
          var slots_lookup = {};
          var item;
          for (var i = 0; i < $scope.slots.length; i++) {
            item = $scope.slots[i];
            slots_lookup[item.pk] = item.start_time;
          }
          $scope.slots_lookup = slots_lookup;
          // $state.go('app.session-time');
        }, function (err) {
          console.error("Can't get slots: " + JSON.stringify(err));
        });
      }

      function bookSlot(slot) {
        $scope.slot = slot;
        var day = $scope.day;
        $scope.day = null;
        remoteService.bookSlot($scope.day, $scope.slot).then(function (res) {
          console.log('Response of booking: ' + JSON.stringify(res));
          var booking_data = res.data;
          var slot_time = $scope.slots_lookup[slot];
          var status = res.status;
          console.log('Status: ' + status);
          if (status === 200) {
            popupService.showPopup("Message", "<p>You've successfully registered for this slot:</p>" +
              "<p>Slot ID: " + booking_data.pk + "</p>" +
              "<p>Date: " + booking_data.date + "</p>" +
              "<p>Time: " + slot_time + " </p>");
          }
          $scope.day = null;
        }, function (err) {
          console.error('Error in booking:' + JSON.stringify(err));
          var status = err.status;
          if(status === 406) {
            popupService.showPopup("Alert", "You've already registered for this slot");
          }
          else if(status === 400) {
            popupService.showPopup("Alert", "Booking for this slot is full now," +
              " please try some other slot");
          }

        });
      }
      /**************************************************************/

      /*Merchant Pin ModalPopup JS CODE*/

      /**************************************************************/

      function workoutLogin() {
        $ionicModal.fromTemplateUrl('templates/modal2.html', {
          scope: $scope
        }).then(showModal);
      }

      function closeModal() {
        $scope.modal.hide();
      }

      function logout() {
        console.log('logout called');
        $localstorage.remove('userid');
        $state.go('app.login');
      }

      function accessWorkouts(data) {
        closeModal();
        remoteService.login(data.username, data.password).then(function (res) {
          console.log('Access res: ' + JSON.stringify(res));
          if (res.status === 200) {
            $state.go('app.workout-options');
          }
          else {
            $state.go('app.more');
          }
        }, function (err) {
          console.error('Error in login: ' + JSON.stringify(err));
          $state.go('app.more');
        });
      }

      function getCreateWorkoutData() {
        remoteService.getGymCategories().then(function (res) {
          vm.gymCategories = res.data;
          console.log('Loaded gym categories: ' + JSON.stringify(vm.gymCategories));
        }, function (err) {
          console.error('Error while getting gym categories: ' + JSON.stringify(err));
        });
      }

      function getGymExercise() {
        remoteService.getGymExercises($scope.data.gym_category).then(function (res) {
          vm.gymExercises = res.data;
          var gymExerciseLookup = {};
          var item;
          for (var i = 0; i < vm.gymExercises.length; i++) {
            item = vm.gymExercises[i];
            gymExerciseLookup[item.pk] = item.name;
          }
          vm.gym_exercise_lookup = gymExerciseLookup;
          console.log('Gym Exercises loaded: ' + JSON.stringify(vm.gymExercises));
        }, function (err) {
          console.error("Error in getting gym exercises: " + JSON.stringify(err));
        });
      }

      function createWorkout(data) {
        remoteService.createUserWorkout(
          data.gym_exercise, data.duration, data.sets, data.reps
        ).then(function (res) {
          console.log('Workout created: ' + JSON.stringify(res));
        });
        console.log("Data: " + JSON.stringify(data));
      }

      function getWorkouts() {
        remoteService.getUserWorkouts().then(function (res) {
          vm.workouts = res.data;
          console.log('User workouts: ' + JSON.stringify(vm.workouts));
        });
      }

      // timer stuff starts
      $scope.timerRunning = true;

      $scope.startTimer = function () {
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      };

      $scope.stopTimer = function () {
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
      };

      $scope.$on('timer-stopped', function (event, data) {
        console.log('Timer Stopped - data = ', data);
      });
      // timer stuff ends

      function dailyWeight() {
        $state.go('app.daily-weights');
      }

      vm.openBookingModal = openBookingModal;

      vm.closeModal = closeModal;

      vm.selectDay = selectDay;

      vm.bookSlot = bookSlot;

      vm.accessWorkouts = accessWorkouts;

      vm.getCreateWorkoutData = getCreateWorkoutData;

      vm.getGymExercise = getGymExercise;

      vm.workoutLogin = workoutLogin;

      vm.createWorkout = createWorkout;

      vm.getWorkouts = getWorkouts;

      vm.dailyWeight = dailyWeight;

      vm.logout = logout;

    });

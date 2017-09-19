/**
 * Created by animesh on 14/9/17.
 */
angular.module('invisionApp')
  .controller('ExerciseController', function (remoteService, $scope, $stateParams) {

    'use strict';

    var vm = this;

    vm.exercises = [{'name': 'dummy'}];

    var pk = $stateParams.categoryId;
    console.log('Pk in exercise: ' + pk);
    remoteService.getExercises(pk).then(function (res) {
      vm.exercises = res.data;
      console.log("Exercises: " + JSON.stringify(vm.exercises));
    }, function (err) {
      console.error('Error in getting exercises: ' + JSON.stringify(err));
    });

  });

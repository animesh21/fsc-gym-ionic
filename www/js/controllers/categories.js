/**
 * Categories controller
 */
angular.module('invisionApp')

  .controller('CategoriesController', function (remoteService, $state, $scope) {

    'use strict';

    var vm = this;

    remoteService.getCategories().then(function (res) {
      console.log('Got categories: ' + JSON.stringify(res));
      vm.categories = res.data;
    }, function (err) {
      console.error('Error while getting categories: ' + JSON.stringify(err));
    });

    function getExercises(cat_pk, cat_name) {
      vm.category = cat_name;
      console.log("Selected category: " + JSON.stringify(cat_name));
      remoteService.getExercises(cat_pk).then(function (res) {
        vm.exercises = res.data;
        console.log("Exercises: " + JSON.stringify(vm.exercises));
        $state.go('app.exercises', {'categoryId': cat_pk});
      }, function (err) {
        console.error("Error while getting exercises: " + JSON.stringify(err));
      });
    }

    vm.getExercises = getExercises;
  });

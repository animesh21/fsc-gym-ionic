/**
 * Created by animesh on 11/9/17.
 */
angular.module('invisionApp')
  .controller('StoriesController', function (remoteService) {

    'use strict';

    var vm = this;

    remoteService.getStories().then(function (res) {
      console.log('Stories: ' + JSON.stringify(res));
      vm.stories = res.data;
      vm.current_story = vm.stories[0];
    });

    vm.changeStory = function (n) {
      if (vm.stories.length > n) {
        vm.current_story = vm.stories[n];
      }
    };
  });

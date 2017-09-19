/**
 * Created by animesh on 16/9/17.
 */
angular.module('invisionApp')
  .controller('DailyWeightController', function (remoteService, $stateParams, $state) {

    'use strict';

    var vm = this;

    remoteService.getUserWeights().then(function (res) {
      vm.dailyWeights = res.data;
    });

  });

/**
 * Created by animesh on 13/9/17.
 */
angular.module('invisionApp')
  .factory('popupService', function ($ionicPopup) {

    'use strict';

    function _show_popup(title, message) {
      var popup = $ionicPopup.show({
        title: title,
        template: message,
        buttons: [
          {
            'text': 'OK'
          }
        ]
      });
    }

    return {
      showPopup: _show_popup
    };

  });

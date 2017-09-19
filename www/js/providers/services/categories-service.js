/**
 * Categories service
 */
angular.module('invisionApp')

  .service('categoriesService', function ($http, routesConfig) {

    'use strict';

    var api_url = 'http://127.0.0.1:8000/workout/categories';

    function _getCategories() {
      return $http.get(api_url)
        .then(function (response) {
          console.log('Response: ' + JSON.stringify(response));
          return response;
        }, function (err) {
          console.error('Error in response: ' + JSON.stringify(err));
          return err;
        });
    }

    function _getCategory(catId) {
      return _getCategories()
        .then(function (categories) {
          var categoriesLength = categories.length;

          if (categoriesLength && categoriesLength < 1) {
            return null;
          }

          for (var index = 0; index < categoriesLength; index++) {
            if (parseInt(categories[index].id, 10) === parseInt(catId, 10)) {
              return categories[index];
            }
          }
        });
    }


    return {
      getCategories: _getCategories,
      getCategory: _getCategory,
    };
  });

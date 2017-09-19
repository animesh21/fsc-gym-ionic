/**
 * SurfIT invisionApp
 */
angular.module('invisionApp', ['ionic', 'srfSocialSharing', 'ngCordova', 'ionic-durationpicker'])

  .run([
    '$ionicPlatform',
    '$window',
    function ($ionicPlatform, $window) {
      'use strict';
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        $window.localStorage.setItem('showIntro', true);

        var notificationOpenedCallback = function () {
        };
        // Update with your OneSignal AppId and googleProjectNumber before running.
        if ($window.plugins && $window.plugins.OneSignal) {
          $window.plugins.OneSignal.init('bff790de-6c7b-4550-9202-0acebb924b28', {googleProjectNumber: '295165547597'},
            notificationOpenedCallback);
        }
      });
    }
  ])

  .config([
    '$stateProvider',
    '$urlRouterProvider',
    '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    'use strict';

    $ionicConfigProvider.tabs.position('top');
      $ionicConfigProvider.tabs.style('standard');

      $stateProvider
        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'ApplicationController as appCtrl'
        })
        .state('app.stories', {
          url: '/stories',
          cache: false,
          views: {
            'menuContent': {
              templateUrl: 'templates/stories.html',
              controller: 'StoriesController as storiesCtrl'
            }
          }
        })
        .state('app.categories', {
          url: '/categories',
          views: {
            'menuContent': {
              templateUrl: 'templates/categories.html',
              controller: 'CategoriesController as categoriesCtrl'
            }
          }
        })
        .state('app.exercises', {
          url: '/exercises/:categoryId',
          views: {
            'menuContent': {
              templateUrl: 'templates/exercises.html',
              controller: 'ExerciseController as exerciseCtrl'
            }
          }
        })
        // .state('app.category-featured', {
        //   url: '/categories/featured/:categoryId',
        //   views: {
        //     'menuContent': {
        //       templateUrl: 'templates/category-featured.html',
        //       controller: 'ItemsController as itemsCtrl'
        //     }
        //   }
        // })
        // .state('app.item', {
        //   url: '/items/:itemId',
        //   views: {
        //     'menuContent': {
        //       templateUrl: 'templates/item.html',
        //       controller: 'ItemsController as itemCtrl'
        //     }
        //   }
        // })
        // .state('app.comments', {
        //   url: '/comments',
        //   views: {
        //     'menuContent': {
        //       templateUrl: 'templates/comments.html',
        //       controller: 'CommentsController as commentsCtrl'
        //     }
        //   }
        // })
        .state('app.login', {
          url: '/login',
          views: {
            'menuContent': {
              controller: 'LoginController as loginCtrl',
              templateUrl: 'templates/login.html'
            }
          }
        })
        .state('app.register', {
          url: '/register',
          views: {
            'menuContent': {
              controller: 'LoginController as loginCtrl',
              templateUrl: 'templates/register.html'
            }
          }
        })
        // .state('app.terms', {
        //   url: '/terms',
        //   views: {
        //     'menuContent': {
        //       templateUrl: 'templates/terms.html'
        //     }
        //   }
        // })
        // .state('app.help', {
        //   url: '/help',
        //   views: {
        //     'menuContent': {
        //       templateUrl: 'templates/help.html'
        //     }
        //   }
        // })
        // .state('app.session-time', {
        //   url: '/session-time',
        //   views: {
        //     'menuContent': {
        //       templateUrl: 'templates/session-time.html'
        //     }
        //   }
        // })
        .state('app.more', {
          url: '/more',
          views: {
            'menuContent': {
              templateUrl: 'templates/more.html'
            }
          }
        })
        .state('app.workout-options', {
          url: '/workout-options',
          views: {
            'menuContent': {
              templateUrl: 'templates/workout-options.html'
            }
          }
        })
        .state('app.execrise-timer', {
          url: '/exercise-timer',
          views: {
            'menuContent': {
              templateUrl: 'templates/execrise-timer.html'
            }
          }
        })
        .state('app.daily-weights', {
          url: '/daily-weights',
          views: {
            'menuContent': {
              controller: 'DailyWeightController as dailyWeightCtrl',
              templateUrl: 'templates/daily-weights.html'
            }
          }
        })
        .state('app.edit-timer', {
          url: '/edit-timer',
          views: {
            'menuContent': {
              templateUrl: 'templates/edit-timer.html'
            }
          }
        })
        .state('app.edit-timer-step-1', {
          url: '/edit-timer-step-1',
          views: {
            'menuContent': {
              templateUrl: 'templates/edit-timer-step-1.html'
            }
          }
        })
        .state('app.create-workout', {
          url: '/create-workout',
          views: {
            'menuContent': {
              templateUrl: 'templates/create-workout.html'
            }
          }
        })
        .state('app.my-training', {
          url: '/my-training',
          views: {
            'menuContent': {
              controller: 'TrainingController as trainingCtrl',
              templateUrl: 'templates/my-training.html'
            }
          }
        })
        .state('app.workout-time', {
          url: '/workout-time',
          views: {
            'menuContent': {
              templateUrl: 'templates/workout-time.html'
            }
          }
        })
        .state('app.create-workout-password-access', {
          url: '/create-workout-password-access',
          views: {
            'menuContent': {
              templateUrl: 'templates/create-workout-password-access.html'
            }
          }
        })
        .state('app.slideshow', {
          url: '/slideshow/:forceShow',
          views: {
            'menuContent': {
              templateUrl: 'templates/slideshow.html',
              controller: 'SlideshowController as slideshowCtrl'
            }
          }
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise(function ($injector, $location) {
        var state = $injector.get('$state');
        state.go('app.login', {'forceShow': false});
        return $location.path();
      });
    }
  ]);

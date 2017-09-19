/**
 * Created by animesh on 31/8/17.
 */
angular.module("invisionApp")
  .service("remoteService", function ($http, $localstorage, popupService, $state) {

    'use strict';

    var base_url = 'http://127.0.0.1:8000/workout/';
    // var gsp_url = 'http://greenschoolsprogramme.org/audit2017/api/Gsp/image_post';
    var stories_url = base_url + 'stories';
    var days_url = base_url + 'days';
    var slot_url = base_url + 'slots/';
    var booking_url = base_url + 'book_slot';
    var categories_url = base_url + 'categories';
    var exercises_url = base_url + 'exercises/';
    var gym_categories_url = base_url + 'gym-categories';
    var gym_exercises_url = base_url + 'gym-exercises/';
    var workout_url = base_url + 'workout/';
    var daily_weight_url = base_url + 'daily-weight/';

    function _signup(firstName, lastName, email, password) {
      var postData = {
        first_name: firstName,
        last_name: lastName,
        username: email,
        email: email,
        password: password
      };
      return $http.post('http://127.0.0.1:8000/workout/signup', postData);
    }

    function _login(username, password) {
      var postData = {
        username: username,
        password: password
      };
      // var gsp_data = {
      //   userid: 1686
      // };
      return $http.post('http://127.0.0.1:8000/workout/login', postData);
      // return $http.post(gsp_url, gsp_data);
    }

    function _get_stories() {
      return $http.get(stories_url).then(function (res) {

        return res;
      }, function (err) {
        console.log('Error while getting stories: ' + JSON.stringify(err));
        return err;
      });
    }

    function _get_days() {
      return $http.get(days_url).then(function (res) {
        return res;
      }, function (err) {
        // console.log('Error while getting days: ' + JSON.stringify(err));
        var status = err.status;
        if (status === 0) {
          popupService.showPopup("Alert", "Remote Server is not responding," +
            " please try after sometime.");
        }
        else if(status === -1) {
          popupService.showPopup("Alert", "Your internet is not working," +
            "please enable it before proceeding.");
        }
        else {
          popupService.showPopup("Alert", "There is an error, please " +
            "try after sometime.");
        }
        $state.go('^');
        return err;
      });
    }

    function _get_slots(day) {
      return $http.get(slot_url + day).then(function (res) {
        return res;
      }, function (err) {
        console.log("Error while getting slots: " + JSON.stringify(err));
        return err;
      });
    }

    function _book_slot(day, slot) {
      var userID = $localstorage.get('userid', 0);
      console.log('userID in booking: ' + userID);
      var post_data = {
        'day': day,
        'slot': slot,
        'user': userID
      };
      console.log("booking data: " + JSON.stringify(post_data));
      return $http.post(booking_url, post_data);
    }

    function _get_categories() {
      return $http.get(categories_url).then(function (res) {
        return res;
      }, function (err) {
        console.error('Error while getting categories');
        return err;
      });
    }

    function _get_exercises(cat_pk) {
      return $http.get(exercises_url + cat_pk);
    }

    function _get_gym_categories() {
      return $http.get(gym_categories_url).then();
    }

    function _get_gym_exercises(gym_cat_id) {
      return $http.get(gym_exercises_url + gym_cat_id);
    }

    function _get_user_workouts() {
      var user_id = $localstorage.get('userid', 0);
      return $http.get(workout_url + user_id);
    }

    function _create_user_workout(exercise_id, timeout, sets, reps) {
      var user_id = $localstorage.get('userid', 0);
      var postData = {
        user: user_id,
        gym_exercise: exercise_id,
        timeout: timeout,
        sets: sets,
        reps: reps
      };
      return $http.post(workout_url + user_id, postData);
    }

    function _get_user_weights() {
      var user_id = $localstorage.get('userid', 0);
      return $http.get(daily_weight_url + user_id);
    }

    function _post_user_weight(weight) {
      var user_id = $localstorage.get('userid', 0);
      var post_data = {
        user: user_id,
        weight: weight
      };
      return $http.post(daily_weight_url + user_id, post_data);
    }

    return {
      signup: _signup,
      login: _login,
      getStories: _get_stories,
      getDays: _get_days,
      getSlots: _get_slots,
      bookSlot: _book_slot,
      getCategories: _get_categories,
      getExercises: _get_exercises,
      getGymCategories: _get_gym_categories,
      getGymExercises: _get_gym_exercises,
      createUserWorkout: _create_user_workout,
      getUserWorkouts: _get_user_workouts,
      getUserWeights: _get_user_weights,
      postUserWeight: _post_user_weight
    };
  });

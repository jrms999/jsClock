angular.module('clock', [])
.controller('ClockController', [
  '$scope',
  '$timeout',
  function($scope, $timeout) {
    angular.element(document).ready(function() {
      $scope.update();
    });
    
    $scope.update = function() {
      var date = new Date();
      if (!$scope.model) {
        $scope.model = {};
      }
      $scope.model.second = date.getSeconds();
      $scope.second = $scope.model.second;
      $scope.minute = date.getMinutes();
      $scope.hour = date.getHours();
      $timeout(function() {
        $scope.update();
      }, 1000);
    }
  }
])
.filter('color', function() {
  return function(input, level, color) {
    switch(level) {
      case 1:
        if (input % 2 == 1) {
          return 'light';
        }
        break;
      case 2:
        if ((input % 10) % 4 >= 2) {
          return 'light';
        }
        break;
      case 3:
        if ((input % 10) % 8 >= 4) {
          return 'light';
        }
        break;
      case 4:
        if ((input % 10) % 16 >= 8) {
          return 'light';
        }
        break;
      case 5:
        if (parseInt(input / 10) % 2 == 1) {
          return 'light';
        }
        break;
      case 6:
        if (parseInt(input / 10) % 4 >= 2) {
          return 'light';
        }
        break;
      case 7:
        if (parseInt(input / 10) % 8 >= 4) {
          return 'light';
        }
        break;
    }
    return "dark";
  }
});
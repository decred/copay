'use strict';

angular.module('copayApp.controllers').controller('nextStepsController', function($scope, nextStepsService, $ionicScrollDelegate, $timeout, externalLinkService) {

  $scope.openExternalLink = function(url) {
    externalLinkService.open(url);
  };

  $scope.hide = false;
  $scope.services = nextStepsService.get();

  $scope.toggle = function() {
    $scope.hide = !$scope.hide;
    $timeout(function() {
      $ionicScrollDelegate.resize();
      $scope.$apply();
    }, 10);
  };

});

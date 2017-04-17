// (function(angular) {
	'use strict';

  mainApp.controller('gameViewController', function ($scope) {

    return true;
  });

  mainApp.directive('slidingPuzzle', function(){
    return {
      restrict: 'EA',
      replace: true,
      template: '<h2>Movings : </h2>',
      scope: {
          size: '@',
          src: '@',
          api: '='
      },      
      link: function(scope, element, attrs) {

      }
    }
  });
// })(window.angular);



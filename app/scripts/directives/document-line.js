'use strict';

angular.module('lorryApp')
  .directive('documentLine', ['$log', 'lodash', function ($log, lodash) {
    return {
      scope: {
        line: '='
      },
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        if (!lodash.isEmpty(scope.line.errors)) {
          element.addClass('error');
          element.find('.line-info')
            .attr('title', scope.line.errors[0].error.message)
            .css('display', 'block');
        }
      },
      templateUrl: '/scripts/directives/document-line.html'
    };
  }]);

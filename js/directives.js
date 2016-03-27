angular.module('todoList').directive('todoFocus', function($timeout) {
	return {
		restric: 'A',
		link: function ($scope, $element, $attr) {
			$scope.$watch($attr.todoFocus, function (newValue) {
	        $timeout(function() {
	            newValue && $element[0].focus();
	        });
	      	});
		}
	};
});


angular.module('todoList').directive('todoCancel', function todoFocus($timeout) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			var ESCAPE_KEY = 27;
			elem.on('keydown', function(evt){
				if(evt.keyCode === ESCAPE_KEY){
					scope.$apply(attrs.todoCancel);
				}
			});

			elem.on('$destroy', function () {
				elem.unbind('keydown');
			});
		}
	}
});
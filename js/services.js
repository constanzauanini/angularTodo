angular.module('storage',[]).factory('storageService', function() {
	var id= Number.parseInt(localStorage.getItem('taskId')) || 1;
	var storageService = {
	save: function(obj) {
		if (!obj.id) {
			obj.id = id;
			id++;
        	localStorage.setItem('taskId', id);
		}
		localStorage.setItem("task-"+obj.id, angular.toJson(obj));
        return obj;
	},
	delete: function(obj) {
		localStorage.removeItem("task-"+obj.id);
	},
	getAll: function() {
		var items = [];
		for (var key in window.localStorage) {
			if (key.toString().startsWith("task-")) {
				var task = JSON.parse(localStorage.getItem(key));
				items.push(task);
			}
		}
		return items;
	}
};
return storageService;
});
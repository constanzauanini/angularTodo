(function() {
	var app = angular.module('todoList', ['ngAnimate', 'storage']);
	app.controller('ToDoListController', ['storageService', function(storageService) {
		this.tasks = storageService.getAll();
		this.task = {
			"done": false
		};
		this.editedTask = {};
		this.originalTask = {};
		this.statusFilter = {
			'done': ''
		};
		this.add = function () {
			var obj = storageService.save(this.task);
			this.tasks.push(obj);
			this.task={
				"done": false
			};
		};
		this.update = function (task) {
			storageService.save(task);
			this.editedTask = {};
		}
		this.edit = function ($event, task) {
			this.originalTask = angular.extend({}, task);
			this.editedTask = task;
			$event.stopPropagation();
		};
		this.isEditing = function(task) {
			return task.id === this.editedTask.id;
		};
		this.delete = function(task) {
			storageService.delete(task);
			var i = this.tasks.indexOf(task);
			if(i != -1) {
				this.tasks.splice(i, 1);
			}
		};
		this.filter = function(value) {
			var filters = {
				'incomplete': 'false',
				'completed': 'true'
			};
			this.statusFilter.done = filters[value] || '';
		};
		this.isFiltered = function(value){
			var mapper = {'all':'', 'completed':'true', 'incomplete':'false'}
			var check = mapper[value] || '';
			return this.statusFilter.done === check;
		};
		this.exit = function() {
			if (this.editedTask) {
				this.update(this.editedTask);
			}
			this.editedTask = {};
		};
		this.cancelEditing = function(task) {
			this.tasks[this.tasks.indexOf(task)] = this.originalTask;
			this.originalTask = {};
			this.editedTask = {};
		};

	}]);
})();
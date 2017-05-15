(function () {
    angular
        .module('myapp', []);

    angular
        .module('myapp')
        .controller('MainController', function ($scope, $http) {
            $scope.todo = {};

            // when landing on the page, get all todos and show them
            $scope.retrieveTodos = function () {
                $http.get('/api/todos').then(function (response) {
                        $scope.todos = response.data;
                    }).catch(function (error) {
                        console.log("Error: " + error.data);
                    });
            };

            // when submitting the add form, send the text to the node API
            $scope.createTodo = function () {
                $http.post('/api/todos', $scope.todo).then(function (response) {
                        $scope.todo = {}; // clear the form so our user is ready to enter another
                        $scope.errors = {};
                        $scope.todos.push(response.data);
                    }).catch(function (error) {
                        $scope.errors = error.data.errors;
                    });
            };

            // delete a todo after checking it
            $scope.deleteTodo = function (id, index) {
                console.log(id, index);
                $http.delete('/api/todos/' + id).then(function (data) {
                        console.log("Todos: ", data);
                        $scope.todos.splice(index, 1);
                    }).catch(function(data) {
                        console.log('Error: ' + data);
                    });
            };

            $scope.retrieveTodos();

        });

})();

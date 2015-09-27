'use strict';

bookSearchApp.controller('BookSearchCtrl', ['$scope', '$http', '$cookies',
  function ($scope, $http, $cookies) {
    $scope.query = '';
    $scope.queryHistory = [];
    $scope.books = [];
    $scope.loading = false;

    // Get search query history from cookie
    if(angular.isArray($cookies.getObject('query_history'))) {
      $scope.queryHistory = $cookies.getObject('query_history');
    }
    
    // Search form submitted
    $scope.search = function() {
      // Add query to search history if unique
      if($scope.queryHistory.indexOf($scope.query) < 0) {
        $scope.queryHistory.push($scope.query);
        // Keep max 10 items
        while($scope.queryHistory.length > 10) {
          $scope.queryHistory.shift();
        }
        $cookies.putObject('query_history', $scope.queryHistory);
      }

      $scope.loading = true;
      
      //var apiUrl = 'data/books.json';
      var apiUrl = 'https://www.googleapis.com/books/v1/volumes';

      // Load google books json
      $http.get(apiUrl, {params:{q: $scope.query}}).
        then(function(response) {
          $scope.books = response.data.items;
          $scope.query = '';
        }, function(response) {
          alert('Error loading book list.');
        }).finally(function() {
          $scope.loading = false;
        });
    };

    // Handle click on search history item
    $scope.searchHistory = function(query) {
      $scope.query = query;
      $scope.search();
    };
  }
]);

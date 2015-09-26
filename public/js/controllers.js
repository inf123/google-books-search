'use strict';

bookSearchApp.controller('BookSearchCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.query = '';
    $scope.queryHistory = [];
    
    // Search form submitted
    $scope.search = function() {
      console.log('Search query: ' + $scope.query);

      // Add query to search history if unique
      if($scope.queryHistory.indexOf($scope.query) < 0) {
        $scope.queryHistory.push($scope.query);
        // Keep max 10 items
        while($scope.queryHistory.length > 10) {
          $scope.queryHistory.shift();
        }
      }

      //var apiUrl = 'data/books.json';
      var apiUrl = 'https://www.googleapis.com/books/v1/volumes';

      // Load google books json
      $http.get(apiUrl, {params:{q: $scope.query}}).
        then(function(response) {
          $scope.books = response.data.items;
          $scope.query = '';
        }, function(response) {
          alert('Error loading book list.');
        });
    };

    // Handle click on search history item
    $scope.searchHistory = function(query) {
      $scope.query = query;
      $scope.search();
    };
  }
]);


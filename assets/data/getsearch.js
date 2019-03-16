let app = angular.module("myApp", []);
app.controller("search",function($scope,$http){
    $http.get("http://localhost:3000/searchevent").then(function(response){
        $scope.data=response.data;
        console.log(data);
    });  
});
let app = angular.module("myApp", ["ngRoute"]);
app.controller("getreview",function($scope,$http){
    $http.get("http://localhost:3000/reviews").then(function(response){
        $scope.data=response.data;
    });  
});
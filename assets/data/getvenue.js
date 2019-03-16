let app = angular.module("myApp", ["ngRoute"]);
app.controller("getvenue",function($scope,$http){
    $http.get("http://localhost:3000/getvenue").then(function(response){
        $scope.data=response.data;
    });  
});
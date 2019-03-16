let app = angular.module("myApp", ["ngRoute"]);
app.controller("getequipment",function($scope,$http){
    $http.get("http://localhost:3000/getequipment").then(function(response){
        $scope.data=response.data;
    });  
});
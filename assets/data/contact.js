let app = angular.module("myApp", []);
app.controller('contact', function($scope,$http) {
    console.log("controller called");
    $scope.submit=function(){
            console.log("Data Received");
            if($scope.name && $scope.email && $scope.msg){
                alert("Thank You");
                let data={
                    "Name":$scope.name,
                    "Email":$scope.email,
                    "Message":$scope.msg
                };
                $http.post("http://localhost:3000/contact",data).then(function(response){
                    console.log("post request sent");
                });
                console.log(data);
            }
            else{
                alert("Enter all data");
            }
        }
});
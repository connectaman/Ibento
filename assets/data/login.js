let app = angular.module("myApp", ["ngRoute"]);
app.controller('login', function($scope,$http,$window) {
    console.log("controller called");
    $scope.submit=function(){
        if($scope.email == "admin@admin.com" && $scope.password == "admin123")
        {
            $window.location.href ="assets/admin_dashboard.html";
        }
        if($scope.email && $scope.password)
        {
            console.log("Data Received");
                let value={
                    "UserEmail":$scope.email,
                    "UserPassword":$scope.password
                };
                $http.post("http://localhost:3000/login",value).then(function(response){
                    console.log(response.data.msg);
                    if(response.data.msg == "invalid")
                    {
                        $scope.value="Email or Password Incorrect";
                    }
                    else{
                        console.log("redirect");
                        $window.location.href ="assets/dasboard.html";
                        alert.log(data.Name);
                    }
                });  
            }
    }
});
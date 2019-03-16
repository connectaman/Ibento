let app = angular.module("myApp", []);
app.controller('Register', function($scope,$http,$window) {
    console.log("controller called");
    $scope.submit=function(){
        if($scope.name && $scope.dob && $scope.email && $scope.password && $scope.confirmpassword && $scope.gender && $scope.phone && $scope.city && $scope.state)
        {
            console.log("Data Received");
            if($scope.password == $scope.confirmpassword)
            {
                let data={
                    "_id":$scope.email,
                    "Name":$scope.name,
                    "dob":$scope.dob,
                    "Password":$scope.password,
                    "Gender":$scope.gender,
                    "Phone":$scope.phone,
                    "City":$scope.city,
                    "State":$scope.state
                };
                $http.post("http://localhost:3000/register",data).then(function(response){
                    console.log("post request sent");
                    if(response.data.msg == "duplicate")
                    {
                        alert("Sorry You have already registered please login")
                    }
                    else if(response.data.msg == "success"){
                        $window.location.href ="login.html";
                    }
                });
                console.log(data);
            }
            else
            {
                console.log("password mismatch");
            }
        
        }
        else{
            alert("fill all required data");
        }
        
    }
});
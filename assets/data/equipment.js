let app=angular.module("myApp",[]);
app.controller('equipment',function($scope,$http){
    console.log("controller called");
    $scope.submit=function(){
        if($scope.name && $scope.email && $scope.phone && $scope.address && $scope.city && $scope.pin)
        {
            let data = {
                "Name":$scope.name,
                "Email":$scope.email,
                "Phone":$scope.phone,
                "Address":$scope.address,
                "City":$scope.city,
                "PinCode":$scope.pin,
                "Items":$scope.items,
                "StartDate":$scope.startdate,
                "EndDate":$scope.enddate,
                "Review":$scope.review
            };
            alert("Data Added Successfully");
            $http.post("http://localhost:3000/equipments",data).then(function(response){
                console.log("post request sent");
            });
            console.log(data);
        }
        else{
            alert("Fill all the required field");
        }
    }
});
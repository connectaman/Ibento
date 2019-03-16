let app=angular.module("myApp",[]);
app.controller('venue',function($scope,$http){
    console.log("controller called");
    $scope.submit=function(){
        if($scope.name && $scope.email && $scope.phone && $scope.address && $scope.city && $scope.pin)
        {
            let data = {
                "Name":$scope.name,
                "Designation":$scope.designation,
                "Email":$scope.email,
                "Phone":$scope.phone,
                "Address":$scope.address,
                "City":$scope.city,
                "PinCode":$scope.pin,
                "Halls":$scope.hall,
                "Size":$scope.size,
                "EventType":$scope.eventhost,
                "Cost":$scope.rental,
                "Attendees":$scope.attendees,
                "Contract":$scope.contract,
                "Image":$scope.image,
                "Description":$scope.description
            };
            $http.post("http://localhost:3000/venue",data).then(function(response){
                console.log("post request sent");
            });
            console.log(data);
        }
    }
});
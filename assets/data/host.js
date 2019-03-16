let app = angular.module("myApp", []);
app.controller('hostevent', function($scope,$http) {
    console.log("controller called");
    $scope.submit=function(){
        if($scope.phone && $scope.pin && $scope.attendees)
        {
            alert("Data added Successfully");
            let data={
                "name":$scope.name,
                "designation":$scope.designation,
                "email":$scope.email,
                "phone":$scope.phone,
                "address":$scope.address,
                "city":$scope.city,
                "pin":$scope.pin,
                "eventname":$scope.eventname,
                "eventtype":$scope.eventtype,
                "startdate":$scope.startdate,
                "enddate":$scope.enddate,
                "contract":$scope.contract,
                "eventcity":$scope.eventcity,
                "image":$scope.image,
                "video":$scope.video,
                "map":$scope.map,
                "description":$scope.description
            };
            console.log(data);
            $http.post("http://localhost:3000/host",data).then(function(response){
                console.log("post request sent");
            });
        }
        else{
            alert("please fill all data");
        }
    }
});

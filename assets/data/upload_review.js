let app=angular.module("myApp",[]);
app.controller('review',function($scope,$http){
    console.log("controller called");
    $scope.submit=function(){
            let data = {
                "EventName":$scope.EventName,
                "EventType":$scope.eventtype,
                "Image":$scope.image,
                "Video":$scope.video,
                "Review":$scope.description
            };
            $http.post("http://localhost:3000/review",data).then(function(response){
                console.log("post request sent");
            });
            console.log(data);
    }
});
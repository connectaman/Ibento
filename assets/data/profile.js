let app = angular.module("myApp", ["ngRoute"]);
app.controller("profile",function($scope,$http){
    $http.post("http://localhost:3000/profile").then(function(response){
        $scope.val=response.data;
    });  
    $scope.update=function(){
            let val = {
                "_id":document.getElementById('email').value,
                "Name":document.getElementById('name').value,
                "dob":document.getElementById('dob').value,
                "Phone":document.getElementById('phone').value,
                "City":document.getElementById('city').value,
                "State":document.getElementById('state').value,
            };
            $http.post("http://localhost:3000/updateprofile",val).then(function(response){
                console.log(response.data.msg);
                if(response.data.msg == "updated")
                {
                    alert("Updated Successfully");
                }
                else{
                    alert("error");
                }
            });
    }
});
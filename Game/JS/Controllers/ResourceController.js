app.controller('ResourceCtrl',function($scope, DB){
    $scope.Resources = []

    DB.selectAll("Resources").then(function(res){
        res.data.forEach(resource => {
            $scope.Resources.push(resource)
        });
    })
});
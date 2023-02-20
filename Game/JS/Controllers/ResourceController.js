app.controller('ResourceCtrl',function($scope,$rootScope, DB){
    $scope.resources = [];

    DB.selectAll('resources').then(function(res){
        $scope.all = [];
        $scope.userall = [];
        res.data.forEach(element => {
            $scope.all.push(element);
        });
        DB.select('resources_by_user','UserID',$rootScope.User.ID).then(function(res){
            res.data.forEach(element =>{
                $scope.userall.push(element);
            })
            for(i = 0; i <= $scope.all.length; i++){
                if($scope.userall.length > i){
                    console.log($scope.userall[i]);
                    let resource ={
                        name: $scope.all[i].Name,
                        description: $scope.all[i].Description,
                        quantity: $scope.userall[i].Quantity
                    }
                    $scope.resources.push(resource)
                }
            }
        });

    })

    
});
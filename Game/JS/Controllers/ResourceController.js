app.controller('ResourceCtrl',function($scope,$rootScope, DB){
    $scope.resources = [];
    
    DB.select('resources_by_user', 'UserID', $rootScope.User.ID).then(function(res){
        if(res.data.length === 0){
            for(i = 0; i < 2; i++){
                let data ={
                    ResourceID: i,
                    UserID: $rootScope.User.ID,
                    Quantity: 0                
                }
                DB.insert('resources_by_user', data)
            }
        }
    })

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
                        quantity: $scope.userall[i].Quantity,
                        storage: $rootScope.storage
                    }
                    $scope.resources.push(resource)
                }
            }
            $rootScope.resources = $scope.resources;
        });

    })

    
});
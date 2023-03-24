app.controller('ResourceCtrl',function($scope,$rootScope, DB){
    $scope.resources = [];
    
    DB.select('resources_by_user', 'UserID', $rootScope.User.ID).then(function(res){
        if(res.data.length == 0 && $rootScope.Specie == 'Cell'){
            for(i = 0; i < 2; i++){
                let data ={
                    ResourceID: i,
                    UserID: $rootScope.User.ID,
                    Quantity: 0                
                }
                DB.insert('resources_by_user', data)
            }
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
        }
        else if(res.data.length == 0){
            DB.selectAll("resources").then(function(res){
                let i = 0;
                res.data.forEach(element =>{
                    if(i > 1){
                        $scope.resources.push(element)
                        let data ={
                            ResourceID: i,
                            UserID: $rootScope.User.ID,
                            Quantity: 0                
                        };
                        DB.insert('resources_by_user', data);
                    }
                    i++;
                });
            });
        }
        else{
            let i = 0 
            DB.selectAll("resources").then(function(results){
                results.data.forEach(element =>{
                    if(i > 1){
                        let data = {
                            name: results.data[i].Name,
                            description: results.data[i].Description,
                            quantity: res.data[i-2].Quantity
                        }
                        $scope.resources.push(data)
                    }
                    i++;
                });
            });
        };
    });
});
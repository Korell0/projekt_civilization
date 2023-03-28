app.controller('ResourceCtrl',function($scope,$rootScope, DB){
    $scope.resources = $rootScope.resources;
    $scope.resources = [];
    
    DB.select('resources_by_user', 'UserID', $rootScope.User.ID).then(function(result){
        if(result.data.length == 0 && $rootScope.Specie == 'Cell'){
            DB.selectAll('resources').then(function(res){
                for(i = 0; i < 2; i++){
                    let data = {
                        Name: res.data[i].Name,
                        Description: res.data[i].Description,
                        Quantity: 0,
                        Storage: 100,
                        Increase: 0
                    }
                    $scope.resources.push(data)
                }
                $rootScope.resources = $scope.resources
            })
        }
        else if(result.data.length == 0){
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
            DB.selectAll('resources').then(function(results){
                let i = 0;
                result.data.forEach(element =>{
                    if(i > 1){
                        let data = {
                            Name: results.data[i].Name,
                            Description: results.data[i].Description,
                            Quantity: element.Quantity
                        }
                        $scope.resources.push(data);
                    }
                    i++;
                })
            })
        };
    });
});
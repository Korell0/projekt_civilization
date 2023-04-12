app.controller('ResourceCtrl',function($scope,$rootScope, DB, $interval){
    $scope.resources = $rootScope.resources;
    
    $interval(function(){   
        if($rootScope.User.Specie == "Cell"){
            if($rootScope.evolved.length != 0){
                for(i = 0; i < $rootScope.buttons.length; i++){
                    for(j = 0; j < $rootScope.evolved.length; j++){
                        if(($rootScope.buttons[i].Evolution_req == $rootScope.evolved[j].Name && !$rootScope.buttons[i].evolved)){
                            $rootScope.visibled.push($rootScope.buttons[i]);
                            $rootScope.buttons[i].hidden = false;                    
                        }
                        else if($rootScope.buttons[i].Evolution_req == "0"){
                            $rootScope.buttons[i].hidden = false;                    
                        }
                        else{
                            if($rootScope.buttons[i].Evolution_req.includes("/")){
                                for(e = 0; e < $rootScope.buttons[i].Evolution_req.split("/").length; e++){
                                    if($rootScope.evolved[j].Name == $rootScope.buttons[i].Evolution_req.split("/")[e]){
                                        $rootScope.buttons[i].hidden = false;
                                    }
                                }
                            }
                            else{
                                $rootScope.buttons[i].hidden = true;
                            }
                        }
                    }
                }
            }
            else{
                for(i = 0; i < $rootScope.buttons.length; i++){
                    if($rootScope.buttons[i].Evolution_req == "0"){
                        $rootScope.buttons[i].hidden = false;
                    }
                    else{
                        $rootScope.buttons[i].hidden = true;
                    }
                }
            }
            if($rootScope.resources[0].Quantity + $rootScope.resources[0].Increase <= $rootScope.resources[0].Storage){
                $rootScope.resources[0].Quantity = $rootScope.resources[0].Quantity + $rootScope.resources[0].Increase;
            }
            else{
                $rootScope.resources[0].Quantity = $rootScope.resources[0].Storage;
            }
            if($rootScope.resources[1].Quantity + $rootScope.resources[1].Increase <= $rootScope.resources[1].Storage){
                $rootScope.resources[1].Quantity = $rootScope.resources[1].Quantity + $rootScope.resources[1].Increase;
            }
            else{
                $rootScope.resources[1].Quantity = $rootScope.resources[1].Storage;
            }
        }
        else{
            $rootScope.buildings.forEach(building =>{
                let idx = building.ID;
                if(ResourceProduct(idx)){
                    $rootScope.resources.forEach(resource =>{
                        if(building.Bonus.split(' ')[1] == resource.Name){
                            resource.Change = 0;
                            resource.Quantity += parseInt(building.Bonus.split(' ')[0] * building.Quantity);
                            resource.Change += parseInt(building.Bonus.split(' ')[0] * building.Quantity);
                        }
                    })
                }
            })
            $rootScope.jobs.forEach(job =>{
                console.log($rootScope.resources.length)
                $rootScope.resources.forEach(resource =>{
                    if(job.Product.split(' ')[1] == resource.Name){
                        resource.Quantity += parseInt(job.Product.split(' ')[0]) * job.Quantity;
                        resource.Change += parseInt(job.Product.split(' ')[0]) * job.Quantity
                    }
                })
            })
        }
    }, 1000)
    DB.select('resources_by_user', 'UserID', $rootScope.User.ID).then(function(result){
        if(result.data.length == 0 && $rootScope.Specie == 'Cell'){
            DB.selectAll('resources').then(function(res){
                for(i = 0; i < 2; i++){
                    let data = {
                        Name: res.data[i].Name,
                        Description: res.data[i].Description,
                        Quantity: 0,
                        Storage: 100,
                        Change: 0
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
                        element.Change = 0;
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
                            Quantity: element.Quantity,
                            change: 0
                        }
                        $scope.resources.push(data);
                    }
                    i++;
                })
            })
        };
    });
    ResourceProduct = function(idx){
        if($rootScope.buildings[idx] != null){
            switch($rootScope.buildings[idx].Bonus.split(' ')[1]){
                case "bones":
                    return true;
                case "wine":
                    return true;
                case "steam":
                    return true;
                default:
                    return false;
            }
        }
    }
});
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
            if(RNA_DNA_Storage(0)){
                $rootScope.resources[0].Quantity = QuantityChange(0);
            }
            else{
                $rootScope.resources[0].Quantity = $rootScope.resources[0].Storage;
            }
            if(RNA_DNA_Storage(1)){
                $rootScope.resources[1].Quantity = QuantityChange(1);
            }
            else{
                $rootScope.resources[1].Quantity = $rootScope.resources[1].Storage;
            }
        }
        else{
            ChangesZero()
            $rootScope.buildings.forEach(building =>{
                let idx = building.ID;
                if(ResourceProduct(idx-1)){
                    $rootScope.resources.forEach(resource =>{
                        if(building.Bonus.split(' ')[1].charAt(0).toUpperCase() + building.Bonus.split(' ')[1].slice(1) == resource.Name){
                            resource.Quantity += parseFloat(building.Bonus.split(' ')[0] * building.Quantity);
                            resource.Change += parseFloat(building.Bonus.split(' ')[0] * building.Quantity);
                        }
                    })
                }
            })
            $rootScope.jobs.forEach(job =>{
                $rootScope.resources.forEach(resource =>{
                    if(!job.Product.match("/")){
                        ResourceQuantity(job, 0, resource)
                    }
                    else{
                        if(job.Product.split('/').length == 2){
                            ResourceQuantity(job, 1, resource)
                        }
                        if(job.Product.split('/').length == 3){
                            ResourceQuantity(job, 2, resource)
                        }
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
                        Quantity: parseFloat(0),
                        Storage: 100,
                        Change: parseFloat(0)
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
                            Quantity: parseFloat(0)                
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
                            Storage: parseFloat(100),
                            Change: parseFloat(0)
                        }
                        $scope.resources.push(data);
                    }
                    i++;
                })
            })
        };
    });
    RNA_DNA_Storage = function(idx){
        if($rootScope.resources[idx].Quantity + $rootScope.resources[idx].Change <= $rootScope.resources[idx].Storage){
            return true;
        }
        else return false;
    }
    QuantityChange = function(idx){
        return $rootScope.resources[idx].Quantity + $rootScope.resources[idx].Change
    }
    ChangesZero = function(){
        $rootScope.resources.forEach(resource =>{
            resource.Change = parseFloat(0);
        })
    }
    ResourceQuantity = function(job, route, resource){
        if(route == 0){
            if(resource.Name == job.Product.split(' ')[1].charAt(0).toUpperCase() + job.Product.split(' ')[1].slice(1)){
                resource.Quantity += parseFloat(job.Product.split(' ')[0] * job.Quantity);
                resource.Change += parseFloat(job.Product.split(' ')[0] * job.Quantity)
            }
        }
        else if(route == 1){
            if(resource.Name == job.Product.split(' ')[4].charAt(0).toUpperCase() + job.Product.split(' ')[4].slice(1)){
                resource.Quantity += parseFloat(job.Product.split(' ')[3] * job.Quantity);
                resource.Change += parseFloat(job.Product.split(' ')[3] * job.Quantity)
            }
            if(resource.Name == job.Product.split(' ')[1].charAt(0).toUpperCase() + job.Product.split(' ')[1].slice(1)){
                resource.Quantity += parseFloat(job.Product.split(' ')[0] * job.Quantity);
                resource.Change += parseFloat(job.Product.split(' ')[0] * job.Quantity)
            }
        }
        else if(route == 2){
            if(resource.Name == job.Product.split(' ')[7].charAt(0).toUpperCase() + job.Product.split(' ')[7].slice(1)){
                resource.Quantity += parseFloat(job.Product.split(' ')[7] * job.Quantity);
                resource.Change += parseFloat(job.Product.split(' ')[7] * job.Quantity);
            }
            if(resource.Name == job.Product.split(' ')[4].charAt(0).toUpperCase() + job.Product.split(' ')[4].slice(1)){
                resource.Quantity += parseFloat(job.Product.split(' ')[3] * job.Quantity);
                resource.Change += parseFloat(job.Product.split(' ')[3] * job.Quantity);
            }
            if(resource.Name == job.Product.split(' ')[1].charAt(0).toUpperCase() + job.Product.split(' ')[1].slice(1)){
                resource.Quantity += parseFloat(job.Product.split(' ')[0] * job.Quantity);
                resource.Change += parseFloat(job.Product.split(' ')[0] * job.Quantity);
            }
        }
    }
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
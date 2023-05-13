app.controller('ResourceCtrl',function($scope,$rootScope, DB, $interval){
    
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
            ChangesZero();
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
            ResearchResources();
            $rootScope.resources.forEach(resource =>{
                let idx = $rootScope.resources.indexOf(resource)
                resource.Quantity = QuantityChange(idx)
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
                            ID: i + 1,
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
        if($rootScope.resources[idx].Name == "Knowledge"){
            return $rootScope.resources[idx].Quantity + $rootScope.resources[idx].Change/2
        }
        else if($rootScope.resources[idx].Name == "Food"){
            if($rootScope.resources[idx].Quantity + $rootScope.resources[idx].Change - $rootScope.people/2 < 0){
                $rootScope.resources[idx].Change = $rootScope.resources[idx].Change - $rootScope.people/2;
                peopleChange(0);
                return 0;
            }
            if($rootScope.resources[idx].Quantity + $rootScope.resources[idx].Change - $rootScope.people/2 >= $rootScope.resources[idx].Storage){
                peopleChange(1)
                return $rootScope.resources[idx].Quantity = $rootScope.resources[idx].Storage;
            }
            $rootScope.resources[idx].Change = $rootScope.resources[idx].Change - $rootScope.people/2;
            peopleChange(1)
            return $rootScope.resources[idx].Quantity + $rootScope.resources[idx].Change
        }
        else{
            if($rootScope.resources[idx].Quantity + $rootScope.resources[idx].Change >= $rootScope.resources[idx].Storage){
                return $rootScope.resources[idx].Quantity = $rootScope.resources[idx].Storage;
            }
            if($rootScope.resources[idx].Change < 0){
                if($rootScope.resources[idx].Quantity - $rootScope.resources[idx].Change < 0){
                    return 0
                }
                return $rootScope.resources[idx].Quantity - $rootScope.resources[idx].Change
            }
            return $rootScope.resources[idx].Quantity + $rootScope.resources[idx].Change
        }
    }
    ChangesZero = function(){
        $rootScope.resources.forEach(resource =>{
            resource.Change = parseFloat(0);
        })
    }
    ResourceQuantity = function(job, route, resource){
        if(route == 0){
            if(resource.Name == FirstCharUp(job.Product.split(' ')[1])){
                if(StorageMax(resource,job)){
                    Quantity(resource,0,job,1)
                }
                else{
                    Quantity(resource,0,job,2)
                }
            }
        }
        else if(route == 1){
            if(resource.Name == FirstCharUp(job.Product.split(' ')[4])){
                if(StorageMax(resource,job)){
                    Quantity(resource,3,job,1)
                }
                else{
                    Quantity(resource,3,job,2)
                }
            }
            if(resource.Name == FirstCharUp(job.Product.split(' ')[1])){
                if(StorageMax(resource,job)){
                    Quantity(resource,0,job,1)
                }
                else{
                    Quantity(resource,0,job,2)
                }
            }
        }
        else if(route == 2){
            if(resource.Name == FirstCharUp(job.Product.split(' ')[7])){
                if(StorageMax(resource,job)){
                    Quantity(resource,6,job,1)
                }
                else{
                    Quantity(resource,6,job,2)
                }
            }
            if(resource.Name == FirstCharUp(job.Product.split(' ')[4])){
                if(StorageMax(resource,job)){
                    Quantity(resource,3,job,1)
                }
                else{
                    Quantity(resource,3,job,2)
                }
            }
            if(resource.Name == FirstCharUp(job.Product.split(' ')[1])){
                if(StorageMax(resource,job)){
                    Quantity(resource,0,job,1)
                }
                else{
                    Quantity(resource,0,job,2)
                }
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
    ResearchResources = function(){
        $rootScope.researched.forEach(researched =>{
            if(researched.passive_bonus.includes(" ")){
                switch(researched.passive_bonus.split(' ')[1]){
                    case "knowledge":
                        let resource = $rootScope.resources.find(x=> x.Name == FirstCharUp(researched.passive_bonus.split(' ')[1]))
                        resource.Change += parseFloat(researched.passive_bonus.split(' ')[0])
                        $rootScope.resources[resource.ID-1] = resource;
                        break;
                    case "all":
                        ResourceBonus(1, parseFloat(researched.passive_bonus.split(' ')[0]))
                        break;
                    case "gathering":
                        ResourceBonus(2, parseFloat(researched.passive_bonus.split(' ')[0]))
                        break;
                    case "mining":
                        ResourceBonus(3, parseFloat(researched.passive_bonus.split(' ')[0]))
                        break;
                    default:
                        break;
                }
            }
        })
    }
    ResourceBonus = function(route, percent){
        if(route == 1){
            $rootScope.resources.forEach(resource =>{
                if(resource.Name != "Knowledge"){
                    resource.Change = resource.Change * percent
                }
            })
        }
        if(route == 2){
            $rootScope.resources.forEach(resource =>{
                if(resource.Name == "Wood" || resource.Name == "Stone"){
                    resource.Change = resource.Change * percent
                }
            })
        }
        if(route == 3){
            $rootScope.resources.forEach(resource =>{
                if(resource.Name == "Iron" || resource.Name == "Copper" || resource.Name == "Tin" || resource.Name == "Coal"){
                    resource.Change = resource.Change * percent
                }
            })
        }
    }
    peopleChange = function(route){
        if(route == 1){
            if($rootScope.peopleMax > $rootScope.people){
                let RNumber = Math.random()
                if(RNumber > 0.5){
                    $rootScope.people++;
                }
            }
        }
        else{
            if($rootScope.peopleMax >= $rootScope.people){
                let RNumber = Math.random()
                if(RNumber > 0.6){
                    $rootScope.people--;
                }
            }
        }
    }
    StorageMax = function(resource,job){
        if(resource.Storage >= resource.Quantity + parseFloat(job.Product.split(' ')[0] * job.Quantity)){
            return true;
        }
        else{
            return false;
        }
    }
    Quantity = function(resource,idx,job,route){
        if(route == 1){
            resource.Change += parseFloat(job.Product.split(' ')[idx] * job.Quantity)
        }
        else{
            resource.Quantity = resource.Storage;
        }
    }
    FirstCharUp = function(Product){
        return Product.charAt(0).toUpperCase() + Product.slice(1)
    }
});
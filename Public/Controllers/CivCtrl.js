app.controller('CivCtrl',function($scope, $rootScope, DB,){
    $scope.deletes = [];
    $scope.buildings = $rootScope.buildings;
    $scope.Specie = $rootScope.User.Specie;

    $scope.BuildingsShow = function(){
        $rootScope.buildings.forEach(building => {
            if($rootScope.researched.length != 0){
                $rootScope.researched.forEach(tech =>{
                    if(building.Tech_req == tech.Name || building.Tech_req == ""){
                        building.hidden = false;
                    }
                    else{
                        building.hidden = true;
                    }
                })
            }
            else{
                if(building.Tech_req == ""){
                    building.hidden = false;
                }
                else{
                    building.hidden = true;
                }
            }
            CostSet(building);
        });
    }

    $scope.Click = function(id,idx){
        if($rootScope.User.Specie == "Cell"){
            if($rootScope.buttons[idx].Evolution == 0 && $rootScope.buttons[idx].storage == 0 && $rootScope.buttons[idx].producer == 0){
                if($rootScope.buttons[idx].Name == "RNA"){
                    if($rootScope.resources[0].Quantity < $rootScope.resources[0].Storage){
                        $rootScope.resources[0].Quantity++;
                    }
                }
                if($rootScope.buttons[idx].Name == "DNA"){
                    if($rootScope.resources[0].Quantity >= 2){
                        if($rootScope.resources[1].Quantity < $rootScope.resources[1].Storage){
                            $rootScope.resources[0].Quantity -= 2;
                            $rootScope.resources[1].Quantity++;
                        }
                    }
                }
            }
            else{
                if($rootScope.buttons[idx].storage == 1){
                    if($rootScope.buttons[idx].DNA > 0 || $rootScope.buttons[idx].RNA > 0){
                        if($rootScope.resources[1].Quantity >= parseInt($rootScope.buttons[idx].DNA) && $rootScope.resources[0].Quantity >= parseInt($rootScope.buttons[idx].RNA)){
                            QuantityDecrease(idx)
                            CellCostIncrease(idx)
                            RNAStorage(idx)
                            DNAStorage(idx)
                            $rootScope.buttons[idx].quantity++;
                        }
                    }
                }
                if($rootScope.buttons[idx].producer == 1){
                    if($rootScope.buttons[idx].DNA > 0 || $rootScope.buttons[idx].RNA > 0){
                        if($rootScope.resources[1].Quantity >= parseInt($rootScope.buttons[idx].DNA) && $rootScope.resources[0].Quantity >= parseInt($rootScope.buttons[idx].RNA)){
                            QuantityDecrease(idx)
                            CellCostIncrease(idx)
                            CellIncreaments(idx)
                            $rootScope.buttons[idx].quantity++;
                        }
                    }
                }
                if($rootScope.buttons[idx].Evolution == 1){
                    if($rootScope.resources[1].Quantity >= $rootScope.buttons[idx].DNA){
                        $rootScope.resources[0].Storage += 20;
                        $rootScope.resources[1].Storage += 20;
                        $rootScope.resources[0].Change += 6;
                        $rootScope.resources[1].Change += 2;
                        $rootScope.buttons[idx].clicked = true;
                        for(i = 0; i < $scope.visibled.length; i++){
                            for(j = 0; j< $rootScope.buttons.length; j++){
                                if($scope.visibled[i].Name == $rootScope.buttons[j].Name){
                                    $rootScope.buttons[j].hidden = true;
                                }
                            }
                        }
                        $scope.evolved.push($rootScope.buttons[idx]);
                        if($rootScope.buttons[idx].Specie.length > 1 && $rootScope.Specie == "Cell") $rootScope.Specie = $rootScope.buttons[idx].Specie; 
                        $rootScope.resources[1].Quantity -= $rootScope.buttons[idx].DNA;
                        if($rootScope.buttons[idx].Name == "Sentience"){
                            ToCreature();
                        }
                    }
                }

        }
        }
        else{
            if(EnoughResource($rootScope.buildings[idx])){
                if(StorageCap(idx)){
                    $rootScope.resources.forEach(resource =>{
                        if($rootScope.buildings[idx].Bonus.split(" ")[2] != undefined){
                            if(resource.Name == $rootScope.buildings[idx].Bonus.split(" ")[1].charAt(0).toUpperCase() + $rootScope.buttons[idx].Bonus.split(" ")[1].slice(1)){
                                resource.Storage = resource.Storage + parseFloat($rootScope.buildings[idx].Bonus.split(" ")[0])
                            }
                        }else{
                            if(resource.Name = "Coal"){
                                resource.Storage = resource.Storage + parseFloat($rootScope.buildings[idx].Bonus.split(" ")[0])
                            }
                        }
                    })
                }
                else if(JobCap(idx)){
                    $rootScope.jobs.forEach(job =>{
                        if(job.Name == $rootScope.buildings[idx].Bonus.split(" ")[1].charAt(0).toUpperCase() + $rootScope.buildings[idx].Bonus.split(" ")[1].slice(1)){
                            job.Max++;
                        }
                    })
                }
                else if(PeopleCap(idx)){
                    $rootScope.peopleMax += parseInt($rootScope.buildings[idx].Bonus.split(" ")[0])
                }
                else if(TradeCap(idx)){
                    
                }
                $rootScope.buildings[idx].Quantity++;
                CostSet($rootScope.buildings[idx])
            }
        }
        
    }
    $scope.Gather = function(resource){
        switch(resource){
            case "Food":
                Gathering(0)
                break;
            case "Wood":
                Gathering(2)
                break;
            case "Stone":
                Gathering(3)
                break;
        }
    }

    ToCreature = function(){
        let data = {
            Username: $rootScope.User.Username,
            Password: $rootScope.User.Password,
            Email: $rootScope.User.Email,
            Specie: $rootScope.Specie
        }
        DB.update('users', $rootScope.User.ID, data)
    }
    PeopleCap = function(idx){
        if($rootScope.buildings[idx].Bonus.split(" ")[1] == "people"){
            return true;
        }
        else{
            return false;
        }
    }
    StorageCap = function(idx){
        if($rootScope.buildings[idx].Bonus.split(" ")[1] == "storage" || $rootScope.buildings[idx].Bonus.split(" ")[2] == "storage"){
            return true;
        }
        else{
            return false;
        }
    }
    JobCap = function(idx){
        switch($rootScope.buildings[idx].Bonus.split(" ")[1]){
            case "shaman":
                return true;
            case "stone":
                return true;
            case "miner":
                return true;
            case "farmer":
                return true;
            case "guild":
                return true;
            case "teacher":
                return true;
            case "scientist":
                return true;
            case "professor":
                return true;
            case "noble":
                return true;
            case "coal":
                return true;
            case "envoy":
                return true;
            case "operator":
                return true;
            default:
                return false;
        }
    }
    CostSet = function(building){
        if(building.Quantity > 0){
            if(building.First_Resources != null){
                building.First_Resources = "" + Math.round(parseFloat(building.FirstMinimalCost*(building.Quantity*0.20+1)))+ " " + building.First_Resources.split(' ')[1];
                if(building.Second_Resources != null){
                    building.Second_Resources.split(' ')[0] = "" + Math.round(parseFloat(building.SecondMinimalCost*(building.Quantity*0.20+1))) + " " + building.Second_Resources.split(' ')[1]
                    if(building.Third_Resources != null){
                        building.Third_Resources.split(' ')[0] = "" + Math.round(parseFloat(building.ThirdMinimalCost*(building.Quantity*0.20+1))) + " " + building.Third_Resources.split(' ')[1]
                    }
                }
            }
        }
    }
    TradeCap = function(idx){
        if($rootScope.buildings[idx].Bonus.split(" ")[1] == "trade"){
            return true;
        }
        else{
            return false;
        }
    }
    QuantityDecrease = function(idx){
        $rootScope.resources[0].Quantity -= parseInt($rootScope.buttons[idx].RNA)
        $rootScope.resources[1].Quantity -= parseInt($rootScope.buttons[idx].DNA)
    }
    CivQuantityDecrease = function(require){
        $rootScope.resources.forEach(resource =>{
            if(require != ""){
                console.log(require)
                if(FirstCharUp(require.split(' ')[1]) == resource.Name){
                    resource.Quantity -= require.split(' ')[0]
                }
            }
        })
    }
    CellCostIncrease = function(idx){
        $rootScope.buttons[idx].RNA += $rootScope.buttons[idx].RNAplus
        $rootScope.buttons[idx].DNA += $rootScope.buttons[idx].DNAplus
    }
    EnoughResource = function(building){
        if(building.First_Resources != null){
            $scope.FirstResource = ExamResource(building.First_Resources);
            if(building.Second_Resources != null){
              $scope.SecondResources = ExamResource(building.Second_Resources);
              if(building.Third_Resources != null){
                $scope.ThirdResources = ExamResource(building.Third_Resources);
              }
              else{
                $scope.ThirdResources = true;
              }
            }
            else{
              $scope.SecondResources = true;
            }
          }
          else{
            $scope.FirstResource = true;
          }
          if($scope.FirstResource && $scope.SecondResources && $scope.ThirdResources){
            GetDecreasebleResource(building)
            return true;
          }
          else{
            return false;
          }
    }
    ExamResource = function(require){
        let bool = false;
        if(require.split(' ')[1] != undefined){
          $rootScope.resources.forEach(resource =>{
            if(resource.Name == FirstCharUp(require.split(' ')[1])){
              if(resource.Quantity >= require.split(' ')[0]-0){
                bool = true;
              }
              else{
                bool = false;
              }
            }
          })
        }
        else{
          bool = true;
        }
        return bool;
    }
    GetDecreasebleResource = function(building){
        if(building.First_Resources != null){
            CivQuantityDecrease(building.First_Resources);
        }
        if(building.Second_Resources != null){
            CivQuantityDecrease(building.Second_Resources);
        }
        if(building.Third_Resources != null){
            CivQuantityDecrease(building.Third_Resources);
        }
    }
    RNAStorage = function(idx){
        if($rootScope.buttons[idx].storageRNAplus > 0){
            $rootScope.resources[0].Storage += $rootScope.buttons[idx].storageRNAplus;
        }
    }
    DNAStorage = function(idx){
        if($rootScope.buttons[idx].storageDNAplus > 0){
            $rootScope.resources[1].Storage += $rootScope.buttons[idx].storageDNAplus;
        }
    }
    CellIncreaments = function(idx){
        if($rootScope.buttons[idx].RNA_Increament > 0){
            $rootScope.resources[0].Change = $rootScope.resources[0].Change + $rootScope.buttons[idx].RNA_Increament;
        }
        if($rootScope.buttons[idx].RNA_Decreament > 0){
            $rootScope.resources[0].Change = $rootScope.resources[0].Change - $rootScope.buttons[idx].RNA_Decreament;
        }
        if($rootScope.buttons[idx].DNA_Increament > 0){
            $rootScope.resources[1].Change = $rootScope.resources[1].Change + $rootScope.buttons[idx].DNA_Increament;
        }
    }
    Gathering = function(idx){
        if($rootScope.resources[idx].Storage >= $rootScope.resources[idx].Quantity + 1){
            $rootScope.resources[idx].Quantity++
        }
    }
    CivilCostIncrease = function(idx){
        console.log(typeof $rootScope.buildings[idx].MinimalCost)
        $rootScope.buildings[idx].Cost += $rootScope.buildings[idx].MinimalCost * 1.10
    }
    FirstCharUp = function(Product){
        return Product.charAt(0).toUpperCase() + Product.slice(1)
    }
});

 

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
app.controller('CivCtrl',function($scope, $rootScope, DB,){
    $scope.deletes = [];
    $scope.buildings = $rootScope.buildings;
    $scope.Specie = $rootScope.User.Specie;

    $scope.BuildingsShow = function(){
        console.log(0)
        $rootScope.buildings.forEach(building => {
            if($rootScope.researched.length != 0){
                $rootScope.researched.forEach(tech =>{
                    if(building.Tech_req == tech.Name){
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
                            $rootScope.resources[0].Quantity = $rootScope.resources[0].Quantity - 2;
                            $rootScope.resources[1].Quantity++;
                        }
                    }
                }
            }
            else{
                if($rootScope.buttons[idx].storage == 1){
                    if($rootScope.buttons[idx].DNA > 0 || $rootScope.buttons[idx].RNA > 0){
                        if($rootScope.resources[1].Quantity >= parseInt($rootScope.buttons[idx].DNA) && $rootScope.resources[0].Quantity >= parseInt($rootScope.buttons[idx].RNA)){
                            $rootScope.resources[1].Quantity = $rootScope.resources[1].Quantity - parseInt($rootScope.buttons[idx].DNA)
                            $rootScope.resources[0].Quantity = $rootScope.resources[0].Quantity - parseInt($rootScope.buttons[idx].RNA)
                            $rootScope.buttons[idx].DNA = parseInt($rootScope.buttons[idx].DNA) + parseInt($rootScope.buttons[idx].DNAplus);
                            $rootScope.buttons[idx].RNA = parseInt($rootScope.buttons[idx].RNA) + parseInt($rootScope.buttons[idx].RNAplus);
                            $rootScope.buttons[idx].quantity++;
                            if($rootScope.buttons[idx].storageRNAplus > 0){
                                $rootScope.resources[0].Storage += $rootScope.buttons[idx].storageRNAplus;
                            }
                            if($rootScope.buttons[idx].storageDNAplus > 0){
                                $rootScope.resources[1].Storage += $rootScope.buttons[idx].storageDNAplus;
                            }
                        }
                    }
                }
                if($rootScope.buttons[idx].producer == 1){
                    if($rootScope.buttons[idx].DNA > 0 || $rootScope.buttons[idx].RNA > 0){
                        if($rootScope.resources[1].Quantity >= parseInt($rootScope.buttons[idx].DNA) && $rootScope.resources[0].Quantity >= parseInt($rootScope.buttons[idx].RNA)){
                            $rootScope.resources[1].Quantity = $rootScope.resources[1].Quantity - parseInt($rootScope.buttons[idx].DNA)
                            $rootScope.resources[0].Quantity = $rootScope.resources[0].Quantity - parseInt($rootScope.buttons[idx].RNA)
                            $rootScope.buttons[idx].DNA = parseInt($rootScope.buttons[idx].DNA) + parseInt($rootScope.buttons[idx].DNAplus);
                            $rootScope.buttons[idx].RNA = parseInt($rootScope.buttons[idx].RNA) + parseInt($rootScope.buttons[idx].RNAplus);
                            $rootScope.buttons[idx].quantity++;
                            if($rootScope.buttons[idx].RNA_Increament > 0){
                                $rootScope.resources[0].Increase = $rootScope.resources[0].Increase + $rootScope.buttons[idx].RNA_Increament;
                            }
                            if($rootScope.buttons[idx].RNA_Decrament > 0){
                                $rootScope.resources[0].Increase = $rootScope.resources[0].Increase - $rootScope.buttons[idx].RNA_Decrament;
                            }
                            if($rootScope.buttons[idx].DNA_increament > 0){
                                $rootScope.resources[1].Increase = $rootScope.resources[1].Increase + $rootScope.buttons[idx].DNA_increament;
                            }
                        }
                    }
                }
                if($rootScope.buttons[idx].Evolution == 1){
                    if($rootScope.resources[1].Quantity >= $rootScope.buttons[idx].DNA){
                        $rootScope.resources[0].Storage += 20;
                        $rootScope.resources[1].Storage += 20;
                        $rootScope.resources[0].Increase = $rootScope.resources[0].Increase + 6;
                        $rootScope.resources[1].Increase = $rootScope.resources[1].Increase + 2;
                        $rootScope.buttons[idx].clicked = true;
                        for(i = 0; i < $scope.visibled.length; i++){
                            for(j = 0; j< $rootScope.buttons.length; j++){
                                if($scope.visibled[i].Name == $rootScope.buttons[j].Name){
                                    $rootScope.buttons[j].hidden = true;
                                }
                            }
                        }
                        $scope.evolved.push($rootScope.buttons[idx]);
                        if($rootScope.buttons[idx].Specie != "0" && $rootScope.Specie == "0") $rootScope.Specie = $rootScope.buttons[idx].Specie; 
                        $rootScope.resources[1].Quantity -= $rootScope.buttons[idx].DNA;
                        if($rootScope.buttons[idx].Name == "Sentience"){
                            ToCreature();
                        }
                    }
                }

        }
        }
        else{
            if(ResourceProduct(idx)){

            }
            else if(PeopleCap(idx)){
                $rootScope.buildings[idx].Quantity++
                $rootScope.peopleMax += 3
            }
            else if(StorageCap(idx)){

            }
            else if(JobCap(idx)){

            }
            else if(TradeCap(idx)){

            }
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
    ResourceProduct = function(idx){
        switch($rootScope.buildings[idx].Bonus.split(" ")[1]){
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
    TradeCap = function(idx){
        if($rootScope.buildings[idx].Bonus.split(" ")[1] == "trade"){
            return true;
        }
        else{
            return false;
        }
    }
});

 

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
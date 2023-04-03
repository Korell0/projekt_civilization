app.controller('CivCtrl',function($scope, $rootScope, DB, $interval){
    $scope.evolved = [];
    $scope.visibled = [];
    $scope.deletes = [];
    $scope.buildings = $rootScope.buildings;
    $scope.Specie = $rootScope.User.Specie;

    $interval(function(){   
        if($rootScope.User.Specie == "Cell"){
            if($scope.evolved.length != 0){
                for(i = 0; i < $rootScope.buttons.length; i++){
                    for(j = 0; j < $scope.evolved.length; j++){
                        if(($rootScope.buttons[i].Evolution_req == $scope.evolved[j].Name && !$rootScope.buttons[i].evolved)){
                            $scope.visibled.push($rootScope.buttons[i]);
                            $rootScope.buttons[i].hidden = false;                    
                        }
                        else if($rootScope.buttons[i].Evolution_req == "0"){
                            $rootScope.buttons[i].hidden = false;                    
                        }
                        else{
                            if($rootScope.buttons[i].Evolution_req.includes("/")){
                                for(e = 0; e < $rootScope.buttons[i].Evolution_req.split("/").length; e++){
                                    if($scope.evolved[j].Name == $rootScope.buttons[i].Evolution_req.split("/")[e]){
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

        }
    }, 1000)

    $scope.Click = function(id,idx){
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
    ToCreature = function(){
        let data = {
            Username: $rootScope.User.Username,
            Password: $rootScope.User.Password,
            Email: $rootScope.User.Email,
            Specie: $rootScope.Specie
        }
        DB.update('users', $rootScope.User.ID, data)
    }
});

 

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
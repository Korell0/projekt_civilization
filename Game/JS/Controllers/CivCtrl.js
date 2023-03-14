app.controller('CivCtrl',function($scope,$rootScope, DB, $interval){
    $scope.buttons = $rootScope.buttons
    $scope.deletes = [];

    $interval(function(){   
        for(i = 0; i < $rootScope.buttons.length; i++){
            if($rootScope.buttons[i].RNA > 0){
                if($rootScope.buttons[i].DNA > 0){
                    if(($rootScope.buttons[i].RNA / 2 < $rootScope.resources[0].quantity && $rootScope.buttons[i].DNA / 2 < $rootScope.resources[1].quantity)){
                        $rootScope.buttons[i].hidden = false;
                        if($rootScope.buttons[i].clicked === true){
                            $rootScope.buttons[i].hidden = true;
                        }
                    }
                }
            }
            else{
                if($rootScope.buttons[i].DNA / 2 < $rootScope.resources[0].quantity){
                    $rootScope.buttons[i].hidden = false;
                    if($rootScope.buttons[i].clicked === true){
                        $rootScope.buttons[i].hidden = true;
                    }
                }
            }
        }
        if($rootScope.resources[0].quantity + $rootScope.RNAI <= $rootScope.resources[0].storage){
            $rootScope.resources[0].quantity = $rootScope.resources[0].quantity + $rootScope.RNAI;
        }
        else{
            $rootScope.resources[0].quantity = $rootScope.resources[0].storage;
        }
        if($rootScope.resources[1].quantity + $rootScope.DNAI <= $rootScope.resources[1].storage){
            $rootScope.resources[1].quantity = $rootScope.resources[1].quantity + $rootScope.DNAI;
        }
        else{
            $rootScope.resources[1].quantity = $rootScope.resources[1].storage;
        }
    }, 1000)

    $scope.Click = function(id,idx){
        if($rootScope.buttons[idx].Evolution === 0 && $rootScope.buttons[idx].storage === 0 && $rootScope.buttons[idx].producer === 0){
            if($rootScope.buttons[idx].Name === "RNA"){
                if($rootScope.resources[0].quantity < $rootScope.resources[0].storage){
                    $rootScope.resources[0].quantity++;
                }
            }
            if($rootScope.buttons[idx].Name === "DNA"){
                if($rootScope.resources[0].quantity >= 2){
                    $rootScope.resources[0].quantity = $rootScope.resources[0].quantity - 2;
                    $rootScope.resources[1].quantity++;
                }
            }
        }
        else{
            if($rootScope.buttons[idx].storage === 1){
                if($rootScope.buttons[idx].DNA > 0 || $rootScope.buttons[idx].RNA > 0){
                    if($rootScope.resources[1].quantity >= parseInt($rootScope.buttons[idx].DNA) && $rootScope.resources[0].quantity >= parseInt($rootScope.buttons[idx].RNA)){
                        $rootScope.resources[1].quantity = $rootScope.resources[1].quantity - parseInt($rootScope.buttons[idx].DNA)
                        $rootScope.resources[0].quantity = $rootScope.resources[0].quantity - parseInt($rootScope.buttons[idx].RNA)
                        $rootScope.buttons[idx].DNA = parseInt($rootScope.buttons[idx].DNA) + parseInt($rootScope.buttons[idx].DNAplus);
                        $rootScope.buttons[idx].RNA = parseInt($rootScope.buttons[idx].RNA) + parseInt($rootScope.buttons[idx].RNAplus);
                        $rootScope.buttons[idx].quantity++;
                        if($rootScope.buttons[idx].storageRNAplus > 0){
                            $rootScope.resources[0].storage += $rootScope.buttons[idx].storageRNAplus;
                        }
                        if($rootScope.buttons[idx].storageDNAplus > 0){
                            $rootScope.resources[1].storage += $rootScope.buttons[idx].storageDNAplus;
                        }
                    }
                }
            }
            if($rootScope.buttons[idx].producer === 1){
                if($rootScope.buttons[idx].DNA > 0 || $rootScope.buttons[idx].RNA > 0){
                    if($rootScope.resources[1].quantity >= parseInt($rootScope.buttons[idx].DNA) && $rootScope.resources[0].quantity >= parseInt($rootScope.buttons[idx].RNA)){
                        $rootScope.resources[1].quantity = $rootScope.resources[1].quantity - parseInt($rootScope.buttons[idx].DNA)
                        $rootScope.resources[0].quantity = $rootScope.resources[0].quantity - parseInt($rootScope.buttons[idx].RNA)
                        $rootScope.buttons[idx].DNA = parseInt($rootScope.buttons[idx].DNA) + parseInt($rootScope.buttons[idx].DNAplus);
                        $rootScope.buttons[idx].RNA = parseInt($rootScope.buttons[idx].RNA) + parseInt($rootScope.buttons[idx].RNAplus);
                        $rootScope.buttons[idx].quantity++;
                        if($rootScope.buttons[idx].RNA_Increament > 0){
                            $rootScope.RNAI = $rootScope.RNAI + $rootScope.buttons[idx].RNA_Increament;
                        }
                        if($rootScope.buttons[idx].RNA_Decrament > 0){
                            $rootScope.RNAI = $rootScope.RNAI - $rootScope.buttons[idx].RNA_Decrament;
                        }
                        if($rootScope.buttons[idx].DNA_increament > 0){
                            $rootScope.DNAI = $rootScope.DNAI + $rootScope.buttons[idx].DNA_increament;
                        }
                    }
                }
            }
            if($rootScope.buttons[idx].Evolution === 1){
                if($rootScope.resources[1].quantity >= $rootScope.buttons[idx].DNA){
                    $rootScope.resources[0].storage += 20;
                    $rootScope.resources[1].storage += 20;
                    $rootScope.RNAI = $rootScope.RNAI + 6;
                    $rootScope.DNAI = $rootScope.DNAI + 2;
                    $rootScope.buttons[idx].clicked = true;
                    if($rootScope.buttons[idx].Specie != 0) $rootScope.Specie = ""+$rootScope.buttons[idx].Specie+""; 
                    //$rootScope.resources[1].quantity -= $rootScope.buttons[idx].DNA;
                    if($rootScope.buttons[idx].Name === "Sentience"){
                        DB.insert()
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
        
        DB.selectAll('resources_by_user').then(function(res){
            res.data.forEach(element => {
                if(element.UserID === $rootScope.User.ID){
                    $scope.deletes.push(element.ID);
                }
            });
        })
        $rootScope.resources = [];
        DB.update('users', $rootScope.User.ID, data)
        DB.selectAll('resources').then(function(res){
            for(i = 3; i < 7; i++){
                $rootScope.resources.push(res.data[i]);
            }
        })
        $scope.deletes.forEach(element => {
            DB.delete('resources_by_user', element)
        })
    }
});

 

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
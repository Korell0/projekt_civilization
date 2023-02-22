app.controller('CivCtrl',function($scope,$rootScope, DB, $interval){
    $scope.buttons = $rootScope.buttons

    $interval(function(){
        $rootScope.resources[0].quantity = $rootScope.resources[0].quantity + $rootScope.RNAI;
    }, 1000)

    $scope.Click = function(id,idx){
        if($rootScope.buttons[idx].Evolution === 0 && $rootScope.buttons[idx].storage === 0 && $rootScope.buttons[idx].producer === 0){
            if($rootScope.buttons[idx].Name === "RNA"){
                if($rootScope.resources[0].quantity =< $rootScope.resources[0].storage){

                }
                $rootScope.resources[0].quantity++;
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
                        if($rootScope.buttons[idx].storageRNAplus > 0){
                            $rootScope.resources[0].storage += $rootScope.buttons[idx].storageRNAplus;
                        }
                        if($rootScope.buttons[idx].storageDNAplus > 0){
                            $rootScope.resources[1].storage += $rootScope.buttons[idx].storageDNAplus;
                        }
                    }
                }
            }
        }
    }
});

 

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
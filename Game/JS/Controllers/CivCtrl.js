app.controller('CivCtrl',function($scope,$rootScope, DB, $interval){
    $scope.buttons = $rootScope.buttons


    $scope.Click = function(id,idx){
        if($rootScope.buttons[idx].Name === "RNA"){
            if($rootScope.resources[0].quantity < $rootScope.resources[0].storage){
                $rootScope.resources[0].quantity++;
            }
        }
        if($rootScope.buttons[idx].Name === "DNA"){
            if($rootScope.resources[1].quantity < $rootScope.resources[1].storage){
                if($rootScope.resources[0].quantity >= 2){
                    $rootScope.resources[0].quantity = $rootScope.resources[0].quantity - 2;
                    $rootScope.resources[1].quantity++;
                }
            }
        }
        if($rootScope.buttons[idx].Name === "Membrane"){
            if($rootScope.resources[1].quantity >= parseInt($rootScope.buttons[idx].DNA)){
                $rootScope.resources[0].storage += 10;
                $rootScope.resources[1].quantity = $rootScope.resources[1].quantity - parseInt($rootScope.buttons[idx].DNA);
                $rootScope.buttons[idx].DNA = parseInt($rootScope.buttons[idx].DNA) + 10;
            }
        }
    }
    $scope.Soul = function(){
        var interval = $interval(function(){
            console.log("helloooo")
        },1000)
    }
});

 

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
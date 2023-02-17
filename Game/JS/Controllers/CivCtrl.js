app.controller('CivCtrl',function($scope,$rootScope, DB){
    $scope.buttons = $rootScope.buttons


    $scope.Click = function(id,idx){
        if($rootScope.buttons[idx].Name === "DNA"){
            $rootScope.govs[1].Name = "ht";
        }
    }
});



var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
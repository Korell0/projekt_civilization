app.controller('CivCtrl',function($scope, DB){
    $scope.buttons = []

    DB.selectAll("Cell_evolution").then(function(res){
        res.data.forEach(element => {
            if(element.DNA === "-"){
                element.DNA = null
            }
            if(element.RNA === "-"){
                element.RNA = null
            }
            $scope.buttons.push(element)
        });
    
    })
});


var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
app.controller('CivCtrl',function($scope){
    $scope.demobuttons = [
        {
            Title: "First",
            Cost:"400 wood",
            Description:"ez egy teszt"
        },
        {
            Title: "Second",
            Cost: "20 Weed",
            Description: "ez is egy tesz"
        }
    ]
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
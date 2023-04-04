app.controller('JobsCtrl',function($scope,$rootScope, DB){
    $scope.Raising = function(idx){
        $rootScope.jobs[idx].Quantity++;
    }
    $scope.Reduction = function(idx){
        if($rootScope.jobs[idx].Quantity > 0) $rootScope.jobs[idx].Quantity--;
    }
});
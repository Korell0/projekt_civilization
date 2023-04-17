app.controller('JobsCtrl',function($scope,$rootScope, DB){
    $scope.Raising = function(idx){
        if(LesserThanMaxPeople()){
            $rootScope.jobs[idx].Quantity++;
            $rootScope.assigned++;
        }
    }
    $scope.Reduction = function(idx){
        if($rootScope.jobs[idx].Quantity > 0){
            $rootScope.jobs[idx].Quantity--;
            $rootScope.assigned--;
        } 
    }

    LesserThanMaxPeople = function(){
        if($rootScope.peopleMax >= $rootScope.assigned + 1){
            return true;
        }
        else{
            return false;
        }
    }
});
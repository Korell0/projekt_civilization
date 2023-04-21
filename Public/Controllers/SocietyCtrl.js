app.controller('SocietyCtrl',function($scope,$rootScope, DB){
    $scope.govs = $rootScope.govs


    
    $scope.openModal = function(){
        $scope.modal ={
            Title: "Governments"
        }
        $('#modalWindow').modal('show');
    }
});
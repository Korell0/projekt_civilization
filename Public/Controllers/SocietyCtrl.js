app.controller('SocietyCtrl',function($scope,$rootScope, DB){
    $scope.govs = $rootScope.govs

    $scope.governmentsShow = function(){
        $rootScope.govs.forEach(gov => {
            gov.hidden = true;
            if($rootScope.researched.length > 0){
                $rootScope.researched.forEach(tech =>{
                    if(gov.tech_req == tech.Name){
                        gov.hidden = false;
                    }
                })
            }

        });

    }
    $scope.FoundGov = function(idx){
        $rootScope.User.Gov = $rootScope.govs[idx].Name
    }
    
    
    $scope.openModal = function(){
        $scope.modal ={
            Title: "Governments"
        }
        $('#modalWindow').modal('show');
    }
});
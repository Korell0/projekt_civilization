app.controller('MilitaryCtrl',function($scope, $rootScope){
    $scope.MilitaryShow = function(){
        $rootScope.military.forEach(Troop => {
            Troop.hidden = true;
            if(Troop.Required_Tech == null){
                Troop.hidden = false;
            }
            else{
                $rootScope.researched.forEach(tech =>{
                    if(Troop.hidden == true && tech.Name == Troop.Required_Tech){
                        Troop.hidden = false;
                    }
                })
            }
        });
    }

}); 
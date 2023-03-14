app.controller('SettingsCtrl',function($scope,$rootScope, DB){
    $scope.Save = function(){
        if($rootScope.User.Specie === 0){
            DB.select('resources_by_user', 'UserID', $rootScope.User.ID).then(function(res){
                res.data.forEach(element => {
                    if(element.UserID){
                        for(i = 1; i < res.data.length;i++){
                            
                        }
                    }
                });
            })
        }
    }
})
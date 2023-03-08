app.controller('SettingsCtrl',function($scope, DB){
    $scope.Save = function(){
        if($rootscope.User.Specie === 0){
            DB.select('resources_by_user', 'UserID', $rootscope.User.ID).then(function(res){
                res.data.forEach(element => {
                    if(element.UserID){
                        for(i = 0; i < res.data.length;i++){
                            
                        }
                    }
                });
            })
        }
    }
})
app.controller('NewsCtrl',function($scope,$rootScope,DB){
    $scope.exampleNews= [];

            DB.selectAll("news").then(function(res){
                res.data.forEach(element => {
                    console.log(element)
                    $scope.exampleNews.push(element)
                    
                });
                $rootScope.News = $scope.exampleNews
                })
            }   
)

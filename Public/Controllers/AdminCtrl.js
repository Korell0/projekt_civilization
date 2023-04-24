app.controller('AdminCtrl', function($scope, DB){
    DB.selectAll('Users').then(function(res){
        $scope.Users = res.data;
    })
    $scope.curPage = 1,
    $scope.itemsPerPage = 3,
    $scope.maxSize = 5;
    
    $scope.numOfPages = function () {
    return Math.ceil($scope.Users.length / $scope.itemsPerPage);
    
    };
    
    $scope.$watch('curPage + numPerPage', function() {
    var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
    end = begin + $scope.itemsPerPage;
    
    $scope.$scope.Users = $scope.Users.slice(begin, end);
    });
})
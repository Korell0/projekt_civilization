app.controller('SocietyCtrl',function($scope, DB){
    $scope.govs = []
    DB.selectAll("Government").then(function(res){
        res.data.forEach(element => {
            $scope.govs.push(element);
        });
    })

    $scope.openModal = function(){
        $scope.modal ={
            Title: "Governments"
        }
        $('#modalWindow').modal('show');
    }
});
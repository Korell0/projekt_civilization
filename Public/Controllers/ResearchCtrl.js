app.controller('ResearchCtrl',function($scope, $rootScope, DB){
  $scope.researchs = $rootScope.researchs
  DB.select("Researched_techs","UserID",$rootScope.User.ID).then(function(res){
    $rootScope.researched = res.data;
  })
  $scope.Research = function(idx){
    let data = {
      UserID: $rootScope.User.ID,
      ResearchID: idx
    }
    $rootScope.researched.push(data);
    $scope.ResearchShow();
  }
  
  $rootScope.researchs.forEach(element => {
    element.hidden = true;
  });
  
  $scope.ResearchShow = function(){
    if($rootScope.researched.length !=0){
      $rootScope.researchs.forEach(element => {
        $rootScope.researched.forEach(item =>{
          if(element.ID == item.ResearchID){
            element.hidden = false;
            item.hidden = true;
          }
        });
      });
    }
    else{
      $rootScope.researchs[0].hidden = false;
    }
  }
  $scope.ResearchShow()
  
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
});
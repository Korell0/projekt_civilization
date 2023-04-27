app.controller('ResearchCtrl',function($scope, $rootScope, DB){
  $scope.researchs = $rootScope.researchs
  DB.select("Researched_techs","UserID",$rootScope.User.ID).then(function(res){
    $rootScope.researched = res.data;
  })
  $scope.Research = function(idx){
    if(EnoughResource(idx)){
      let data = $rootScope.researchs[idx]
      $rootScope.researched.push(data);
      $rootScope.researchs[idx].hidden = true;
      $rootScope.researchs[idx].researched = true;
      $scope.ResearchShow();
    }
  }
  
  $rootScope.researchs.forEach(element => {
    element.hidden = true;
  });
  
  $scope.ResearchShow = function(){
    if($rootScope.researched.length !=0){
      $rootScope.researchs.forEach(element => {
        $rootScope.researched.forEach(item =>{        
          if(element.tech_req == item.Name && !element.researched){
            element.hidden = false;
          }
        });
      });
    }
    else{
      $rootScope.researchs[0].hidden = false;
    }
  }
  $scope.ResearchShow()

  EnoughResource = function(idx){
    if($rootScope.researchs[idx].First_Resources != null){
      $scope.FirstResource = ExamResource($rootScope.researchs[idx].First_Resources);
      if($rootScope.researchs[idx].Second_Resources != null){
        $scope.SecondResources = ExamResource($rootScope.researchs[idx].Second_Resources);
        if($rootScope.researchs[idx].Third_Resources != null){
          $scope.ThirdResources = ExamResource($rootScope.researchs[idx].Third_Resources);
          if($rootScope.researchs[idx].Fourth_Resources != null){
            $scope.FourthResources = ExamResource($rootScope.researchs[idx].Fourth_Resources);
          }
          else{
            $scope.FourthResources = true;
          }
        }
        else{
          $scope.ThirdResources = true;
        }
      }
      else{
        $scope.SecondResources = true;
      }
    }
    else{
      $scope.FirstResource = true;
    }
    if($scope.FirstResource && $scope.SecondResources && $scope.ThirdResources && $scope.FourthResources){
      return true;
    }
    else{
      return false;
    }
  }

  ExamResource = function(require){
    let bool = false;
    if(require.split(' ')[1] != undefined){
      $rootScope.resources.forEach(resource =>{
        if(resource.Name == require.split(' ')[1].charAt(0).toUpperCase() + require.split(' ')[1].slice(1)){
          if(resource.Quantity >= require.split(' ')[0]-0){
            bool = true;
          }
          else{
            bool = false;
          }
        }
      })
    }
    else{
      bool = true;
    }
    return bool;
  }
  
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
});
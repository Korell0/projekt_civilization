app.controller('ResearchCtrl',function($scope, $rootScope, DB){
  $scope.researchs = $rootScope.researchs
  DB.select("Researched_techs","UserID",$rootScope.User.ID).then(function(res){
    $rootScope.researched = res.data;
  })
  $scope.Research = function(idx){
    if(EnoughResource(idx)){
      
    }
    else{
      console.log("emd")
    }
    /*let data = {
      UserID: $rootScope.User.ID,
      ResearchID: idx
    }
    $rootScope.researched.push(data);
    $scope.ResearchShow();*/
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

  EnoughResource = function(idx){
    if($rootScope.researchs[idx].First_Resources != null){
      $scope.FirstResource = ExamResource($rootScope.researchs[idx].First_Resources);
    }
    if($rootScope.researchs[idx].Second_Resources != null){
      $scope.SecondResources = ExamResource($rootScope.researchs[idx].Second_Resources);
    }
    else{
      $scope.SecondResources = true;
    }
    if($rootScope.researchs[idx].Third_Resources != null){
      $scope.ThirdResources = ExamResource($rootScope.researchs[idx].Third_Resources);
    }
    else{
      $scope.ThirdResources = true;
    }
    if($rootScope.researchs[idx].Fourth_Resources != null){
      $scope.FourthResources = ExamResource($rootScope.researchs[idx].Fourth_Resources);
    }
    else{
      $scope.FourthResources = true;
    }
    if($scope.FirstResource && $scope.SecondResources && $scope.ThirdResources && $scope.FourthResources){
      return true;
    }
    else{
      return false;
    }
  }

  ExamResource = function(require){
    console.log(require.split(' ')[1])
    $rootScope.resources.forEach(resource =>{
      if(resource.Name == require.split(' ')[1].charAt(0).toUpperCase() + require.split(' ')[1].slice(1)){
        if(resource.Quantity >= require.split(' ')[0]){
          return true;
        }
      }
    })
    return false;
  }
  
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
});
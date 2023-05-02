app.controller('ResearchCtrl',function($scope, $rootScope){
  console.log($rootScope.researched.length)
  $scope.Research = function(idx){
    if(EnoughResource(idx)){
      let data = $rootScope.researchs[idx]
      data.ResearchID = data.ID;
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
          if(!element.tech_req.includes('/') && element.tech_req == item.Name && !element.researched){
            element.hidden = false;
          }
          else{
            if(element.researched){
              element.hidden == true
            }
            else if(TechReq(element.tech_req,item.Name)){
                element.hidden = false;
            }
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
  TechReq = function(tech,researched){
    if(tech.split('/').length == 2){
      if(TechObtained(tech, researched, 2)){
        return true;
      }
      else{
        return false;
      }
    }
    else if(tech.split('/').length == 3){   
      if(TechObtained(tech, researched, 3)){
        return true;
      }
      else{
        return false;
      }
    }
    else if(tech.split('/').length == 4){                  
      if(TechObtained(tech, researched, 4)){
        return true;
      }
      else{
        return false;
      }
    }
  }

  TechObtained = function(tech,researched, route){
    if(route == 2){
      if(typeof tech.firsttech == undefined){
        tech.firsttech = false;
        tech.secondtech = false;
      }
      if(tech.split('/')[0] == researched && tech.firsttech == false){
        tech.firsttech = true;
      }
      if(tech.split('/')[1] == researched && tech.secondtech == false){
        tech.secondtech = true;
      }
      if(tech.firsttech && tech.secondtech){
        return true;
      }
      else{
        return false;
      }
    }
    if(route == 3){
      if(typeof tech.firsttech == undefined){
        tech.firsttech = false;
        tech.secondtech = false;
        tech.thirdtech = false;
      }
      if(tech.split('/')[0] == researched && tech.firsttech == false){
        tech.firsttech = true;
      }
      if(tech.split('/')[1] == researched && tech.secondtech == false){
        tech.secondtech = true;
      }
      if(tech.split('/')[2] == researched && tech.thirdtech == false){
        tech.thirdtech = true;
      }
      if(tech.firsttech && tech.secondtech && tech.thirdtech){
        return true;
      }
      else{
        return false;
      }
    }
    if(route == 4){
      if(typeof tech.firsttech == undefined){
        tech.firsttech = false;
        tech.secondtech = false;
        tech.thirdtech = false;
        tech.fourthtech = false;
      }
      if(tech.split('/')[0] == researched && tech.firsttech == false){
        tech.firsttech = true;
      }
      if(tech.split('/')[1] == researched && tech.secondtech == false){
        tech.secondtech = true;
      }
      if(tech.split('/')[2] == researched && tech.thirdtech == false){
        tech.thirdtech = true;
      }
      if(tech.split('/')[3] == researched && tech.fourthtech == false){
        tech.fourthtech = true;
      }
      if(tech.firsttech && tech.secondtech && tech.thirdtech && tech.fourthtech){
        return true;
      }
      else{
        return false;
      }
    }
  }
  
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
});
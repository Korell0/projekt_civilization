app.controller('JobsCtrl',function($scope,$rootScope, DB){
    $scope.Init = function(){    
        ShowJobs()
    }
    $scope.Raising = function(idx){
        if(LesserThanPeople() && $rootScope.people - $rootScope.assigned > 0){
            $rootScope.jobs[idx].Quantity++;
            $rootScope.assigned++;
        }
    }
    $scope.Reduction = function(idx){
        if($rootScope.jobs[idx].Quantity > 0){
            $rootScope.jobs[idx].Quantity--;
            $rootScope.assigned--;
        } 
    }

    LesserThanPeople = function(){
        if($rootScope.people >= $rootScope.assigned + 1){
            return true;
        }
        else{
            return false;
        }
    }
    ShowJobs = function(){
        $rootScope.jobs.forEach(job => {
            if(job.Tech_req == "-"){
                jobCap(job);
                job.hidden = false;
            }
            else{
                $rootScope.researched.forEach(tech =>{
                    if(job.Tech_req == tech.Name){
                        job.hidden = false;
                    }
                })
            }
            if(job.hidden != false){
                job.hidden = true;
            }
        });
    }
    jobCap = function(job){
        job.Max = $rootScope.peopleMax
    }
});
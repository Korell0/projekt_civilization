let app = new angular.module('Civilization',['ngRoute'])

app.run(function($rootScope, DB, $interval){
    $rootScope.News= [];
    if(window.sessionStorage['civilization']){
        $rootScope.User = JSON.parse(window.sessionStorage['civilization']);
        $rootScope.govs = [];
        $rootScope.buttons = [];
        $rootScope.researchs = [];
        $rootScope.buildings = [];
        $rootScope.military = [];
        $rootScope.researched = [];
        $rootScope.people = 5;
        $rootScope.peopleMax = 5;
        $rootScope.jobs = [];
        $rootScope.Specie = $rootScope.User.Specie;

        $interval(function(){   
            if($rootScope.User.Specie == "Cell"){
                if($scope.evolved.length != 0){
                    for(i = 0; i < $rootScope.buttons.length; i++){
                        for(j = 0; j < $scope.evolved.length; j++){
                            if(($rootScope.buttons[i].Evolution_req == $scope.evolved[j].Name && !$rootScope.buttons[i].evolved)){
                                $scope.visibled.push($rootScope.buttons[i]);
                                $rootScope.buttons[i].hidden = false;                    
                            }
                            else if($rootScope.buttons[i].Evolution_req == "0"){
                                $rootScope.buttons[i].hidden = false;                    
                            }
                            else{
                                if($rootScope.buttons[i].Evolution_req.includes("/")){
                                    for(e = 0; e < $rootScope.buttons[i].Evolution_req.split("/").length; e++){
                                        if($scope.evolved[j].Name == $rootScope.buttons[i].Evolution_req.split("/")[e]){
                                            $rootScope.buttons[i].hidden = false;
                                        }
                                    }
                                }
                                else{
                                    $rootScope.buttons[i].hidden = true;
                                }
                            }
                        }
                    }
                }
                else{
                    for(i = 0; i < $rootScope.buttons.length; i++){
                        if($rootScope.buttons[i].Evolution_req == "0"){
                            $rootScope.buttons[i].hidden = false;
                        }
                        else{
                            $rootScope.buttons[i].hidden = true;
                        }
                    }
                }
                if($rootScope.resources[0].Quantity + $rootScope.resources[0].Increase <= $rootScope.resources[0].Storage){
                    $rootScope.resources[0].Quantity = $rootScope.resources[0].Quantity + $rootScope.resources[0].Increase;
                }
                else{
                    $rootScope.resources[0].Quantity = $rootScope.resources[0].Storage;
                }
                if($rootScope.resources[1].Quantity + $rootScope.resources[1].Increase <= $rootScope.resources[1].Storage){
                    $rootScope.resources[1].Quantity = $rootScope.resources[1].Quantity + $rootScope.resources[1].Increase;
                }
                else{
                    $rootScope.resources[1].Quantity = $rootScope.resources[1].Storage;
                }
            }
            else{

            }
        }, 1000)

        if($rootScope.User.Specie == "Cell"){
            $rootScope.resources = [];
            $rootScope.storage = 100;
            DB.selectAll("Cell_evolution").then(function(res){
                res.data.forEach(element => {
                    element.clicked = false;
                    if(element.Evolution != 0 || element.storage != 0 || element.producer != 0){
                        element.hidden = true;
                    }
                    else{
                        element.hidden = false;
                    }
                    if(element.storage !=0 || element.producer){
                        element.quantity = 0;
                    }
                    $rootScope.buttons.push(element)
                });
            })
        }
        else{
            DB.selectAll("government").then(function(res){
                res.data.forEach(gov => {
                    $rootScope.govs.push(gov);
                });
            });
            DB.selectAll("researchs").then(function(res){
                res.data.forEach(tech =>{
                    $rootScope.researchs.push(tech);
                });
            });
            DB.selectAll("buildings").then(function(res){
                res.data.forEach(building =>{
                    building.Quantity = 0;
                    $rootScope.buildings.push(building);
                });
            });
            DB.selectAll("military").then(function(res){
                res.data.forEach(troop =>{
                    $rootScope.military.push(troop);
                });
            });
            DB.selectAll("jobs").then(function(res){
                res.data.forEach(job => {
                    $rootScope.jobs.push(job);
                });
            })
            DB.select("jobs_by_user","UserID",$rootScope.User.ID).then(function(res){
                if(res.data.length == 0){
                    $rootScope.jobs.forEach(element => {
                        element.Quantity = 0;
                    });
                }  
            })
        }
        $rootScope.Logout = function(){
            $rootScope.User = null;
            sessionStorage.clear('civilization', angular.toJson($rootScope.loggedUser));
            window.location.href = 'index.html';
        }
    }
});

app.config(function($routeProvider){
    $routeProvider
    .when('/Civilization',{
        templateUrl: 'Gameview/Civilization.html',
        controller: 'CivCtrl'
    })
    .when('/Military',{
        templateUrl: 'Gameview/Military.html',
        controller: 'MilitaryCtrl'
    })
    .when('/Projects',{
        templateUrl: 'Gameview/Projects.html',
        controller: 'ProjectsCtrl'
    })
    .when('/Jobs',{
        templateUrl: 'Gameview/Jobs.html',
        controller: 'JobsCtrl'
    })
    .when('/Research',{
        templateUrl: 'Gameview/Research.html',
        controller: 'ResearchCtrl'
    })
    .when('/Society',{
        templateUrl: 'Gameview/Society.html',
        controller: 'SocietyCtrl'
    })
    .when('/Settings',{
        templateUrl: 'Gameview/Settings.html',
        controller: 'SettingsCtrl'
    })
    .when('/Resources',{
        templateUrl: 'Gameview/Resources.html',
        controller: 'ResourceController'
    })
    .when('/News',{
        templateUrl: 'Views/News.html',
        controller: 'NewsCtrl'
    })
    .when('/Stages',{
        templateUrl: 'Views/Stages.html',
        controller: 'StagesCtrl'
    })
    .when('/Developers',{
        templateUrl: 'Views/Developers.html',
        controller: 'DevelopersCtrl'
    })
    .when('/Description',{
        templateUrl: 'Views/Description.html',
        controller: 'DescriptionCtrl'
    })
    .when('/reg',{
        templateUrl: 'Views/Registration.html',
        controller: 'UserCtrl'
    })
    .when('/log',{
        templateUrl: 'Views/Login.html',
        controller: 'UserCtrl'
    })
    .otherwise('/News')
});

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
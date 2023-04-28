let app = new angular.module('Civilization',['ngRoute'])
let UI = new angular.module('UI',['ui.bootstrap'])

app.run(function($rootScope, DB){
    $rootScope.News= [];
    if(window.sessionStorage['civilization']){
        $rootScope.User = JSON.parse(window.sessionStorage['civilization']);
        $rootScope.resources = [];
        $rootScope.evolved = [];
        $rootScope.visibled = [];
        $rootScope.govs = [];
        $rootScope.buttons = [];
        $rootScope.researchs = [];
        $rootScope.buildings = [];
        $rootScope.military = [];
        $rootScope.researched = [];
        $rootScope.people = 5;
        $rootScope.assigned = 0;
        $rootScope.peopleMax = 5;
        $rootScope.jobs = [];
        $rootScope.Specie = $rootScope.User.Specie;


        if($rootScope.User.Specie == "Cell"){
            
            DB.selectAll("Cell_evolution").then(function(res){
                res.data.forEach(element => {
                    element.DNA = parseInt(element.DNA)
                    element.RNA = parseInt(element.RNA)
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
                    tech.Searched = false;
                    $rootScope.researchs.push(tech);
                });
            });
            DB.select("researched_techs","UserID",$rootScope.User.ID).then(function(res){
                if(res.data.length != 0){
                    $rootScope.researchs.forEach(tech =>{
                        res.data.forEach(Searched =>{
                            if(tech.ID == Searched.ID){
                                tech.Searched = true;
                                tech.hidden = true;
                                $rootScope.researched.push(Searched)
                            }
                        })
                    })
                }
            })
            DB.selectAll("buildings").then(function(res){
                res.data.forEach(building =>{
                    building.Quantity = 0;
                    building.FirstMinimalCost = building.First_Resources.split(' ')[0]
                    building.SecondMinimalCost = building.Second_Resources.split(' ')[0]
                    building.ThirdMinimalCost = building.Third_Resources.split(' ')[0]
                    building.Bonus = building.Bonus.replaceAll("_"," ")
                    $rootScope.buildings.push(building);
                });
            });
            DB.select("builted","UserID",$rootScope.User.ID).then(function(res){
                if(res.data.length == 0){
                    $rootScope.buildings.forEach(building => {
                        building.Quantity = 0;
                    });
                }
                else{
                    let i = 0;
                    $rootScope.buildings.forEach(building =>{
                        building.Quantity = res.data[i].Quantity;
                        building.MinimalCost = building.Cost
                        CostSet(building);

                        i++;
                    })
                    res.data.forEach(building =>{
                        if(StorageCap(building)){
                            if(building.Bonus.split(" ")[1] == "storage"){
                                $rootScope.resources.forEach()
                            }
                        }
                        else if(JobCap(building)){
            
                        }
                        else if(PeopleCap(building)){
                            $rootScope.peopleMax += parseInt(building.Bonus.split(" ")[0])*building.Quantity;
                        }
                        else if(TradeCap(building)){
            
                        }
                    })
                } 
            })
            DB.selectAll("military").then(function(res){
                res.data.forEach(troop =>{
                    $rootScope.military.push(troop);
                });
                MilitaryShow();
            });
            DB.selectAll("jobs").then(function(res){
                res.data.forEach(job => {
                    if(!BasicJob(job.Name)){
                        job.Max = 0;
                    }
                    else{
                        job.Max = $rootScope.peopleMax
                    }
                    $rootScope.jobs.push(job);
                });
            })
            DB.select("jobs_by_user","UserID",$rootScope.User.ID).then(function(res){
                if(res.data.length == 0){
                    $rootScope.jobs.forEach(job => {
                        job.Quantity = 0;
                    });
                }
                else{
                    let i = 0;
                    $rootScope.jobs.forEach(job =>{
                        job.Quantity = res.data[i].Quantity;
                        i++;
                    })
                } 
            })
        }
        $rootScope.Logout = function(){
            $rootScope.User = null;
            sessionStorage.clear('civilization', angular.toJson($rootScope.loggedUser));
            window.location.href = 'index.html';
        }
        PeopleCap = function(idx){
            if($rootScope.buildings[idx].Bonus.split(" ")[1] == "people"){
                return true;
            }
            else{
                return false;
            }
        }
        StorageCap = function(idx){
            if($rootScope.buildings[idx].Bonus.split(" ")[1] == "storage" || $rootScope.buildings[idx].Bonus.split(" ")[2] == "storage"){
                return true;
            }
            else{
                return false;
            }
        }
        JobCap = function(idx){
            switch($rootScope.buildings[idx].Bonus.split(" ")[1]){
                case "shaman":
                    return true;
                case "stone":
                    return true;
                case "miner":
                    return true;
                case "farmer":
                    return true;
                case "guild":
                    return true;
                case "teacher":
                    return true;
                case "scientist":
                    return true;
                case "professor":
                    return true;
                case "noble":
                    return true;
                case "coal":
                    return true;
                case "envoy":
                    return true;
                case "operator":
                    return true;
                default:
                    return false;
            }
        }
        TradeCap = function(idx){
            if($rootScope.buildings[idx].Bonus.split(" ")[1] == "trade"){
                return true;
            }
            else{
                return false;
            }
        }
        BasicJob = function(job){
            if(job == "Hunter" || job == "Gatherer"){
                return true;
            }
            else{
                return false;
            }
        }
        CostSet = function(building){
            if(building.Quantity != 0){
                if(building.First_Resources != null){
                    building.First_Resources[0] = building.building.FirstMinimalCost*(building.Quantity*0.20 + 1)
                }
                if(building.Second_Resources != null){
                    building.Second_Resources[0] = building.building.SecondMinimalCost*(Quantity*1.20)
                }
                if(building.Third_Resources != null){
                    building.Third_Resources[0] = building.building.ThirdMinimalCost*(Quantity*1.20)
                }
            }
        }
        MilitaryShow = function(){
            $rootScope.military.forEach(Troop => {
                Troop.hidden = true;
                if(Troop.Required_Tech == null){
                    Troop.hidden = false;
                }
                else{
                    $rootScope.researched.forEach(tech =>{
                        if(Troop.hidden == true && tech.Name == Troop.Required_Tech){
                            Troop.hidden = false;
                        }
                    })
                }
            });
        }
        $rootScope.Save = function(){
            DB.select("researched_techs","UserID",$rootScope.User.ID).then(function(res){
                if(res.data.length > 0){

                }
                else{
                    $rootScope.researched.forEach(tech =>{
                        let data ={
                            UserID: $rootScope.User.ID,
                            ResearchID: tech.ID
                        }
                        DB.insert("researched_techs", data)
                    })
                }
            })
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
    .when('/Admin',{
        templateUrl: 'Views/Admin.html',
        controller:'AdminCtrl'
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
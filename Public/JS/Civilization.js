let app = new angular.module('Civilization',['ngRoute'])

app.run(function($rootScope, DB){
    if(window.sessionStorage['civilization']){
        $rootScope.User = JSON.parse(window.sessionStorage['civilization']);
        $rootScope.govs = [];
        $rootScope.buttons = [];
        $rootScope.researchs = [];
        $rootScope.buildings = [];
        $rootScope.military = [];
        $rootScope.Specie = $rootScope.User.Specie;
        
        if($rootScope.User.Specie === 0){
            $rootScope.Resources = [];
            $rootScope.RNAI = 0;
            $rootScope.DNAI = 0;
            $rootScope.storage = 100;
            DB.selectAll("resources").then(function(res){
                for(i = 0; i < 2; i++){
                        $rootScope.resource = res.data[i];
                        $rootScope.resource.quantity = 0;
                        $rootScope.Resources.push($rootScope.resource)
                }
            })
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
                    $rootScope.buildings.push(building);
                });
            });
            DB.selectAll("military").then(function(res){
                res.data.forEach(troop =>{
                    $rootScope.military.push(troop);
                });
            });
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
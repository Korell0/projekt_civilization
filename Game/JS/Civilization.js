let app = new angular.module('Civilization',['ngRoute'])

app.run(function($rootScope, DB){
    $rootScope.User = JSON.parse(window.sessionStorage['civilization'])
    $rootScope.govs = [];
    $rootScope.buttons = [];
    $rootScope.researchs = [];
    $rootScope.buildings = [];
    
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
        if(  $rootScope.User.Specie === 2) $rootScope.Specie = "Avian";
        if(  $rootScope.User.Specie === 3) $rootScope.Specie = "Mammal";
        if(  $rootScope.User.Specie === 4) $rootScope.Specie = "Reptilian";
        if(  $rootScope.User.Specie === 5) $rootScope.Specie = "Arachnid";
        if(  $rootScope.User.Specie === 6) $rootScope.Specie = "Aquatic";
        if(  $rootScope.User.Specie === 7) $rootScope.Specie = "Plantoid";
        if(  $rootScope.User.Specie === 8) $rootScope.Specie = "Fungoid";
        if(  $rootScope.User.Specie === 9) $rootScope.Specie = "Lithoid";
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
            console.log()
            res.data.forEach(building =>{
                $rootScope.buildings.push(building);
            });
        });
    }
    $rootScope.Logout = function(){
        $rootScope.User = null;
        sessionStorage.clear('civilization', angular.toJson($rootScope.loggedUser));
        window.location.href = '../Public/index.html';
    }


});

app.config(function($routeProvider){
    $routeProvider

        .when('/Civilization',{
            templateUrl: 'Views/Civilization.html',
            controller: 'CivCtrl'
        })
        .when('/Military',{
            templateUrl: 'Views/Military.html',
            controller: 'MilitaryCtrl'
        })
        .when('/Projects',{
            templateUrl: 'Views/Projects.html',
            controller: 'ProjectsCtrl'
        })
        .when('/Research',{
            templateUrl: 'Views/Research.html',
            controller: 'ResearchCtrl'
        })
        .when('/Society',{
            templateUrl: 'Views/Society.html',
            controller: 'SocietyCtrl'
        })
        .when('/Settings',{
            templateUrl: 'Views/Settings.html',
            controller: 'SettingsCtrl'
        })
        .when('/Resources',{
            templateUrl: 'Views/Resources.html',
            controller: 'ResourceController'
        })

        .otherwise('/Civilization')
});
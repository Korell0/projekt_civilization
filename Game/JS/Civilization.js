let app = new angular.module('Civilization',['ngRoute'])

app.run(function($rootScope, DB){
    $rootScope.User = JSON.parse(window.sessionStorage['civilization'])
    $rootScope.Specie = "";
    if(parseInt($rootScope.User.Specie) === 0){
        $rootScope.Resources = [];
        $rootScope.govs = [];
        $rootScope.RNAI = 0;
        $rootScope.DNAI = 0;
        $rootScope.Specie = 0;
        $rootScope.buttons = [];
        $rootScope.storage = 100;
        DB.selectAll("Resources").then(function(res){
            res.data.forEach(resource => {
                $rootScope.Resources.push(resource)
            });
        })
        DB.selectAll("government").then(function(res){
            res.data.forEach(gov => {
                $rootScope.govs.push(gov)
            });
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
        switch($rootScope.User.Specie){
            case 2:
                $rootScope.Specie = "Avian";
            case 3:
                $rootScope.Specie = "Mammal";
            case 4:
                $rootScope.Specie = "Reptilian";
            case 5:
                $rootScope.Specie = "Arachnid";
            case 6:
                $rootScope.Specie = "Aquatic";
            case 7:
                $rootScope.Specie = "Plantoid";
            case 8:
                $rootScope.Specie = "Fungoid";
            case 9:
                $rootScope.Specie = "Lithoid";
        }
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
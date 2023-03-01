let app = new angular.module('Civilization',['ngRoute'])

app.run(function($rootScope, DB){
    $rootScope.User = JSON.parse(window.sessionStorage['civilization'])
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
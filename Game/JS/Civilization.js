let app = new angular.module('Civilization',['ngRoute'])

app.run(function($rootScope){

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
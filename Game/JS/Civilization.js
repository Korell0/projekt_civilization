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
            controller: 'StagesCtrl'
        })
        .when('/Projects',{
            templateUrl: 'Views/Projects.html',
            controller: 'DevelopersCtrl'
        })
        .when('/Research',{
            templateUrl: 'Views/Research.html',
            controller: 'DescriptionCtrl'
        })
        .when('/Society',{
            templateUrl: 'Views/Society.html',
            controller: 'DescriptionCtrl'
        })
        .when('/Settings',{
            templateUrl: 'Views/Settings.html',
            controller: 'DescriptionCtrl'
        })
        .when('/Resources',{
            templateUrl: 'Views/Resources.html',
            controller: 'ResourceController'
        })

        .otherwise('/Civilization')
});
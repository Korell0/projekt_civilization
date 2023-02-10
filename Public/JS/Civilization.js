let app = new angular.module('Civilization',['ngRoute'])

app.run(function($rootScope){

});

app.config(function($routeProvider){
    $routeProvider
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
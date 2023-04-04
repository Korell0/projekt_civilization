app.controller('NewsCtrl',function($scope){
    $scope.exampleNews = [
        {
            Title: "Genereal maintanace",
            Date: "2023.04.04",
            Description: "The game will be in maintanace mode from 2023.04.04 to an undiscosed date. We as developers are sorry for any inconvinience."
        },
        {
            Title: "The news now work better",
            Date: "2023.04.03",
            Description:"We have decided not to use SQL for the news becouse it just dosent want to work."
        },
        {
            Title: "'The game is progressing smoothly' says spokes person",
            Date: "2023.04.03",
            Description: "Today Molnar Viktor the representative of Half-A-Braincell Games sad that their new game 'Civilization' is coming along nicely and we could try the game later this month."
        }
        

    ]
});
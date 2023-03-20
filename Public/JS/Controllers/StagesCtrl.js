app.controller('StagesCtrl',function($scope){
    $scope.Stages =[
        {
            Title: "Cell Stage",
            Firstrow: "Evolution routes",
            Secondrow: "Each evolution route have 4 phase",
            PictureName: "single-cell.jpg"
        },
        {
            Title: "Creature Stage",
            Firstrow: "Basic management",
            Secondrow: "Skills to unlock",
            Thirdrow: "Small herd of species",
            PictureName: "Public/img/creture.jpg"
        },
        {
            Title: "Tribal Stage",
            Firstrow: "Small settlement",
            Secondrow: "Job management",
            Thirdrow: "Research",
            PictureName: "Public/img/tribal.jpg"
        }
    ]

    $scope.Eras = [
        {
            Title: "Classical Era",
            Firstrow: "Money and agriculture",
            Secondrow: "Hostile cities",
            Thirdrow: "Wonders"
        },
        {
            Title: "Medieval Era",
            Firstrow: "Nobility",
            Secondrow: "Defensive buildings"
        },
        {
            Title: "Industrial Era",
            Firstrow: "Coal mining",
            Secondrow: "Railway",
            Thirdrow: "Coal industry/pollution"
        },
        {
            Title: "Modern Era",
            Firstrow: "Buy cities",
            Secondrow: "Country system",
            Thirdrow: "Electronics"
        },
        {
            Title: "Space Era",
            Firstrow: "colonize planets",
            Secondrow: "Satellites and stations",
        },
        {
            Title: "Interstellar Era",
            Firstrow: "colonize systems",
            Secondrow: "alien species",
            Thirdrow: "Megastuctures"
        },
        {
            Title: "Intergalactic Era",
            Firstrow: "Explore new galaxies",
            Secondrow: "Build mass relays",
            Thirdrow: "Colonize systems in distant galaxies"
        }

    ]
});
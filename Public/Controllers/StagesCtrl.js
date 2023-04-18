app.controller('StagesCtrl',function($scope){
    $scope.Stages =[
        {
            Title: "Cell Stage",
            Firstrow: "Start life on a new planet",
            Secondrow: "Choose your own route of evolution",
            Thirdrow: ".",
            PictureName: "../Public/img/singlecell.png"
        },
        {
            Title: "Creature Stage",
            Firstrow: "Go inland and evolve",
            Secondrow: "Manage a small herd of creatures",
            Thirdrow: "Learn to survive",
            PictureName: "../Public/img/creture.png"
        },
        {
            Title: "Tribal Stage",
            Firstrow: "Grow your settlement",
            Secondrow: "Resarch and develop new technologies",
            Thirdrow: "Start a civilization",
            PictureName: "../Public/img/tribal.png"
        }
    ]

    $scope.Eras = [
        {
            Title: "Classical Era",
            Firstrow: "Expand your territories",
            Secondrow: "Conquer or parley with other states",
            Thirdrow: "Create the wonders of the world",
            PictureName: "../Public/img/ancient.png"
        },
        {
            Title: "Medieval Era",
            Firstrow: "Harness the power of steel and stone",
            Secondrow: "Defend your people",
            Thirdrow: ".",
            PictureName: "../Public/img/french.png"
        },
        {
            Title: "Industrial Era",
            Firstrow: "Harness the power of steam",
            Secondrow: "Make leaps in thechnology",
            Thirdrow: "Connect your empire",
            PictureName: "../Public/img/industri.png"
        },
        {
            Title: "Modern Era",
            Firstrow: "Create your own country",
            Secondrow: "Make others submit to you",
            Thirdrow: "Use the wonders of electricity",
            PictureName: "../Public/img/modern.png"
        },
        {
            Title: "Space Era",
            Firstrow: "Leave your little planet",
            Secondrow: "Eplore your solar system",
            Thirdrow: ".",
            PictureName: "../Public/img/spaceship.png"
        },
        {
            Title: "Interstellar Era",
            Firstrow: "Leave your sytem and eplore the galaxy",
            Secondrow: "Meet alien species",
            Thirdrow: "Build the first megastuctures",
            PictureName: "../Public/img/interstellar.png"
        },
        {
            Title: "Intergalactic Era",
            Firstrow: "Explore new galaxies",
            Secondrow: "Your empire knows no bounds",
            Thirdrow: "Become the greatest Civilization",
            PictureName: "../Public/img/intergalactic.png"
        }

    ]
});
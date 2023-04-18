app.controller('UserCtrl', function($scope, DB, $rootScope, $location) {

    $scope.user = {};
    $scope.registration = function() {
        if ($scope.user.name == null || $scope.user.email == null || $scope.user.password == null || $scope.user.passwordA == null) {
            alert('Nem adtál meg minden kötelező adatot!');
        } else {
            if ($scope.user.password != $scope.user.passwordA) {
                alert('A megadott jelszavak nem egyeznek!');
            } else {
                var pwd_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
                if (!$scope.user.password.match(pwd_pattern)) {
                    alert('A megadott jelszó nem felel meg a minimális biztonsági követelményeknek!');
                } else {
                    let data = {
                        Username: $scope.user.name,
                        Password: CryptoJS.SHA1($scope.user.password).toString(),
                        Email: $scope.user.email,
                        Specie: "Cell"
                    }
                    DB.insert('users', data).then(function(res) {
                        if (res.data.affectedRows != 0) {
                            alert('A regisztráció sikeres! Beléphetsz az oldalra!');
                            $scope.user = {};
                        } else {
                            alert('Váratlan hiba történt az adatbázis művelet során!');
                        }
                    });
                }
            }
        }
    };

    $scope.login = function() {
        if ($scope.user.Name == null || $scope.user.Password == null) {
            alert('Nem adtál meg minden kötelező adatot!');
        } else {
            let data = {
                table: 'users',
                Username: $scope.user.Name,
                Password: CryptoJS.SHA1($scope.user.Password).toString()
            }

            DB.logincheck(data).then(function(res) {
                console.log(res.data);
                if (res.data.length == 0) {
                    alert('Hibás belépési adatok!');
                }
                else 
                {
                    if(data.Username == "Admin"){
                        window.location.href = '#!/Admin';
                    }
                    else{
                        $rootScope.loggedUser = res.data[0];
                        sessionStorage.setItem('civilization', angular.toJson($rootScope.loggedUser));
                        window.location.href = 'Game.html';
                    }
                }
            });
        }
    }

    $scope.logout = function() {
        $rootScope.loggedUser = null;
        sessionStorage.removeItem('Civilization');
        $location.path('/');
    }
});
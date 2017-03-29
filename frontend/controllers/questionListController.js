angular.module('displayQuestionApp').controller('dataCtrl', ['$scope', '$http', function ($scope, $http) {

    $http({
        method: 'GET',
        url: 'http://localhost:3000/questions'
    }).then(function successCallback(response) {
        var data = response;
        console.log(data);
    }, function errorCallback(response) {
        alert('GET: an error occured !')
    });

    // function getData() {
    //     var xhr = new XMLHttpRequest();

    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState === XMLHttpRequest.DONE) {
    //             if (xhr.status >= 200 && xhr.status < 300) {
    //                 var data = JSON.parse(xhr.responseText);
    //                console.log(data);
    //                 return data;
    //             } else {
    //                 alert("GET: une erreur s'est produite !");
    //             }
    //         }
    //     }

    //     xhr.open('GET', 'http://localhost:3000/questions');
    //     xhr.send();
    // }
}]);
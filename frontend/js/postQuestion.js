window.addEventListener('DOMContentLoaded', function () {

    submit.onclick = postQuestion;

});

const submit = document.getElementById('submit');

function postQuestion() {

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                alert("Thank you !");
            }
        }
    };

    xhr.open('POST', 'http://localhost:3000/questions');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    var jsonQuestion = JSON.stringify(createQuestion());
    console.log(jsonQuestion);

    xhr.send(jsonQuestion);

}

function getIdNumber() {
    var url = 'http://localhost:3000';
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log('coucou !')
            } else {
                alert("GET: une erreur s'est produite !");
            }
        }
    };

    xhr.open('GET', url);
    xhr.send();
    var obj = url[questions];
    var currentId = Object.keys(obj).length + 1;
    return currentId;
}

function createQuestion() {
    var obj = {};

    // obj.id = getIdNumber();
    obj.title = document.getElementById('title').value;
    obj.tags = document.getElementById('tags').value;
    obj.content = document.getElementById('content').value;

    console.log(obj);

    return obj;
}
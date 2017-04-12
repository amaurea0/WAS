// fakeDataBase.js

var faker = require('faker')

faker.locale = "fr";

function randomIntNum(num) {
  var num = parseInt(Math.random() * num + 1);
  return num;
};

function generateUsers() {
  var users = []

  for (var id = 0; id < 15; id++) {
    var firstName = faker.name.firstName()
    var lastName = faker.name.firstName()
    var pseudo = faker.lorem.word()
    var avatar = faker.image.avatar()
    var city = faker.address.city()

    users.push({
      "id": id,
      "first_name": firstName,
      "last_name": lastName,
      "pseudo": pseudo,
      "avatar": avatar,
      "ville": city
    })
  }

  return users;
}

function chooseTag (){
var array = ["javascript", "Symfony", "PHP", "Angularjs"]
var randomNber = Math.floor(Math.random() * array.length);
return array[randomNber];
}

function generatePosts() {
  var questions = []

  for (var id = 0; id < 50; id++) {
    var title = faker.lorem.words();
    var body = faker.lorem.paragraph();
    var nbViews = faker.random.number();
    var nbVotes = faker.random.number();
    var date = faker.date.recent();
    var userId = randomIntNum(15);
    var tagsId = chooseTag();

    questions.push({
      "id": id,
      "title": title,
      "body": body,
      "views": nbViews,
      "votes": nbVotes,
      "date": date,
      "userId": userId,
      "tagsId": tagsId
    });
  }
  return questions;
}

function generateAnswers() {
  var answers = [];

  for (var id = 0; id < 100; id++) {
    var body = faker.lorem.paragraph();
    var nbViews = faker.random.number();
    var nbVotes = faker.random.number();
    var date = faker.date.recent();
    var userId = randomIntNum(15);
    var postId = randomIntNum(50);

    answers.push({
      "id": id,
      "body": body,
      "views": nbViews,
      "votes": nbVotes,
      "date": date,
      "userId": userId,
      "questionId": postId
    })
  }
  return answers;
}



function createDatabase() {
  var db = {
    "questions": generatePosts(),
    "users": generateUsers(),
    "answers": generateAnswers()
  }
  return db;
}

// json-server requires that you export
// a function which generates the data set
module.exports = createDatabase

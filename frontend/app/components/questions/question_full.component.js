'use strict';

/**
 * The recipesList component
 */
COMPNT
    .component("questionFull", {

        templateUrl: '/frontend/app/components/questions/question_full.html',

        bindings: {
            question: '<',
            edition: '<',
            answer: '<',
            post: '<'
        },

        controller: ['AuthService', 'QuestionsService', '$log', '$state', '$stateParams', '$location', '$timeout', 'notify', function (AuthService, QuestionsService, $log, $state, $stateParams, $location, $timeout, notify) {

            this.currentPage = 1;
            this.pageSize = 3;

            this.pageChangeHandler = function (num) {
                console.log('going to page ' + num);
            };

            this.$onInit = () => {

                this.connected = AuthService.getCurrentUser();
                this.answers = this.question.answers;

                var updatedCount = {
                    "nb_views": this.question.nb_views + 1
                }

                this.myQuestion = false;
                if (AuthService.getCurrentUser()) {
                    if (this.question.userId == AuthService.getCurrentUser().id) {
                        this.myQuestion = true;
                    }
                }

                this.question.answers.forEach((answer) => {
                    if (AuthService.getCurrentUser()) {
                        if (answer.userId == AuthService.getCurrentUser().id) {
                            answer.myAnswer = true;
                        } else {
                            answer.myAnswer = false;
                        }
                    };
                })

                QuestionsService.updateContent(this.question.id, updatedCount).then((response) => {
                    $log.log('ca a marché !');
                    QuestionsService.getSpecificQuestion(this.question.id).then((response) => {
                        $log.log(response.nb_views);
                    }).catch((error) => {
                        $log.error("couldn't retrieve updated views");
                    })
                }).catch((error) => {
                    $log.error('en fait non');
                });
            }


            this.voteQst = (questionid) => {
                if (AuthService.getCurrentUser()) {
                    var userid = AuthService.getCurrentUser().id;
                    QuestionsService.voteQstExist(questionid, userid).then((response) => {
                        if (response.length == 0) {

                            var updatedVote = {
                                "votes": this.question.votes + 1
                            };
                            var votes_question = {
                                "userId": userid,
                                "questionId": questionid
                            };

                            QuestionsService.updateContent(this.question.id, updatedVote).then((rsp) => {
                                $log.log("vote update");
                                this.question.votes = rsp.votes;
                            }).catch((error) => {});

                            QuestionsService.postVoteQuestionUser(votes_question).then((rsp) => {}).catch((error) => {});

                        }
                    }).catch((error) => {})

                }
            }

            this.voteAsw = (answer) => {
                if (AuthService.getCurrentUser()) {
                    var userid = AuthService.getCurrentUser().id;
                    QuestionsService.voteAswExist(answer.id, userid).then((response) => {


                        if (response.length == 0) {

                            var updatedVote = {
                                "votes": answer.votes + 1
                            };
                            var votes_answer = {
                                "userId": userid,
                                "answerId": answer.id
                            };

                            QuestionsService.updateVoteAnswer(answer.id, updatedVote).then((rsp) => {
                                $log.log("vote update");
                                // We look for the index of the answer in the answers array
                                var searchTerm = answer.id;
                                var index = -1;
                                for (var i = 0; i < this.question.answers.length; i++) {
                                    if (this.question.answers[i].id === searchTerm) {
                                        index = i;
                                        break;
                                    }
                                }
                                this.question.answers[index].votes = rsp.votes;
                            }).catch((error) => {});

                            QuestionsService.postVoteAnswerUser(votes_answer).then((rsp) => {}).catch((error) => {});

                        }
                    }).catch((error) => {})

                }
            }

            this.editContentAnswer = (answer) => {

                var currentId = this.answer.id;

                var new_content = {
                    "title": this.answer.title,
                    "content": this.answer.content
                };

                QuestionsService.updateContentAnswer(currentId, new_content).then((response) => {
                    console.log('ANSWER :' + response.id + ' is updated !');
                    $timeout($state.go('questionSpec', {
                        idQuestion: this.question.id,
                        edition: false
                    }), 0);

                }).catch((err) => {
                    alert("ERROR :" + err);
                })
            }

            this.saveAnswer = () => {
                var new_answer = {
                    "title": this.answer.title,
                    "content": this.answer.content,
                    "nb_views": 0,
                    "votes": 0,
                    "date": new Date(),
                    "userId": AuthService.getCurrentUser().id,
                    "questionId": this.question.id
                }

                var newAnswersCount = {
                    "answersCount": this.question.answersCount + 1
                }

                QuestionsService.postAnswer(new_answer).then((response) => {
                    $timeout($state.go('questionSpec', {
                        idQuestion: this.question.id,
                        post: false
                    }), 0);
                    notify({
                        message: 'Votre réponse a été posté !',
                        duration: 2500,
                        classes: 'green darken-1'
                    })
                }).catch((err) => {
                    notify({
                        message: "Votre réponse n'a pas été posté !",
                        duration: 2500,
                        classes: 'red darken-1'
                    })
                });

                QuestionsService.updateContent(this.question.id, newAnswersCount).then((response) => {
                    console.log("did it work ?");
                }).catch((error) => {})

            }

        }]
    });
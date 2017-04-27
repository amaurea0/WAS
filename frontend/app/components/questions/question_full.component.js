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
            postAnswer: '<'
        },

        controller: ['authService', 'QuestionsService', '$log', '$state', '$stateParams', '$location', '$timeout', 'notify', '$scope', 'TaglinkService', function (authService, QuestionsService, $log, $state, $stateParams, $location, $timeout, notify, $scope, TaglinkService) {

            this.currentPage = 1;
            this.pageSize = 3;

            this.pageChangeHandler = function (num) {
                console.log('going to page ' + num);
            };

            this.$onInit = () => {

                TaglinkService.displayTags(this.question);

                this.connected = authService.getCurrentUser();
                this.myQuestionVote = false;
                this.myQuestion = false;

                if (authService.getCurrentUser()) {
                    if (this.question.userId == authService.getCurrentUser().id) {
                        this.myQuestion = true;
                        QuestionsService.updateContent(this.question.id, {
                            "answersCount": 0
                        });
                    }
                    QuestionsService.getIfMyVotedQuestion(this.question.id, authService.getCurrentUser().id).then((rsp) => {
                        if (rsp.length > 0) {
                            this.myQuestionVote = true;
                        }
                    }).catch((error) => {});

                }

                this.question.answers.forEach((answer) => {
                    if (authService.getCurrentUser()) {
                        if (answer.userId == authService.getCurrentUser().id) {
                            answer.myAnswer = true;
                        } else {
                            answer.myAnswer = false;
                        }
                        QuestionsService.getIfMyVotedAnswer(answer.id, authService.getCurrentUser().id).then((rsp) => {
                            if (rsp.length > 0) {
                                answer.myAnswerVote = true;
                            } else {
                                answer.myAnswerVote = false;
                            }
                        }).catch((error) => {});

                    };
                    QuestionsService.getAnswerForComments(answer.id).then((answerfull) => {
                        $log.log(answerfull);
                        answer["coms"] = answerfull.comments;
                    }).catch((error) => {
                        $log.error("comment error");
                    });
                })

                this.firstAnswer();
            }

            this.firstAnswer = () => {
                this.answers = this.question.answers;
                var maxvote = 0;
                var keepGoing = true;
                this.bestanswer = this.answers[0];
                this.answers.forEach((answer) => {
                    if (keepGoing) {
                        if (answer.votes > maxvote) {
                            maxvote = answer.votes;
                            this.bestanswer = answer;
                        }
                        if (answer.bestAnswer) {
                            this.bestanswer = answer;
                            this.resolved = true;
                            keepGoing = false;
                        }
                    }
                })
                this.answers.splice(this.answers.indexOf(this.bestanswer), 1);

            }

            this.bestAnswer = (answer) => {
                this.answers.push(this.bestanswer);
                QuestionsService.updateContentAnswer(this.bestanswer.id, {
                    bestAnswer: false
                });

                this.bestanswer = answer;
                this.bestanswer.bestAnswer = true;
                this.answers.splice(this.answers.indexOf(answer), 1);
                QuestionsService.updateContentAnswer(answer.id, {
                    bestAnswer: true
                });
            }

            this.voteQst = (questionid) => {
                if (authService.getCurrentUser()) {
                    var userid = authService.getCurrentUser().id;
                    this.myQuestionVote = true;
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
                if (authService.getCurrentUser()) {
                    var userid = authService.getCurrentUser().id;
                    answer.myAnswerVote = true;

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
            this.voteBestAsw = (answer) => {
                if (authService.getCurrentUser()) {
                    var userid = authService.getCurrentUser().id;
                    answer.myAnswerVote = true;

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

                                answer.votes = rsp.votes;
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
                    "userId": authService.getCurrentUser().id,
                    "questionId": this.question.id,
                    "bestAnswer": false
                }
                this.answer = {};

                var newAnswersCount = {
                    "answersCount": this.question.answersCount + 1
                }

                QuestionsService.updateContent(this.question.id, newAnswersCount).then((response) => {}).catch((error) => {})

                QuestionsService.postAnswer(new_answer).then((response) => {
                    this.answers = this.newAnswer(new_answer);
                    notify({
                        message: 'Votre réponse a été posté !',
                        duration: 2500,
                        classes: '#eceff1 blue-grey lighten-5',
                    });
                }).catch((err) => {
                    notify({
                        message: "Votre réponse n'a pas été posté !",
                        duration: 2500,
                        classes: '#eceff1 blue-grey lighten-5',
                    })
                });

            }

            this.newAnswer = (obj) => {
                var _collection = this.question.answers;
                _collection.push(obj);
                return _collection;
            }


            // poster un nouveau commentaire
            this.saveComment = (answerid) => {
                var new_comment = {
                    "content": this.comment.content,
                    "date": new Date(),
                    "answerId": answerid,
                    "userId": authService.getCurrentUser().id
                }
                this.comment.content = "";
                this.question.answers.forEach((answer) => {
                    if (answer.id == answerid) {
                        answer.coms.push(new_comment);
                    }
                })

                QuestionsService.postComment(new_comment).then((response) => {
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
            }



        }]
    });
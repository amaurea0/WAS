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

        controller: ['authService', 'QuestionsService', '$log', '$state', '$stateParams', '$location', '$timeout', 'notify', function (authService, QuestionsService, $log, $state, $stateParams, $location, $timeout, notify) {

            this.currentPage = 1;
            this.pageSize = 3;

            this.pageChangeHandler = function (num) {
                console.log('going to page ' + num);
            };

            this.$onInit = () => {

                this.connected = authService.getCurrentUser();
                console.log(this.connected)
                this.answers = this.question.answers;
                this.myQuestionVote = false;
                this.myQuestion = false;

                if (authService.getCurrentUser()) {
                    if (this.question.userId == authService.getCurrentUser().id) {
                        this.myQuestion = true;
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
                        console.log(this.question.answers);
                    }).catch((error) => {
                        $log.error("comment error");
                    });
                })
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
                            console.log(votes_question)

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
                    "questionId": this.question.id
                }

                var newAnswersCount = {
                    "answersCount": this.question.answersCount + 1
                }

                QuestionsService.updateContent(this.question.id, newAnswersCount).then((response) => {
                    console.log("did it work ?");
                }).catch((error) => {})

                QuestionsService.postAnswer(new_answer).then((response) => {
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

                $state.go('questionSpec', {
                    idQuestion: this.question.id,
                    postAnswer: false
                })
            }

            // poster un nouveau commentaire
            this.saveComment = (answerid) => {
                var new_comment = {
                    "content": this.comment.content,
                    "date": new Date(),
                    "answerId": answerid,
                    "userId": authService.getCurrentUser().id
                }

                this.question.answers.forEach((answer) => {
                    if(answer.id == answerid) {
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

                // $state.go('questionSpec', {
                //     idQuestion: this.question.id,
                //     postComment: false
                // })

            }



        }]
    });
'use strict';

/**
 * The recipesList component
 */
COMPNT
    .component("questionFull", {

        templateUrl: '/frontend/app/components/questions/question_full.html',

        bindings: {
            question: '<'
        },

        controller: ['AuthService', 'QuestionsService', '$log', '$state', function (AuthService, QuestionsService, $log, $state) {
            this.$onInit = () => {

                var updatedCount = {
                    "nb_views": this.question.nb_views + 1
                }
                this.myQuestion = false;
                if (AuthService.getCurrentUser()) {
                    if (this.question.userId == AuthService.getCurrentUser().id) this.myQuestion = true;
                }

                QuestionsService.viewQuestion(this.question.id, updatedCount).then((response) => {
                    $log.log('views updated');
                    QuestionsService.getSpecificQuestion(this.question.id).then((response) => {
                    }).catch((error) => {
                        $log.error("couldn't retrieve updated views");
                    })
                }).catch((error) => {
                    $log.error('en fait non');
                });
            };

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

                            QuestionsService.updateVoteQuestion(this.question.id, updatedVote).then((rsp) => {
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
        }]
    });
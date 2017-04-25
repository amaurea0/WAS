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

        controller: ['AuthService', 'QuestionsService', '$log', function (AuthService, QuestionsService, $log, $scope) {

            this.currentPage = 1;
            this.pageSize = 3;

            this.pageChangeHandler = function (num) {
                console.log('going to page ' + num);
            };

            this.$onInit = () => {

                this.answers = this.question.answers;

                var updatedCount = {
                    "nb_views": this.question.nb_views + 1
                }

                this.myQuestion = false;
                if (AuthService.getCurrentUser()) {
                    if (this.question.userId == AuthService.getCurrentUser().id) this.myQuestion = true;
                }

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
            };
        }]
    });
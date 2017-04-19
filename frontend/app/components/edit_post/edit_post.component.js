'use strict';

COMPNT.component("editPost", {

    templateUrl: '/app/components/question_post/question_post.html',

    bindings: {
        info: '<'
    },

    controller: function (QuestionsService, $scope) {

        this.editContent = () => {
            new_content = {
                "title": content.title,
                "body": content.body
            };

            if (USER_AUTHENTICATED) {
                EditServices.saveContent(new_content).then((items) => {
                    // $state.go('list');
                    console.log('yeeeah');
                }).catch((err) => {});
            };
        }
    }
});
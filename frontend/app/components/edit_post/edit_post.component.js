'use strict';

COMPNT.component("editPost", {

    templateUrl: '/frontend/app/components/edit_post/edit_post.html',

    bindings: {
        post: '<'
    },

    controller: function (QuestionsService, $scope, $state) {

        this.editContent = (post) => {

            var currentId = this.post.id;

            var new_content = {
                "title": this.post.title,
                "content": this.post.content
            };

            console.log(new_content);

            QuestionsService.updateContent(currentId, new_content).then((response) => {
                console.log('POST :' + response + 'is updated !');
                $state.go('questionSpec', {
                    idQuestion: currentId
                });
            }).catch((err) => {
                alert("ERROR :" + err);
            })
        }
    }
});
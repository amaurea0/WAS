'use strict';

COMPNT
    .component("editPost", {

        templateUrl: '/frontend/app/components/edit_post/edit_post.html',

        bindings: {
            post: '<'
        },

        controller: ['QuestionsService', '$state', 'notify', function (QuestionsService, $state, notify) {

            this.editContent = (post) => {

                var currentId = this.post.id;

                var new_content = {
                    "title": this.post.title,
                    "content": this.post.content
                };

                console.log(new_content);

                QuestionsService.updateContent(currentId, new_content).then((response) => {
                    $state.go('questionSpec', {
                        idQuestion: currentId
                    });
                    notify({
                        message: 'Votre question a été mise à jour !',
                        duration: 2500,
                        classes: 'green darken-1'
                    })
                }).catch((err) => {
                    alert("ERROR :" + err);
                })
            }
        }]
    });
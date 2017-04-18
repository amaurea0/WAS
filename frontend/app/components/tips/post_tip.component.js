"use strict";

COMPNT.component("postTip", {
    templateUrl: '/frontend/app/components/tips/post_tip.html',

    bindings: {},

    controller: function (TipsService, $state) {

        this.saveTip = () => {
            var new_tip = {
                "content": this.tip.content,
                "url": "http://" + this.tip.url
            }

            console.log(new_tip);

            TipsService.postTip(new_tip).then((response) => {
                console.log('POST :' + response + ' is posted');
                $state.go('tips');
            }).catch((error) => {
                console.log('ERROR :' + error);
            })
        }
    }
})
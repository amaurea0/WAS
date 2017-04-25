'use strict';

COMPNT.component('tips', {

    templateUrl: "/frontend/app/components/tips/tips.html",

    bindings: {},

    controller: function (TipsService) {

        this.tips = [];
        this.query='';

        this.$onInit = () => {
            TipsService.getTips().then((items) => {
                this.tips = items;
                console.log(this.tips);
            }).catch((error) => {
                console.log("controller: couldn't fetch items...");
            })
        }


    }
})
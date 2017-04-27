'use strict';

/**
 * The connectUsers component
 */
COMPNT.component('jobsList', {

    templateUrl: '/frontend/app/components/jobs/jobs_list.html',

    bindings: {

    },

    controller: ['JobService', '$state',
        function (JobService, $state) {

            this.currentPage = 1;
            this.jobs = [];

            this.$onInit = () => {
                this.getAllItems();
            };


            this.pageChangeHandler = function (num) {
                console.log('going to page ' + num);
            };

            this.getAllItems = () => {
                JobService.getJobs().then((items) => {
                    this.jobs = items;
                }).catch((err) => { });
            };

        }
    ]

});

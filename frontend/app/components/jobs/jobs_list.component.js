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

            this.jobs = [];

            this.$onInit = () => {
                this.getAllItems();
            };
                this.getAllItems = () => {
      JobService.getJobs().then((items) => {
        console.log(items);
        this.jobs = items;
      }).catch((err) => { });
    };

        }
    ]

});
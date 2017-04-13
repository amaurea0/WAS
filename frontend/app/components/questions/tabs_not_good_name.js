let tabs = {

    template: `
      <div class="tabs">
        <div class="tabs_list">
          <span
            ng-repeat="tab in $ctrl.tabs"
            ng-class="{selected: tab.selected}"
            ng-click="$ctrl.selectTab($index);"
          >
            <span ng-bind="tab.label"></span>
          </span>
        </div>
        <div class="tabs_content">
            <tab label={{$ctrl.tabsList[0].label}} selection="$ctrl.tabsList[0].sort" tabs="$ctrl.tabs" aquery="{{$ctrl.query}}" tag-filter="$ctrl.tagFilter">
            </tab>
            <tab label={{$ctrl.tabsList[1].label}} selection="$ctrl.tabsList[1].sort" tabs="$ctrl.tabs" aquery="{{$ctrl.query}}" tag-filter="$ctrl.tagFilter">
            </tab>
            <tab label={{$ctrl.tabsList[0].label}} selection="$ctrl.tabsList[0].sort" tabs="$ctrl.tabs" aquery="{{$ctrl.query}}" tag-filter="$ctrl.tagFilter">
            </tab>
        </div>
      </div>
    `,

    bindings: {
        query: '@',
        tagFilter: '<'
    },

    controller: function () {

        this.tabsList = [
            {
                "label": "Plus populaire",
                "sort": "votes"
            },
            {
                "label": "Plus vues",
                "sort": "nb_views"
            }
        ];

        this.$onInit = () => {
            this.tabs = [];
            console.log(this.tagFilter)
            console.log(this.query)
        }

        this.addTab = (tab) => {
            this.tabs.push(tab);
        };

        this.selectTab = (index) => {
            this.tabs.map((tab, i) => tab.selected = (i == index));
        };

        this.$postLink = () => {
            this.selectTab(this.selected || 0);
        }
    }
};

let tab = {

    template: `
    <div ng-if="$ctrl.tab.selected">
        <div class="panel" ng-repeat="question in $ctrl.questions | orderBy : $ctrl.selection | filter : $ctrl.aquery">
            <div id="left">
                <div id="votes" ng-bind="question.votes"></div>
                <div id="answers">
                    Réponses
                </div>
                <div ng-bind="question.views"></div>
            </div>

            <a ui-sref="questionSpec({questionId : question.id})">
                <div id="center">
                    <h1 class="header" ng-bind="question.title"></h1>
                    <div ng-bind="question.body"></div>
                </div>
            </a>

            <div id="right">
                <img ng-src="{{question.user.avatar}}" alt="avatar">
                <div ng-bind="question.date"></div>
            </div>
        </div>
    </div>
  `,


    bindings: {
        label: '@',
        selection: '<',
        tabs: '<',
        selected: '@',
        aquery: '@',
        tagFilter: '<'
    },

    require: {
        tabs: '^^tabs'
    },

    controller: ['QuestionsService', 'TaglinkService', function (QuestionsService, TaglinkService) {

        this.$onInit = () => {

            this.selection='-'+this.selection;

            this.tab = {
                label: this.label,
                selected: false
            };

            this.tabs.addTab(this.tab);

            this.model = {
                tagQuestionId: [],
                query: ''
            };
            this.questions = [];
            if (this.tagFilter) this.getTagedItems();
            else this.getAllItems();
        };

        this.getTagedItems = () => {
            TaglinkService.getQuestionsTag(this.tagFilter.tagId).then((items) => {
                this.model.tagQuestionId = items;

                angular.forEach(this.model.tagQuestionId, (value, key) => {
                    QuestionsService.getQuestionId(value.questionId).then((question) => {

                        this.questions.push(question[0]);

                    }).catch((err) => { });
                });

            }).catch((err) => { });
        };

        this.getAllItems = () => {
            QuestionsService.getQuestions(this.selection).then((items) => {
                this.questions = items;
            }).catch((err) => { });
        };

    }]
};

COMPNT
    .component('tab', tab)
    .component('tabs', tabs);
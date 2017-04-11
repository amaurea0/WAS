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
            <tab label="Populaires" selection="$ctrl.tabsList[0].sort" tabsss="$ctrl.tabs">
            </tab>
            <tab label="Plus vues" selection="$ctrl.tabsList[1].sort" tabsss="$ctrl.tabs">
            </tab>
            <tab label="Non répondues" selection="$ctrl.tabsList[0].sort" tabsss="$ctrl.tabs">
            </tab>
        </div>
      </div>
    `,

  bindings: {
    selected: '@'
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
    }

    this.addTab = (tab) => {
      this.tabs.push(tab);
    };

    this.selectTab = (index) => {
      this.tabs.map((tab, i) => tab.selected = (i == index));
      console.log(this.tabs)
    };

    this.$postLink = () => {
      this.selectTab(this.selected || 0);

    }
  }
};

let tab = {

    templateUrl: '/app/components/questions/tabs.html',

  bindings: {
    label: '@',
    selection: '<',
    tabsss: '<',
    selected: '@'
  },

  require: {
    tabs: '^^tabs'
  },

  controller: ['QuestionsService', function (QuestionsService) {

    this.questions = [];

    this.$onInit = () => {

      this.tab = {
        label: this.label,
        selected: false
      };

      this.tabs.addTab(this.tab);

      console.log(this.selection)

      this.getAllItems();

    };


    this.getAllItems = () => {
      QuestionsService.getQuestions(this.selection).then((items) => {
        this.questions = items;
        console.log(items);
      }).catch((err) => { });
    };

    // this.$onChanges = (changes) => {
    //   console.log(changes)
    //   console.log(this.tabsss)
    //   this.tabsss=changes;
    // }
  }]
};



COMPNT
  .component('tabs', tabs)
  .component('tab', tab);
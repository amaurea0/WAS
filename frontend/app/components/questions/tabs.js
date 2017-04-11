'use strict';

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
            <tab label="Populaires" selection="$ctrl.tabsList[0].sort">
            </tab>
            <tab label="Plus vues" selection="$ctrl.tabsList[1].sort">
            </tab>
            <tab label="Non répondues" selection="$ctrl.tabsList[0].sort">
            </tab>
        </div>
      </div>
        `,
    
  bindings: {
    selected: '@'
  },

  transclude: true,

  controller: function () {

    this.tabsList = [
      {
        "label": "Plus populaire",
        "sort": "nb_pop"
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
      this.tabs.map((tab, i) => tab.selected = (i == index)); // tab.selected vaut true seulement sur l'index courant
    };

    this.$postLink = () => {
      this.selectTab(this.selected || 0);
    }
  },
};

let tab = {

  template: `
    <div ng-if="$ctrl.tab.selected" ng-bind="$ctrl.selection">
    </div>
  `,

  bindings: {
    label: '@',
    selection: '<'
  },

  require: {
    tabs: '^^tabs'
  },

  transclude: true,

  controller: function () {

    this.$onInit = () => {

      this.tab = {
        label: this.label,
        selected: false
      };

      this.tabs.addTab(this.tab);
    };



  }
};


COMPNT
  .component('tabs', tabs)
  .component('tab', tab);
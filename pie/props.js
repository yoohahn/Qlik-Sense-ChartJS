define( [], function () {
  'use strict';
  var
    dimensions = {
      uses: "dimensions",
      min: 1,
      max: 1
    },
    measures = {
      uses: "measures",
      min: 1,
      max: 1
    },
    sorting = {
      uses: "sorting"
    },
    doughnut = {
      ref: "props.chartDoughnut",
      type: "boolean",
      component: "switch",
      label: "Doughnut layout",
      options: [ {
        value: true,
        label: "On"
      }, {
        value: false,
        label: "Off"
      } ],
      defaultValue: false
    },
    propertyPanel = {
      uses: "settings",
      items: {
        settings: {
          type: "items",
          label: "Presentation",
          items: {
            doughnut: doughnut
          }
        }
      }
    };

  return {
    type: "items",
    component: "accordion",
    items: {
      dimensions: dimensions,
      measures: measures,
      sorting: sorting,
      appearance: propertyPanel
    }
  };
} );

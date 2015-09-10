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
      min: 2,
      max: 2
    },
    sorting = {
      uses: "sorting"
    },
    roundValues = {
      ref: "props.chartRound",
      type: "boolean",
      component: "switch",
      label: "Round values",
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
            roundValues: roundValues
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

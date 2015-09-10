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
    propertyPanel = {
      uses: "settings",
      items: {
        settings: {
          type: "items",
          label: "Presentation",
          items: {

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

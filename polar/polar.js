define( [
  'jquery',
  './props',
  './external/load-externals'
], function ( $, props, externals ) {
  'use strict';

  function render( $element, layout, options ) {
    var
      ctx = externals.utils.prepChartArea( $element, layout ),
      o = externals.utils.prepOptions( options ),
      data = [ {
        value: 300,
        color: "#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
      }, {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      }, {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
      }, {
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
      }, {
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
      } ];

    new Chart( ctx ).PolarArea( data, o );
  }

  return {
    definition: props,
    initialProperties: externals.initProp,
    snapshot: {
      canTakeSnapshot: true
    },
    resize: function ( $element, layout ) {
      render( $element, layout, {
        animation: false
      } );
    },
    paint: render
  };
} );

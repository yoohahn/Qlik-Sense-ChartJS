define( [
  'jquery',
  './props',
  './external/load-externals'
], function ( $, props, externals ) {
  'use strict';

  //Render the chart
  function render( $element, layout, options ) {
    var
      ctx = externals.utils.generateCanvasAndCtx( $element, layout ),
      isDoughnut = layout.props.chartDoughnut,
      round = layout.props.chartRound,
      o = externals.utils.prepOptions( options ),
      data = externals.utils.prepOneMeasureChart( layout, round );

    new Chart( ctx )[ isDoughnut ? 'Doughnut' : 'Pie' ]( data, o );
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

define( [
  'jquery',
  './props',
  './external/load-externals'
], function ( $, props, externals ) {
  'use strict';

  function render( $element, layout, options ) {
    var
      ctx = externals.utils.generateCanvasAndCtx( $element, layout ),
      round = layout.props.chartRound,
      o = externals.utils.prepOptions( options ),
      data = externals.utils.prepOneMeasureChart( layout, round );

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

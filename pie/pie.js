define( [
  'jquery',
  './props',
  './init-props',
  './chart-util',
  './Chart'
], function ( $, props, initProp, cu, Chart ) {
  'use strict';

  //Prepare the data to the format that Chart.JS wan't it.
  function prepData( layout ) {
    var data = [];

    if ( layout.qHyperCube && layout.qHyperCube.qDataPages[ 0 ].qMatrix ) {
      var
        i,
        qMatrix = layout.qHyperCube.qDataPages[ 0 ].qMatrix,
        len = qMatrix.length,
        color,
        highlight;

      for ( i = 0; i < len; i++ ) {
        color = cu.generateHls( i, len, false );
        highlight = cu.generateHls( i, len, true );
        data.push( cu.getRowDataSimple( qMatrix[ i ], color, highlight ) );
      }
    }

    return cu.sortSimple( data, 'value', true );
  }

  //Render the chart
  function render( $element, layout, options ) {
    var
      ctx = cu.prepChartArea( $element, layout ),
      isDoughnut = layout.props.chartDoughnut,
      o = cu.prepOptions( options ),
      data = prepData( layout ),
      thatChart;

    thatChart = new Chart( ctx )[ isDoughnut ? 'Doughnut' : 'Pie' ]( data, o );
  }

  return {
    definition: props,
    initialProperties: initProp,
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

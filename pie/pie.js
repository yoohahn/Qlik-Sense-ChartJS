define( [
  'jquery',
  './props',
  './external/load-externals'
], function ( $, props, externals ) {
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
        var rowData = {};
        color = externals.utils.generateHls( i, len, false );
        highlight = externals.utils.generateHls( i, len, true );

        rowData.label = qMatrix[ i ][ 0 ].qText;
        rowData.value = qMatrix[ i ][ 1 ].qNum;
        rowData.color = color;
        rowData.highlight = highlight;

        data.push( rowData );
      }
    }

    return externals.utils.sortSimple( data, 'value', true );
  }

  //Render the chart
  function render( $element, layout, options ) {
    var
      ctx = externals.utils.prepChartArea( $element, layout ),
      isDoughnut = layout.props.chartDoughnut,
      o = externals.utils.prepOptions( options ),
      data = prepData( layout );

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

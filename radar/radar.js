define( [
  'jquery',
  './props',
  './external/load-externals'
], function ( $, props, externals ) {
  'use strict';

  //Prepare the data to the format that Chart.JS wan't it.
  function getDefaultDataSet() {
    return {
      label: "",
      fillColor: "",
      strokeColor: "",
      pointColor: "",
      pointStrokeColor: "",
      pointHighlightFill: "",
      pointHighlightStroke: "",
      data: []
    };
  }

  function formatValue( val, roundValues ) {
    if ( roundValues ) {
      val = parseInt( val, 10 )
    }
    return val;
  }

  function prepData( layout, round ) {
    var data = [];

    if ( layout.qHyperCube && layout.qHyperCube.qDataPages[ 0 ].qMatrix ) {
      var
        i,
        x,
        qMatrix = layout.qHyperCube.qDataPages[ 0 ].qMatrix,
        len = qMatrix.length,
        dataSetLen = qMatrix[ 0 ].length - 1,
        color,
        highlight,
        list = externals.utils.sortSimple( qMatrix, 'qNum', true, true );

      data.labels = [];
      data.datasets = [];

      //Create the ammount of dataSetList we need
      for ( x = 0; x < dataSetLen; x++ ) {
        data.datasets.push( getDefaultDataSet() );
      }

      for ( i = 0; i < len; i++ ) {
        data.labels.push( list[ i ][ 0 ].qText );

        for ( x = 0; x < dataSetLen; x++ ) {
          data.datasets[ x ].label = externals.utils.getMeasureTitle( layout, x );

          data.datasets[ x ].fillColor = externals.utils.convertHexToRgba( externals.colorbrew.PuOr[ 5 ][ x === 0 ? 1 : 4 ], 20 );
          data.datasets[ x ].strokeColor = externals.colorbrew.PuOr[ 5 ][ x === 0 ? 0 : 3 ];
          data.datasets[ x ].pointColor = externals.colorbrew.PuOr[ 5 ][ x === 0 ? 0 : 3 ];
          data.datasets[ x ].pointStrokeColor = "#fff";
          data.datasets[ x ].pointHighlightFill = "#fff";
          data.datasets[ x ].pointHighlightStroke = externals.colorbrew.PuOr[ 5 ][ x === 0 ? 0 : 3 ];

          data.datasets[ x ].data.push( formatValue( list[ i ][ x ].qNum, round ) );
        }
      }
    }
    return data;
  }

  function render( $element, layout, options ) {
    var
      ctx = externals.utils.prepChartArea( $element, layout ),
      round = layout.props.chartRound,
      o = externals.utils.prepOptions( options ),
      data = prepData( layout, round );

    new Chart( ctx ).Radar( data, o );
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

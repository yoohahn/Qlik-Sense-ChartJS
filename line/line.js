define( [
  'jquery',
  './props',
  './external/load-externals'
], function ( $, props, externals ) {
  'use strict';

  //Prepare the data to the format that Chart.JS wan't it.
  function getDefaultDataSet() {
    //TODO: Remove static colors and calculate them instead.
    return {
      label: "",
      fillColor: "rgba(220,220,220,0.2)",
      strokeColor: "rgba(220,220,220,1)",
      pointColor: "rgba(220,220,220,1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
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
        qMatrix = layout.qHyperCube.qDataPages[ 0 ].qMatrix,
        len = qMatrix.length,
        color,
        highlight,
        list = externals.utils.sortSimple( qMatrix, 'qNum', true, true );

      data.labels = [];
      data.datasets = [ getDefaultDataSet(), getDefaultDataSet() ];

      for ( i = 0; i < len; i++ ) {
        data.labels.push( list[ i ][ 0 ].qText );

        data.datasets[ 0 ].label = externals.utils.getMeasureTitle( layout, 0 );
        data.datasets[ 1 ].label = externals.utils.getMeasureTitle( layout, 1 );

        //TODO: Fix this so we can have more than 2 measures
        data.datasets[ 1 ].fillColor = "rgba(151,187,205,0.2)";
        data.datasets[ 1 ].strokeColor = "rgba(151,187,205,1)";
        data.datasets[ 1 ].pointColor = "rgba(151,187,205,1)";
        data.datasets[ 1 ].pointStrokeColor = "#fff";
        data.datasets[ 1 ].pointHighlightFill = "#fff";
        data.datasets[ 1 ].pointHighlightStroke = "rgba(151,187,205,1)";

        data.datasets[ 0 ].data.push( formatValue( list[ i ][ 1 ].qNum, round ) );
        data.datasets[ 1 ].data.push( formatValue( list[ i ][ 2 ].qNum, round ) );
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

    new Chart( ctx ).Line( data, o );
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

define( [
  'jquery',
  './props',
  './init-props',
  './chart-util',
  './Chart'
], function ( $, props, initProp, cu, Chart ) {
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

  function prepData( layout ) {
    var data = [];

    //
    if ( layout.qHyperCube && layout.qHyperCube.qDataPages[ 0 ].qMatrix ) {
      var
        i,
        qMatrix = layout.qHyperCube.qDataPages[ 0 ].qMatrix,
        len = qMatrix.length,
        color,
        highlight,
        list = cu.sortSimple( qMatrix, 'qNum', true, true );

      data.labels = [];
      data.datasets = [ getDefaultDataSet(), getDefaultDataSet() ];

      for ( i = 0; i < len; i++ ) {
        data.labels.push( list[ i ][ 0 ].qText );

        data.datasets[ 0 ].label = cu.getMeasureTitle( layout, 0 );
        data.datasets[ 1 ].label = cu.getMeasureTitle( layout, 1 );

        //TODO: Fix this so we can have more than 2 measures
        data.datasets[ 1 ].fillColor = "rgba(151,187,205,0.2)";
        data.datasets[ 1 ].strokeColor = "rgba(151,187,205,1)";
        data.datasets[ 1 ].pointColor = "rgba(151,187,205,1)";
        data.datasets[ 1 ].pointStrokeColor = "#fff";
        data.datasets[ 1 ].pointHighlightFill = "#fff";
        data.datasets[ 1 ].pointHighlightStroke = "rgba(151,187,205,1)";

        data.datasets[ 0 ].data.push( parseInt( list[ i ][ 1 ].qNum, 10 ) );
        data.datasets[ 1 ].data.push( parseInt( list[ i ][ 2 ].qNum, 10 ) );
      }
    }
    return data;
  }

  function render( $element, layout, options ) {
    var
      ctx = cu.prepChartArea( $element, layout ),
      o = cu.prepOptions( options ),
      data = prepData( layout );
    new Chart( ctx ).Radar( data, o );
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

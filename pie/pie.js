define( [
  'jquery',
  './props',
  './Chart'
], function ( $, props, Chart ) {
  'use strict';

  var initProp = {
    qHyperCubeDef: {
      qDimensions: [],
      qMeasures: [],

      qInitialDataFetch: [ {
        qWidth: 3,
        qHeight: 100
      } ]
    }
  };

  function getRowData( row, hue ) {
    var rowData = {};

    rowData.label = row[ 0 ].qText;
    rowData.value = row[ 1 ].qNum;
    rowData.color = 'hsl(' + hue + ', 50%, 40%)';
    rowData.highlight = 'hsl(' + hue + ', 50%, 30%)';

    return rowData;
  }
  //Prepare the data to the format that Chart.JS wan't it.
  function prepData( layout ) {
    var data = [];

    if ( layout.qHyperCube && layout.qHyperCube.qDataPages[ 0 ].qMatrix ) {
      var
        i,
        qMatrix = layout.qHyperCube.qDataPages[ 0 ].qMatrix,
        len = qMatrix.length;

      for ( i = 0; i < len; i++ ) {
        data.push( getRowData( qMatrix[ i ], ( 360 * i / len ) ) );
      }
    }

    //Dummy data to se if the chart works
    return data.sort( function ( a, b ) {
      return a.value < b.value;
    } );
  }

  function setDefaultOptions() {
    return {
      animation: true,
      responsive: true
    };
  }

  function render( $element, layout, options ) {
    var
      id = 'chartjs_' + layout.qInfo.qId,
      canvas = document.createElement( 'canvas' ),
      canvasJq,
      ctx,
      thatChart,
      isHomerChart = layout.props.chartDoughnut,
      data,
      o;

    o = setDefaultOptions();
    for ( var key in options ) {
      o[ key ] = options[ key ];
    }
    //Prep the canvas
    canvas.id = id;
    canvas.width = $element.width();
    canvas.height = $element.height();

    //Get the canvas and get the ctx.
    canvasJq = $( canvas ).appendTo( $element.empty() );
    ctx = canvasJq.get( 0 ).getContext( "2d" );

    data = prepData( layout );
    thatChart = new Chart( ctx )[ isHomerChart ? 'Doughnut' : 'Pie' ]( data, o );
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

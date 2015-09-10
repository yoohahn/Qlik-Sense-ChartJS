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

  function setDefaultOptions() {
    return {
      animation: false,
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
      data;
    //Prep the canvas
    canvas.id = id;
    canvas.width = $element.width();
    canvas.height = $element.height();

    //Get the canvas and get the ctx.
    canvasJq = $( canvas ).appendTo( $element.empty() );
    ctx = canvasJq.get( 0 ).getContext( "2d" );

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

    thatChart = new Chart( ctx ).PolarArea( data, setDefaultOptions() );
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

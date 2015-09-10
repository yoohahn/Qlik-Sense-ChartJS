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

    data = {
      labels: [ "January", "February", "March", "April", "May", "June", "July" ],
      datasets: [ {
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [ 65, 59, 80, 81, 56, 55, 40 ]
      }, {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [ 28, 48, 40, 19, 86, 27, 90 ]
      } ]
    };

    thatChart = new Chart( ctx ).Radar( data, setDefaultOptions() );
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

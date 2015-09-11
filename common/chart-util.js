define( [
  'jquery',
  './colorbrew'
], function ( $, colorbrew ) {
  'use strict';
  var defaultOptions = {
    animation: true,
    responsive: true
  };

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

  return {
    convertHexToRgba: function ( hex, opacity ) {
      var r, g, b;
      hex = hex.replace( '#', '' );
      r = parseInt( hex.substring( 0, 2 ), 16 );
      g = parseInt( hex.substring( 2, 4 ), 16 );
      b = parseInt( hex.substring( 4, 6 ), 16 );

      return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    },
    getMeasureTitle: function ( layout, index ) {
      var o = layout.qHyperCube.qMeasureInfo[ index ] || {};
      return o.qFallbackTitle || "";
    },
    generateHls: function ( i, len, highlight ) {
      return 'hsl(' + ( 360 * i / len ) + ', 60%, ' + ( highlight ? '55' : '65' ) + '%)';
    },
    sortSimple: function ( list, name, revers, multiMeasure ) {
      list = list.sort( function ( a, b ) {
        var sortA = a[ name ],
          sortB = b[ name ];
        if ( multiMeasure ) {
          sortA = a[ 0 ][ name ];
          sortB = b[ 0 ][ name ];
        }
        return sortA - sortB;
      } );

      if ( revers ) {
        list.reverse();
      }
      return list;
    },
    prepOneMeasureChart: function prepData( layout, round ) {
      var
        data = [],
        self = this;

      if ( layout.qHyperCube && layout.qHyperCube.qDataPages[ 0 ].qMatrix ) {
        var
          i,
          qMatrix = layout.qHyperCube.qDataPages[ 0 ].qMatrix,
          len = qMatrix.length,
          color,
          highlight;

        for ( i = 0; i < len; i++ ) {
          var rowData = {};
          color = self.generateHls( i, len, false );
          highlight = self.generateHls( i, len, true );

          rowData.label = qMatrix[ i ][ 0 ].qText;
          rowData.value = formatValue( qMatrix[ i ][ 1 ].qNum, round );
          rowData.color = color;
          rowData.highlight = highlight;

          data.push( rowData );
        }
      }

      return self.sortSimple( data, 'value', true );
    },
    prepMultiMeasureCharts: function prepData( layout, round ) {
      var data = [];

      if ( layout.qHyperCube && layout.qHyperCube.qDataPages[ 0 ].qMatrix ) {
        var
          i,
          x,
          color,
          highlight,
          self = this,
          pointStroke = "#fff",
          qMatrix = layout.qHyperCube.qDataPages[ 0 ].qMatrix,
          len = qMatrix.length,
          dataSetLen = qMatrix[ 0 ].length - 1,
          list = self.sortSimple( qMatrix, 'qNum', true, true );

        data.labels = [];
        data.datasets = [];

        //Create the ammount of dataSetList we need
        for ( x = 0; x < dataSetLen; x++ ) {
          data.datasets.push( getDefaultDataSet() );
        }

        for ( i = 0; i < len; i++ ) {
          data.labels.push( list[ i ][ 0 ].qText );

          for ( x = 0; x < dataSetLen; x++ ) {
            var
              fill = self.convertHexToRgba( colorbrew.PuOr[ 5 ][ x === 0 ? 1 : 4 ], 20 ),
              stroke = self.convertHexToRgba( colorbrew.PuOr[ 5 ][ x === 0 ? 0 : 3 ], 50 );

            data.datasets[ x ].label = self.getMeasureTitle( layout, x );

            data.datasets[ x ].fillColor = fill;
            data.datasets[ x ].strokeColor = stroke;
            data.datasets[ x ].pointColor = stroke;
            data.datasets[ x ].pointStrokeColor = pointStroke;
            data.datasets[ x ].pointHighlightFill = pointStroke;
            data.datasets[ x ].pointHighlightStroke = stroke;

            data.datasets[ x ].data.push( formatValue( list[ i ][ x + 1 ].qNum, round ) );
          }
        }
      }
      return data;
    },
    generateCanvasAndCtx: function ( $element, layout ) {
      var
        id = 'chartjs_' + layout.qInfo.qId,
        canvas = document.createElement( 'canvas' ),
        canvasJq,
        ctx;

      canvas.id = id;
      canvas.width = $element.width();
      canvas.height = $element.height();

      canvasJq = $( canvas ).appendTo( $element.empty() );
      ctx = canvasJq.get( 0 ).getContext( "2d" );

      return ctx;
    },
    prepOptions: function ( thatOptions ) {
      var
        key,
        newOptions = {};

      for ( key in defaultOptions ) {
        newOptions[ key ] = defaultOptions[ key ];
      }
      for ( key in thatOptions ) {
        newOptions[ key ] = thatOptions[ key ];
      }

      return newOptions;
    }
  };
} );

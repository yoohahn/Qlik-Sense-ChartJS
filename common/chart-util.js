define( [
  'jquery'
], function ( $ ) {
  'use strict';
  var defaultOptions = {
    animation: true,
    responsive: true
  };
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
    prepChartArea: function ( $element, layout ) {
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

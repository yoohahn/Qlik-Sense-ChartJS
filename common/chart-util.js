define( [
  'jquery'
], function ( $ ) {
  'use strict';
  var defaultOptions = {
    animation: true,
    responsive: true
  };
  return {
    generateHls: function ( i, len, highlight ) {
      return 'hsl(' + ( 360 * i / len ) + ', 50%, ' + ( highlight ? '50' : '40' ) + '%)';
    },
    getRowDataSimple: function ( row, color, highlight ) {
      var rowData = {};

      rowData.label = row[ 0 ].qText;
      rowData.value = row[ 1 ].qNum;
      rowData.color = color;
      rowData.highlight = highlight;

      return rowData;
    },
    sortSimple: function ( list, name, revers ) {
      list = list.sort( function ( a, b ) {
        return a[ name ] - b[ name ];
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

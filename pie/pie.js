define( [

], function (  ) {
  'use strict';

  //Render the chart
  function render( $element, layout, options ) {
    console.log(1)
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

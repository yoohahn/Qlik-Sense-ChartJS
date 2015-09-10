define( [
  './Chart',
  './init-props',
  './chart-util'
], function ( Chart, initProps, utils ) {
  'use strict';

  return {
    Chart: Chart,
    initProp: initProp,
    utils: utils
  };
} );

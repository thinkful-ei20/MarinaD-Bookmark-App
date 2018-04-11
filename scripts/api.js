/* global $ */
'use strict';

const API = (function() {
  const test = () => {
    console.log('Api IFFE statement ran!');
  };

  return {
    test
  };  
}());
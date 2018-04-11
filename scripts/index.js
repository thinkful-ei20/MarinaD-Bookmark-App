/* global $ cuid*/
'use strict';

const main = () => {
  console.log('scripts and jquery linked up correctly!');
  console.log('CUID test: ' + cuid());
};

$(main);
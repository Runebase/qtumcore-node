'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export runebasecore-lib', function() {
    var runebasecore = require('../');
    should.exist(runebasecore.lib);
    should.exist(runebasecore.lib.Transaction);
    should.exist(runebasecore.lib.Block);
  });
});

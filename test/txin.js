var should = require('chai').should();
var Script = require('../lib/script');
var Txin = require('../lib/txin');
var Varint = require('../lib/varint');
var BufR = require('../lib/bufr');

describe('Txin', function() {
  
  var txidbuf = new Buffer(32);
  txidbuf.fill(0);
  var txoutnum = 0;
  var script = Script().fromString("OP_CHECKMULTISIG");
  var scriptvi = Varint(script.toBuffer().length);
  var seqnum = 0;
  var txin = Txin().set({
    txidbuf: txidbuf,
    txoutnum: txoutnum,
    scriptvi: scriptvi,
    script: script,
    seqnum: seqnum
  });

  it('should make a new txin', function() {
    var txin = new Txin();
    should.exist(txin);
    txin = Txin();
    should.exist(txin);
    var txidbuf = new Buffer(32);
    txidbuf.fill(0);
    Txin(txidbuf, 0).txidbuf.length.should.equal(32);
    (function() {
      var txidbuf2 = new Buffer(33);
      txidbuf2.fill(0);
      Txin(txidbuf2, 0);
    }).should.throw('txidbuf must be 32 bytes');
  });

  it('should calculate scriptvi correctly when creating a new txin', function() {
    Txin(txin.txidbuf, txin.txoutnum, txin.script, txin.seqnum).scriptvi.toNumber().should.equal(1);
  });

  describe('#set', function() {
    
    it('should set these vars', function() {
      var txin = Txin().set({
        txidbuf: txidbuf,
        txoutnum: txoutnum,
        scriptvi: scriptvi,
        script: script,
        seqnum: seqnum
      });
      should.exist(txin.txidbuf);
      should.exist(txin.txoutnum);
      should.exist(txin.scriptvi);
      should.exist(txin.script);
      should.exist(txin.seqnum);
    });

  });

  describe('#setScript', function() {
    
    it('should calculate the varint size correctly', function() {
      var txin2 = Txin(txin);
      txin2.setScript(Script('OP_RETURN OP_RETURN OP_RETURN')).scriptvi.toNumber().should.equal(3);
    });

  });

  describe('#fromJSON', function() {
    
    it('should set these vars', function() {
      var txin2 = Txin().fromJSON(txin.toJSON());
      should.exist(txin2.txidbuf);
      should.exist(txin2.txoutnum);
      should.exist(txin2.scriptvi);
      should.exist(txin2.script);
      should.exist(txin2.seqnum);
    });

  });

  describe('#toJSON', function() {
    
    it('should set these vars', function() {
      var json = txin.toJSON()
      should.exist(json.txidbuf);
      should.exist(json.txoutnum);
      should.exist(json.scriptvi);
      should.exist(json.script);
      should.exist(json.seqnum);
    });

  });

  describe('#fromBuffer', function() {
    
    it('should convert this known buffer', function() {
      var hex = '00000000000000000000000000000000000000000000000000000000000000000000000001ae00000000';
      var buf = new Buffer(hex, 'hex');
      var txin = Txin().fromBuffer(buf);
      txin.scriptvi.toNumber().should.equal(1);
      txin.script.toString().should.equal('OP_CHECKMULTISIG');
    });

  });

  describe('#fromBufR', function() {
    
    it('should convert this known buffer', function() {
      var hex = '00000000000000000000000000000000000000000000000000000000000000000000000001ae00000000';
      var buf = new Buffer(hex, 'hex');
      var br = BufR(buf);
      var txin = Txin().fromBufR(br);
      txin.scriptvi.toNumber().should.equal(1);
      txin.script.toString().should.equal('OP_CHECKMULTISIG');
    });

  });

  describe('#toBuffer', function() {
    
    it('should convert this known buffer', function() {
      txin.toBuffer().toString('hex').should.equal('00000000000000000000000000000000000000000000000000000000000000000000000001ae00000000');
    });

  });

  describe('#toBufW', function() {
    
    it('should convert this known buffer', function() {
      txin.toBufW().concat().toString('hex').should.equal('00000000000000000000000000000000000000000000000000000000000000000000000001ae00000000');
    });

  });

});

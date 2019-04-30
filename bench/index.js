const Benchmark = require('benchmark');
const Readable = require('stream').Readable;

const proxyProtocol = require("proxy-protocol");
const proxyProtocolJS = require('proxy-protocol-js');

const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';

new Benchmark.Suite().add('proxy-protocol.parse', () => {
  const protocolStream = new Readable();
  protocolStream.push(protocolText);
  protocolStream.push(null);

  proxyProtocol.parse(protocolStream, (err, obj) => {
  });
})
.add('proxy-protocol-js.parse', () => {
  // Dummy procedures for fairness
  const protocolStream = new Readable();
  protocolStream.push(protocolText);
  protocolStream.push(null);

  proxyProtocolJS.V1ProxyProtocol.parse(protocolText);
})
.on('cycle', (event) => {
  console.log(String(event.target));
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({
  'async': true
});

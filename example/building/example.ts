import { Host, INETProtocol, V1ProxyProtocol } from 'proxy-protocol-js';

const src = new Host('127.0.0.1', 12345);
const dst = new Host('192.0.2.1', 54321);
const protocolText = new V1ProxyProtocol(
  INETProtocol.TCP4,
  src,
  dst,
).build();
console.log(protocolText); // => PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n


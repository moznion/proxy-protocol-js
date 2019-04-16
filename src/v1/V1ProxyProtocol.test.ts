import { Peer } from './Peer';
import { INETProtocol } from './enum/INETProtocol';
import { V1ProxyProtocol } from './V1ProxyProtocol';
import { TextEncoder } from 'util';

test('should build V1 PROXY protocol with data successfully', async () => {
  const proto = new V1ProxyProtocol(INETProtocol.TCP4, new Peer('127.0.0.1', 12345), new Peer('192.0.2.1', 54321));
  expect(proto.build()).toBe('PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n');
});

test('should build V1 PROXY protocol without data successfully', async () => {
  const proto = new V1ProxyProtocol(INETProtocol.TCP4, new Peer('127.0.0.1', 12345), new Peer('192.0.2.1', 54321));
  expect(proto.build()).toBe('PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n');
});

test('should parse V1 PROXY protocol with data successfully', async () => {
  const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const input = `${protocolText}HTTP/1.0 200 OK\r\n\r\nhello, world`;
  const expected = new V1ProxyProtocol(INETProtocol.TCP4, new Peer('127.0.0.1', 12345), new Peer('192.0.2.1', 54321));
  expect(V1ProxyProtocol.parse(input)).toEqual(expected);
  expect(expected.build()).toBe(protocolText);
});

test('should parse V1 PROXY protocol with data as byte array successfully', async () => {
  const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const input = `${protocolText}HTTP/1.0 200 OK\r\n\r\nhello, world`;
  const expected = new V1ProxyProtocol(INETProtocol.TCP4, new Peer('127.0.0.1', 12345), new Peer('192.0.2.1', 54321));
  expect(V1ProxyProtocol.parse(new TextEncoder().encode(input))).toEqual(expected);
  // expect(expected.build()).toBe(protocolText);
});

test('should parse V1 PROXY protocol without data successfully', async () => {
  const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const expected = new V1ProxyProtocol(INETProtocol.TCP4, new Peer('127.0.0.1', 12345), new Peer('192.0.2.1', 54321));
  expect(V1ProxyProtocol.parse(protocolText)).toEqual(expected);
  expect(expected.build()).toBe(protocolText);
});

test('should parse V1 PROXY protocol without data as byte array successfully', async () => {
  const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const expected = new V1ProxyProtocol(INETProtocol.TCP4, new Peer('127.0.0.1', 12345), new Peer('192.0.2.1', 54321));
  expect(V1ProxyProtocol.parse(new TextEncoder().encode(protocolText))).toEqual(expected);
  expect(expected.build()).toBe(protocolText);
});

test('should fail to parse V1 PROXY protocol without data', async () => {
  expect(V1ProxyProtocol.parse('__INVALID__')).toBe(null);
});

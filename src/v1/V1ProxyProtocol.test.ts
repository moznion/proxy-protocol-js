import { Peer, INETProtocol, V1ProxyProtocol } from '../proxy-protocol';
import { V1ProxyProtocolParseError } from './V1ProxyProtocol';

test('should build V1 PROXY protocol with data successfully', async () => {
  const proto = new V1ProxyProtocol(
    INETProtocol.TCP4,
    new Peer('127.0.0.1', 12345),
    new Peer('192.0.2.1', 54321),
    'HTTP/1.0 200 OK\r\n\r\nhello, world',
  );
  expect(proto.build()).toBe('PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\nHTTP/1.0 200 OK\r\n\r\nhello, world');
});

test('should build V1 PROXY protocol without data successfully', async () => {
  const proto = new V1ProxyProtocol(INETProtocol.TCP4, new Peer('127.0.0.1', 12345), new Peer('192.0.2.1', 54321));
  expect(proto.build()).toBe('PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n');
});

test('should parse V1 PROXY protocol with data successfully', async () => {
  const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\nHTTP/1.0 200 OK\r\n\r\nhello, world';
  const expected = new V1ProxyProtocol(
    INETProtocol.TCP4,
    new Peer('127.0.0.1', 12345),
    new Peer('192.0.2.1', 54321),
    'HTTP/1.0 200 OK\r\n\r\nhello, world',
  );
  expect(V1ProxyProtocol.parse(protocolText)).toEqual(expected);
  expect(expected.build()).toBe(protocolText);
});

test('should parse V1 PROXY protocol without data successfully', async () => {
  const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const expected = new V1ProxyProtocol(
    INETProtocol.TCP4,
    new Peer('127.0.0.1', 12345),
    new Peer('192.0.2.1', 54321),
    '',
  );
  expect(V1ProxyProtocol.parse(protocolText)).toEqual(expected);
  expect(expected.build()).toBe(protocolText);
});

test('should fail to parse V1 PROXY protocol without data', async () => {
  expect(() => {
    V1ProxyProtocol.parse('__INVALID__');
  }).toThrowError(new V1ProxyProtocolParseError("given data isn't suitable for V1 PROXY protocols definition"));
});

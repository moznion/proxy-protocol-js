import { INETProtocol } from './enum/INETProtocol';
import { Peer } from './Peer';
import { V1BinaryProxyProtocol, V1BinaryProxyProtocolParseError } from './V1BinaryProxyProtocol';

test('shuold parse V1 PROXY protocol with data as byte array successfully', () => {
  const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\nHTTP/1.0 200 OK\r\n\r\nhello, world';
  const protocolBuf = Buffer.from(protocolText, 'utf8');
  const expected = new V1BinaryProxyProtocol(
    INETProtocol.TCP4,
    new Peer('127.0.0.1', 12345),
    new Peer('192.0.2.1', 54321),
    Buffer.from('HTTP/1.0 200 OK\r\n\r\nhello, world', 'utf8'),
  );

  expect(V1BinaryProxyProtocol.parse(protocolBuf)).toEqual(expected);
  expect(expected.build()).toEqual(protocolBuf);
});

test('should parse TCP4 V1 PROXY protocol without data as byte array successfully', () => {
  const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const protocolBuf = Buffer.from(protocolText, 'utf8');
  const expected = new V1BinaryProxyProtocol(
    INETProtocol.TCP4,
    new Peer('127.0.0.1', 12345),
    new Peer('192.0.2.1', 54321),
    new Uint8Array(),
  );
  expect(V1BinaryProxyProtocol.parse(protocolBuf)).toEqual(expected);
  expect(expected.build()).toEqual(protocolBuf);
});

test('should build V1 PROXY protocol without data as byte array successfully', () => {
  const proto = new V1BinaryProxyProtocol(
    INETProtocol.TCP4,
    new Peer('127.0.0.1', 12345),
    new Peer('192.0.2.1', 54321),
  );

  const expectedProtocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const expectedProtocolBuf = Buffer.from(expectedProtocolText, 'utf8');
  expect(proto.build()).toEqual(expectedProtocolBuf);
});

test('should parse TCP6 V1 PROXY protocol without data as byte array successfully', () => {
  const protocolText = 'PROXY TCP6 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const protocolBuf = Buffer.from(protocolText, 'utf8');
  const expected = new V1BinaryProxyProtocol(
    INETProtocol.TCP6,
    new Peer('127.0.0.1', 12345),
    new Peer('192.0.2.1', 54321),
    new Uint8Array(),
  );
  expect(V1BinaryProxyProtocol.parse(protocolBuf)).toEqual(expected);
  expect(expected.build()).toEqual(protocolBuf);
});

test('should parse UNKNOWN V1 PROXY protocol without data as byte array successfully', () => {
  const protocolText = 'PROXY UNKNOWN 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const protocolBuf = Buffer.from(protocolText, 'utf8');
  const expected = new V1BinaryProxyProtocol(
    INETProtocol.UNKNOWN,
    new Peer('127.0.0.1', 12345),
    new Peer('192.0.2.1', 54321),
    new Uint8Array(),
  );
  expect(V1BinaryProxyProtocol.parse(protocolBuf)).toEqual(expected);
  expect(expected.build()).toEqual(protocolBuf);
});

test('should raise error on parsing V1 PROXY protocol without data as byte array with invalid inet protocol', () => {
  const protocolText = 'PROXY INVALID 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const protocolBuf = Buffer.from(protocolText, 'utf8');

  expect(() => {
    V1BinaryProxyProtocol.parse(protocolBuf);
  }).toThrowError(new V1BinaryProxyProtocolParseError('unexpected INET protocol has come'));
});

test('should raise error on parsing V1 PROXY protocol as byte array when protocol signature is invalid', () => {
  const protocolText = 'INVALID TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const protocolBuf = Buffer.from(protocolText, 'utf8');

  expect(() => {
    V1BinaryProxyProtocol.parse(protocolBuf);
  }).toThrowError(new V1BinaryProxyProtocolParseError("doesn't match with protocol signature"));
});

test('should raise error on parsing V1 PROXY protocol as byte array when invalid whitespace is given', () => {
  const protocolText = 'PROXYTCP4 127.0.0.1 192.0.2.1 12345 54321\r\n';
  const protocolBuf = Buffer.from(protocolText, 'utf8');

  expect(() => {
    V1BinaryProxyProtocol.parse(protocolBuf);
  }).toThrowError(new V1BinaryProxyProtocolParseError("whitespace doesn't come"));
});

test('should raise error on parsing V1 PROXY protocol as byte array when newline character is missing', () => {
  {
    const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321 ';
    const protocolBuf = Buffer.from(protocolText, 'utf8');

    expect(() => {
      V1BinaryProxyProtocol.parse(protocolBuf);
    }).toThrowError(new V1BinaryProxyProtocolParseError("PROXY protocol isn't terminated by newline characters"));
  }
  {
    const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r ';
    const protocolBuf = Buffer.from(protocolText, 'utf8');

    expect(() => {
      V1BinaryProxyProtocol.parse(protocolBuf);
    }).toThrowError(new V1BinaryProxyProtocolParseError("PROXY protocol isn't terminated by newline characters"));
  }
});

test('should raise error on parsing V1 PROXY protocol as byte array when ip address is missing', () => {
  const protocolText = 'PROXY TCP4  192.0.2.1 12345 54321\r\n';
  const protocolBuf = Buffer.from(protocolText, 'utf8');

  expect(() => {
    V1BinaryProxyProtocol.parse(protocolBuf);
  }).toThrowError(new V1BinaryProxyProtocolParseError('address information is missing'));
});

test('should raise error on parsing V1 PROXY protocol as byte array when port is missing', () => {
  const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1  54321\r\n';
  const protocolBuf = Buffer.from(protocolText, 'utf8');

  expect(() => {
    V1BinaryProxyProtocol.parse(protocolBuf);
  }).toThrowError(new V1BinaryProxyProtocolParseError('port information is missing'));
});

test('should raise error on parsing V1 PROXY protocol as byte array when port is invalid', () => {
  const protocolText = 'PROXY TCP4 127.0.0.1 192.0.2.1 ABCDE 54321\r\n';
  const protocolBuf = Buffer.from(protocolText, 'utf8');

  expect(() => {
    V1BinaryProxyProtocol.parse(protocolBuf);
  }).toThrowError(new V1BinaryProxyProtocolParseError('invalid port information has come'));
});

test('unexpected termination', () => {
  const protocolText = 'PROXY';
  const protocolBuf = Buffer.from(protocolText, 'utf8');

  expect(() => {
    V1BinaryProxyProtocol.parse(protocolBuf);
  }).toThrowError(new V1BinaryProxyProtocolParseError('protocol payload has been terminated unexpectedly'));
});

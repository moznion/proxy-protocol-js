import { ProxyProtocolIdentifier, ProxyProtocolVersion } from './proxy-protocol';

test('is V1 protocol with string', async () => {
  expect(ProxyProtocolIdentifier.identify('PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n')).toBe(
    ProxyProtocolVersion.V1,
  );
});

test('is V1 protocol with binary', async () => {
  expect(ProxyProtocolIdentifier.identify(Buffer.from('PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n', 'utf8'))).toBe(
    ProxyProtocolVersion.V1,
  );
});

test('is V2 protocol', async () => {
  const bin = new Uint8Array([
    13, //  <= start of the protocol signature
    10, //  ^
    13, //  |
    10, //  |
    0, //   |
    13, //  |
    10, //  |
    81, //  |
    85, //  |
    73, //  |
    84, //  v
    10, //  <= end of the protocol signature
    32, //  <= version (0x20) | command (LOCAL:0x00)
    18, //  <= address-family (INET:0x10) | transport-proto (DGRAM:0x02)
    0, //   <= length of remaining (upper)
    12, //  <= length of remaining (lower)
    127, // <= start of source address
    0, //   ^
    0, //   v
    1, //   <= end of source address
    192, // <= start of destination address
    0, //   ^
    2, //   v
    1, //   <= end of destination address
    48, //  <= src port (upper)
    57, //  <= src port (lower)
    212, // <= dst port (upper)
    49, //  <= dst port (lower)
  ]);
  expect(ProxyProtocolIdentifier.identify(bin)).toBe(ProxyProtocolVersion.V2);
});

test('invalid protocol with string', async () => {
  expect(ProxyProtocolIdentifier.identify('INVALID-PROXY TCP4 127.0.0.1 192.0.2.1 12345 54321\r\n')).toBe(
    ProxyProtocolVersion.NOT,
  );
});

test('invalid protocol with binary', async () => {
  const bin = new Uint8Array([
    0, //   <= start of the protocol signature
    0, //   ^
    0, //   |
    0, //   |
    0, //   |
    0, //   |
    0, //   |
    0, //   |
    0, //   |
    0, //   |
    0, //   v
    0, //   <= end of the protocol signature
    32, //  <= version (0x20) | command (LOCAL:0x00)
    18, //  <= address-family (INET:0x10) | transport-proto (DGRAM:0x02)
    0, //   <= length of remaining (upper)
    12, //  <= length of remaining (lower)
    127, // <= start of source address
    0, //   ^
    0, //   v
    1, //   <= end of source address
    192, // <= start of destination address
    0, //   ^
    2, //   v
    1, //   <= end of destination address
    48, //  <= src port (upper)
    57, //  <= src port (lower)
    212, // <= dst port (upper)
    49, //  <= dst port (lower)
  ]);
  expect(ProxyProtocolIdentifier.identify(bin)).toBe(ProxyProtocolVersion.NOT);
});

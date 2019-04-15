import { V2ProxyProtocol } from './V2ProxyProtocol';
import { Command } from './enum/Command';
import { TransportProtocol } from './enum/TransportProtocol';
import { IPv4Address, IPv4ProxyAddress } from './proxy_address/IPv4ProxyAddress';
import { IPv6Address, IPv6ProxyAddress } from './proxy_address/IPv6ProxyAddress';
import { UnixAddress, UnixProxyAddress } from './proxy_address/UnixProxyAddress';

test('should build V2 proxy protocol with IPv4 successfully', async () => {
  const got = new V2ProxyProtocol(
    Command.LOCAL,
    TransportProtocol.DGRAM,
    new IPv4ProxyAddress(IPv4Address.createFrom([127, 0, 0, 1]), 12345, IPv4Address.createFrom([192, 0, 2, 1]), 54321),
  ).build();
  expect(got).toEqual(
    new Uint8Array([
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
    ]),
  );
});

test('should build V2 proxy protocol with IPv6 successfully', async () => {
  const got = new V2ProxyProtocol(
    Command.PROXY,
    TransportProtocol.STREAM,
    new IPv6ProxyAddress(
      IPv6Address.createFrom([
        0x20,
        0x01,
        0xdb,
        0x08,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x01,
      ]),
      20,
      IPv6Address.createFrom([
        0x20,
        0x01,
        0xdb,
        0x08,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x00,
        0x02,
      ]),
      21,
    ),
  ).build();
  expect(got).toEqual(
    new Uint8Array([
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
      33, //  <= version (0x20) | command (PROXY:0x01)
      33, //  <= address-family (INET6:0x20) | transport-proto (STREAM:0x01)
      0, //   <= length of remaining (upper)
      36, //  <= length of remaining (lower)
      32, //  <= start of source address
      1, //   ^
      219, // |
      8, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   v
      1, //   <= end of source address
      32, //  <= start of destination address
      1, //   ^
      219, // |
      8, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   |
      0, //   v
      2, //   <= end of destination address
      0, //   <= src port (upper)
      20, //  <= src port (lower)
      0, //   <= dst port (upper)
      21, //  <= dst port (lower)
    ]),
  );
});

test('should build V2 proxy protocol with UNIX address successfully', async () => {
  const srcUnixAddr: UnixAddress = (() => {
    let arr = [];
    for (let i = 0; i < 108; i++) {
      arr[i] = i;
    }
    return UnixAddress.createFrom(arr);
  })();
  const dstUnixAddr: UnixAddress = (() => {
    let arr = [];
    for (let i = 0; i < 108; i++) {
      arr[i] = 107 - i;
    }
    return UnixAddress.createFrom(arr);
  })();

  const got = new V2ProxyProtocol(
    Command.LOCAL,
    TransportProtocol.DGRAM,
    new UnixProxyAddress(srcUnixAddr, dstUnixAddr),
  ).build();
  expect(got).toEqual(
    new Uint8Array([
      13, //   <= start of the protocol signature
      10, //   ^
      13, //   |
      10, //   |
      0, //    |
      13, //   |
      10, //   |
      81, //   |
      85, //   |
      73, //   |
      84, //   v
      10, //   <= end of the protocol signature
      32, //   <= version (0x20) | command (LOCAL:0x00)
      50, //   <= address-family (UNIX:0x30) | transport-proto (DGRAM:0x02)
      0, //    <= length of remaining (upper)
      216, //  <= length of remaining (lower)
      0, //    <= start of source address
      1, //    ^
      2, //    |
      3, //    |
      4, //    |
      5, //    |
      6, //    |
      7, //    |
      8, //    |
      9, //    |
      10, //   |
      11, //   |
      12, //   |
      13, //   |
      14, //   |
      15, //   |
      16, //   |
      17, //   |
      18, //   |
      19, //   |
      20, //   |
      21, //   |
      22, //   |
      23, //   |
      24, //   |
      25, //   |
      26, //   |
      27, //   |
      28, //   |
      29, //   |
      30, //   |
      31, //   |
      32, //   |
      33, //   |
      34, //   |
      35, //   |
      36, //   |
      37, //   |
      38, //   |
      39, //   |
      40, //   |
      41, //   |
      42, //   |
      43, //   |
      44, //   |
      45, //   |
      46, //   |
      47, //   |
      48, //   |
      49, //   |
      50, //   |
      51, //   |
      52, //   |
      53, //   |
      54, //   |
      55, //   |
      56, //   |
      57, //   |
      58, //   |
      59, //   |
      60, //   |
      61, //   |
      62, //   |
      63, //   |
      64, //   |
      65, //   |
      66, //   |
      67, //   |
      68, //   |
      69, //   |
      70, //   |
      71, //   |
      72, //   |
      73, //   |
      74, //   |
      75, //   |
      76, //   |
      77, //   |
      78, //   |
      79, //   |
      80, //   |
      81, //   |
      82, //   |
      83, //   |
      84, //   |
      85, //   |
      86, //   |
      87, //   |
      88, //   |
      89, //   |
      90, //   |
      91, //   |
      92, //   |
      93, //   |
      94, //   |
      95, //   |
      96, //   |
      97, //   |
      98, //   |
      99, //   |
      100, //  |
      101, //  |
      102, //  |
      103, //  |
      104, //  |
      105, //  |
      106, //  v
      107, //  <= end of source address
      107, //  <= start of destination address
      106, //  ^
      105, //  |
      104, //  |
      103, //  |
      102, //  |
      101, //  |
      100, //  |
      99, //   |
      98, //   |
      97, //   |
      96, //   |
      95, //   |
      94, //   |
      93, //   |
      92, //   |
      91, //   |
      90, //   |
      89, //   |
      88, //   |
      87, //   |
      86, //   |
      85, //   |
      84, //   |
      83, //   |
      82, //   |
      81, //   |
      80, //   |
      79, //   |
      78, //   |
      77, //   |
      76, //   |
      75, //   |
      74, //   |
      73, //   |
      72, //   |
      71, //   |
      70, //   |
      69, //   |
      68, //   |
      67, //   |
      66, //   |
      65, //   |
      64, //   |
      63, //   |
      62, //   |
      61, //   |
      60, //   |
      59, //   |
      58, //   |
      57, //   |
      56, //   |
      55, //   |
      54, //   |
      53, //   |
      52, //   |
      51, //   |
      50, //   |
      49, //   |
      48, //   |
      47, //   |
      46, //   |
      45, //   |
      44, //   |
      43, //   |
      42, //   |
      41, //   |
      40, //   |
      39, //   |
      38, //   |
      37, //   |
      36, //   |
      35, //   |
      34, //   |
      33, //   |
      32, //   |
      31, //   |
      30, //   |
      29, //   |
      28, //   |
      27, //   |
      26, //   |
      25, //   |
      24, //   |
      23, //   |
      22, //   |
      21, //   |
      20, //   |
      19, //   |
      18, //   |
      17, //   |
      16, //   |
      15, //   |
      14, //   |
      13, //   |
      12, //   |
      11, //   |
      10, //   |
      9, //    |
      8, //    |
      7, //    |
      6, //    |
      5, //    |
      4, //    |
      3, //    |
      2, //    |
      1, //    v
      0, //    <= end of destination address
    ]),
  );
});

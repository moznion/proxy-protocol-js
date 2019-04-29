import { AddressFamily, AddressFamilyType } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';

export type IPv6AddressTuple = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number // 16 numbers (uint8)
];

export class IPv6Address {
  constructor(readonly address: IPv6AddressTuple) {}

  static createFrom(address: number[]): IPv6Address {
    return new IPv6Address([
      address[0] || 0,
      address[1] || 0,
      address[2] || 0,
      address[3] || 0,
      address[4] || 0,
      address[5] || 0,
      address[6] || 0,
      address[7] || 0,
      address[8] || 0,
      address[9] || 0,
      address[10] || 0,
      address[11] || 0,
      address[12] || 0,
      address[13] || 0,
      address[14] || 0,
      address[15] || 0,
    ]);
  }

  static createWithEmptyAddress(): IPv6Address {
    return IPv6Address.createFrom([]);
  }
}

export class IPv6ProxyAddress implements ProxyAddress {
  constructor(
    readonly sourceAddress: IPv6Address,
    readonly sourcePort: number, // uint16_t
    readonly destinationAddress: IPv6Address,
    readonly destinationPort: number, // uint16_t
  ) {}

  static from(d: Uint8Array): IPv6ProxyAddress {
    return new IPv6ProxyAddress(
      new IPv6Address([
        d[0],
        d[1],
        d[2],
        d[3],
        d[4],
        d[5],
        d[6],
        d[7],
        d[8],
        d[9],
        d[10],
        d[11],
        d[12],
        d[13],
        d[14],
        d[15],
      ]),
      (d[32] << 8) + d[33],
      new IPv6Address([
        d[16],
        d[17],
        d[18],
        d[19],
        d[20],
        d[21],
        d[22],
        d[23],
        d[24],
        d[25],
        d[26],
        d[27],
        d[28],
        d[29],
        d[30],
        d[31],
      ]),
      (d[34] << 8) + d[35],
    );
  }

  // for TCP/UDP over IPv6, len = 36
  getLength(): number {
    return new AddressFamily(this.getAddressFamilyType()).getLength();
  }

  getAddressFamilyType(): AddressFamilyType {
    return AddressFamilyType.INET6;
  }
}

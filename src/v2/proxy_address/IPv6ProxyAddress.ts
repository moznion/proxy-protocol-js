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

  // for TCP/UDP over IPv6, len = 36
  getLength(): number {
    return 36;
  }
}

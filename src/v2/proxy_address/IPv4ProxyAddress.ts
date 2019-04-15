import { AddressFamily } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';

export type IPv4AddressTuple = [number, number, number, number];

export class IPv4Address {
  constructor(readonly address: IPv4AddressTuple) {}

  static createFrom(address: number[]): IPv4Address {
    return new IPv4Address([address[0] || 0, address[1] || 0, address[2] || 0, address[3] || 0]);
  }

  static createWithEmptyAddress(): IPv4Address {
    return IPv4Address.createFrom([]);
  }
}

export class IPv4ProxyAddress implements ProxyAddress {
  constructor(
    readonly sourceAddress: IPv4Address,
    readonly sourcePort: number, // uint16_t
    readonly destinationAddress: IPv4Address,
    readonly destinationPort: number, // uint16_t
  ) {}

  static from(d: Uint8Array): IPv4ProxyAddress {
    return new IPv4ProxyAddress(
      new IPv4Address([d[0], d[1], d[2], d[3]]),
      (d[8] << 8) + d[9],
      new IPv4Address([d[4], d[5], d[6], d[7]]),
      (d[10] << 8) + d[11],
    );
  }

  // for TCP/UDP over IPv4, len = 12
  getLength(): number {
    return AddressFamily.getLength(this.getAddressFamily());
  }

  getAddressFamily(): AddressFamily {
    return AddressFamily.INET;
  }
}

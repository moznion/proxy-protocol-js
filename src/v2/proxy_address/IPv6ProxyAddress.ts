import { AddressFamily, AddressFamilyType } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';

/**
 * IPv6AddressTuple is a type that represents the IPv6.
 *
 * example: [0x20, 0x01, 0xdb, 0x08, 0xff, 0xff 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
 */
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
  number, // 16 numbers (uint8)
];

/**
 * IPv6Address represents the address for IPv6.
 */
export class IPv6Address {
  public constructor(public readonly address: IPv6AddressTuple) {}

  /**
   * Factory method for IPv6Address class by an argument as a list of number.
   *
   * @param address
   */
  public static createFrom(address: number[]): IPv6Address {
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

  /**
   * Create a new IPv6Address's instance with empty address.
   */
  public static createWithEmptyAddress(): IPv6Address {
    return IPv6Address.createFrom([]);
  }
}

/**
 * IPv6ProxyAddress has responsibilities of {@link ProxyAddress} for IPv6.
 *
 * It has source address information and destination address information.
 */
export class IPv6ProxyAddress implements ProxyAddress {
  public constructor(
    public readonly sourceAddress: IPv6Address,
    public readonly sourcePort: number, // uint16_t
    public readonly destinationAddress: IPv6Address,
    public readonly destinationPort: number, // uint16_t
  ) {}

  /**
   * Factory method to construct an instance by a list of binary codes.
   *
   * @param data is a list of binary codes to construct an instance.
   */
  public static from(data: Uint8Array): IPv6ProxyAddress {
    return new IPv6ProxyAddress(
      new IPv6Address([
        data[0],
        data[1],
        data[2],
        data[3],
        data[4],
        data[5],
        data[6],
        data[7],
        data[8],
        data[9],
        data[10],
        data[11],
        data[12],
        data[13],
        data[14],
        data[15],
      ]),
      (data[32] << 8) + data[33],
      new IPv6Address([
        data[16],
        data[17],
        data[18],
        data[19],
        data[20],
        data[21],
        data[22],
        data[23],
        data[24],
        data[25],
        data[26],
        data[27],
        data[28],
        data[29],
        data[30],
        data[31],
      ]),
      (data[34] << 8) + data[35],
    );
  }

  /**
   * {@inheritdoc}
   */
  public getLength(): number {
    // for TCP/UDP over IPv6, len = 36
    return new AddressFamily(this.getAddressFamilyType()).getLength();
  }

  /**
   * {@inheritdoc}
   */
  public getAddressFamilyType(): AddressFamilyType {
    return AddressFamilyType.INET6;
  }
}

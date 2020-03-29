import { AddressFamily, AddressFamilyType } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';

/**
 * IPv4AddressTuple is a type that represents the IPv4.
 *
 * example: [192 0, 2, 10]
 */
export type IPv4AddressTuple = [number, number, number, number];

/**
 * IPv4Address represents the address for IPv4.
 */
export class IPv4Address {
  public constructor(public readonly address: IPv4AddressTuple) {}

  /**
   * Factory method for IPv4Address class by an argument as a list of number.
   *
   * @param address
   */
  public static createFrom(address: number[]): IPv4Address {
    return new IPv4Address([address[0] || 0, address[1] || 0, address[2] || 0, address[3] || 0]);
  }

  /**
   * Create a new IPv4Address's instance with empty address.
   */
  public static createWithEmptyAddress(): IPv4Address {
    return IPv4Address.createFrom([]);
  }
}

/**
 * IPv4ProxyAddress has responsibilities of {@link ProxyAddress} for IPv4.
 *
 * It has source address information and destination address information.
 */
export class IPv4ProxyAddress implements ProxyAddress {
  public constructor(
    public readonly sourceAddress: IPv4Address,
    public readonly sourcePort: number, // uint16_t
    public readonly destinationAddress: IPv4Address,
    public readonly destinationPort: number, // uint16_t
  ) {}

  /**
   * Factory method to construct an instance by a list of binary codes.
   *
   * @param data is a list of binary codes to construct an instance.
   */
  public static from(data: Uint8Array): IPv4ProxyAddress {
    return new IPv4ProxyAddress(
      new IPv4Address([data[0], data[1], data[2], data[3]]),
      (data[8] << 8) + data[9],
      new IPv4Address([data[4], data[5], data[6], data[7]]),
      (data[10] << 8) + data[11],
    );
  }

  /**
   * {@inheritdoc}
   */
  public getLength(): number {
    // for TCP/UDP over IPv4, len = 12
    return new AddressFamily(this.getAddressFamilyType()).getLength();
  }

  /**
   * {@inheritdoc}
   */
  public getAddressFamilyType(): AddressFamilyType {
    return AddressFamilyType.INET;
  }
}

import { AddressFamily, AddressFamilyType } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';

/**
 * UnixAddressTuple is a type that represents the address of UNIX domain socket.
 */
export type UnixAddressTuple = [
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
  number,
  number,
  number, // 108 numbers (uint8)
];

/**
 * UnixAddress represents the address for UNIX domain socket.
 */
export class UnixAddress {
  public constructor(public readonly address: UnixAddressTuple) {}

  /**
   * Factory method for UnixAddress class by an argument as a list of number.
   *
   * @param address
   */
  public static createFrom(address: number[]): UnixAddress {
    return new UnixAddress([
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
      address[16] || 0,
      address[17] || 0,
      address[18] || 0,
      address[19] || 0,
      address[20] || 0,
      address[21] || 0,
      address[22] || 0,
      address[23] || 0,
      address[24] || 0,
      address[25] || 0,
      address[26] || 0,
      address[27] || 0,
      address[28] || 0,
      address[29] || 0,
      address[30] || 0,
      address[31] || 0,
      address[32] || 0,
      address[33] || 0,
      address[34] || 0,
      address[35] || 0,
      address[36] || 0,
      address[37] || 0,
      address[38] || 0,
      address[39] || 0,
      address[40] || 0,
      address[41] || 0,
      address[42] || 0,
      address[43] || 0,
      address[44] || 0,
      address[45] || 0,
      address[46] || 0,
      address[47] || 0,
      address[48] || 0,
      address[49] || 0,
      address[50] || 0,
      address[51] || 0,
      address[52] || 0,
      address[53] || 0,
      address[54] || 0,
      address[55] || 0,
      address[56] || 0,
      address[57] || 0,
      address[58] || 0,
      address[59] || 0,
      address[60] || 0,
      address[61] || 0,
      address[62] || 0,
      address[63] || 0,
      address[64] || 0,
      address[65] || 0,
      address[66] || 0,
      address[67] || 0,
      address[68] || 0,
      address[69] || 0,
      address[70] || 0,
      address[71] || 0,
      address[72] || 0,
      address[73] || 0,
      address[74] || 0,
      address[75] || 0,
      address[76] || 0,
      address[77] || 0,
      address[78] || 0,
      address[79] || 0,
      address[80] || 0,
      address[81] || 0,
      address[82] || 0,
      address[83] || 0,
      address[84] || 0,
      address[85] || 0,
      address[86] || 0,
      address[87] || 0,
      address[88] || 0,
      address[89] || 0,
      address[90] || 0,
      address[91] || 0,
      address[92] || 0,
      address[93] || 0,
      address[94] || 0,
      address[95] || 0,
      address[96] || 0,
      address[97] || 0,
      address[98] || 0,
      address[99] || 0,
      address[100] || 0,
      address[101] || 0,
      address[102] || 0,
      address[103] || 0,
      address[104] || 0,
      address[105] || 0,
      address[106] || 0,
      address[107] || 0,
    ]);
  }

  /**
   * Create a new UnixAddress's instance with empty address.
   */
  public static createWithEmptyAddress(): UnixAddress {
    return UnixAddress.createFrom([]);
  }
}

/**
 * UnixProxyAddress has responsibilities of {@link ProxyAddress} for UNIX domain socket address.
 *
 * It has source address information and destination address information.
 */
export class UnixProxyAddress implements ProxyAddress {
  public constructor(public readonly sourceAddress: UnixAddress, public readonly destinationAddress: UnixAddress) {}

  /**
   * Factory method to construct an instance by a list of binary codes.
   *
   * @param data is a list of binary codes to construct an instance.
   */
  public static from(data: Uint8Array): UnixProxyAddress {
    const srcAddr = UnixAddress.createWithEmptyAddress();
    for (let i = 0; i < 108; i++) {
      srcAddr.address[i] = data[i];
    }

    const dstAddr = UnixAddress.createWithEmptyAddress();
    for (let i = 0; i < 108; i++) {
      dstAddr.address[i] = data[i + 108];
    }

    return new UnixProxyAddress(srcAddr, dstAddr);
  }

  /**
   * {@inheritdoc}
   */
  public getLength(): number {
    // for AF_UNIX sockets, len = 216
    return new AddressFamily(this.getAddressFamilyType()).getLength();
  }

  /**
   * {@inheritdoc}
   */
  public getAddressFamilyType(): AddressFamilyType {
    return AddressFamilyType.UNIX;
  }
}

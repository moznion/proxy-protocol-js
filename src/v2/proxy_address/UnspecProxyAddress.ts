import { AddressFamily, AddressFamilyType } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';

/**
 * UnspecProxyAddress (i.e. unspecified proxy address) a class that does nothing.
 */
export class UnspecProxyAddress implements ProxyAddress {
  constructor() {}

  /**
   * Creates an instance of UnspecProxyAddress. It does not depends on the given argument.
   *
   * @param data
   */
  static from(data: Uint8Array): UnspecProxyAddress {
    return new UnspecProxyAddress();
  }

  /**
   * {@inheritdoc}
   */
  getLength(): number {
    return new AddressFamily(this.getAddressFamilyType()).getLength();
  }

  /**
   * {@inheritdoc}
   */
  getAddressFamilyType(): AddressFamilyType {
    return AddressFamilyType.UNSPEC;
  }
}

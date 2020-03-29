import { AddressFamily, AddressFamilyType } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';

/**
 * UnspecProxyAddress (i.e. unspecified proxy address) a class that does nothing.
 */
export class UnspecProxyAddress implements ProxyAddress {
  /**
   * Creates an instance of UnspecProxyAddress. It does not depends on the given argument.
   *
   * @param data
   */
  /* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
  public static from(data: Uint8Array): UnspecProxyAddress {
    /* eslint-enable no-unused-vars, @typescript-eslint/no-unused-vars */
    return new UnspecProxyAddress();
  }

  /**
   * {@inheritdoc}
   */
  public getLength(): number {
    return new AddressFamily(this.getAddressFamilyType()).getLength();
  }

  /**
   * {@inheritdoc}
   */
  public getAddressFamilyType(): AddressFamilyType {
    return AddressFamilyType.UNSPEC;
  }
}

import { AddressFamily, AddressFamilyType } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';

export class UnspecProxyAddress implements ProxyAddress {
  constructor() {}

  static from(d: Uint8Array): UnspecProxyAddress {
    return new UnspecProxyAddress();
  }

  getLength(): number {
    return new AddressFamily(this.getAddressFamilyType()).getLength();
  }

  getAddressFamilyType(): AddressFamilyType {
    return AddressFamilyType.UNSPEC;
  }
}

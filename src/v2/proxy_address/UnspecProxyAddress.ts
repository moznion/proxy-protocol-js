import { AddressFamily } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';

export class UnspecProxyAddress implements ProxyAddress {
  constructor() {}

  static from(d: Uint8Array): UnspecProxyAddress {
    return new UnspecProxyAddress();
  }

  getLength(): number {
    return AddressFamily.getLength(this.getAddressFamily());
  }

  getAddressFamily(): AddressFamily {
    return AddressFamily.UNSPEC;
  }
}

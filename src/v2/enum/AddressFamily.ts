import { IPv4ProxyAddress } from '../proxy_address/IPv4ProxyAddress';
import { IPv6ProxyAddress } from '../proxy_address/IPv6ProxyAddress';
import { UnixProxyAddress } from '../proxy_address/UnixProxyAddress';
import { UnspecProxyAddress } from '../proxy_address/UnspecProxyAddress';

export enum AddressFamilyType {
  UNSPEC = 0x00,
  INET = 0x10,
  INET6 = 0x20,
  UNIX = 0x30,
}

export class AddressFamily {
  constructor(private readonly addressFamilyType: AddressFamilyType) {}

  getLength() {
    switch (this.addressFamilyType) {
      case AddressFamilyType.INET:
        return 12;
      case AddressFamilyType.INET6:
        return 36;
      case AddressFamilyType.UNIX:
        return 216;
      default:
        return 0;
    }
  }

  getFactoryMethod(): (d: Uint8Array) => IPv4ProxyAddress | IPv6ProxyAddress | UnixProxyAddress | UnspecProxyAddress {
    switch (this.addressFamilyType) {
      case AddressFamilyType.INET:
        return IPv4ProxyAddress.from;
      case AddressFamilyType.INET6:
        return IPv6ProxyAddress.from;
      case AddressFamilyType.UNIX:
        return UnixProxyAddress.from;
      default:
        return UnspecProxyAddress.from;
    }
  }
}

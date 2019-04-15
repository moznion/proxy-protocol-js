import { IPv4ProxyAddress } from '../proxy_address/IPv4ProxyAddress';
import { IPv6ProxyAddress } from '../proxy_address/IPv6ProxyAddress';
import { UnixProxyAddress } from '../proxy_address/UnixProxyAddress';
import { UnspecProxyAddress } from '../proxy_address/UnspecProxyAddress';

enum AddressFamily {
  UNSPEC = 0x00,
  INET = 0x10,
  INET6 = 0x20,
  UNIX = 0x30,
}

namespace AddressFamily {
  export function getLength(addressFamily: AddressFamily) {
    switch (addressFamily) {
      case AddressFamily.INET:
        return 12;
      case AddressFamily.INET6:
        return 36;
      case AddressFamily.UNIX:
        return 216;
      default:
        return 0;
    }
  }

  export function getFactoryMethod(
    addressFamily: AddressFamily,
  ): (d: Uint8Array) => IPv4ProxyAddress | IPv6ProxyAddress | UnixProxyAddress | UnspecProxyAddress {
    switch (addressFamily) {
      case AddressFamily.INET:
        return IPv4ProxyAddress.from;
      case AddressFamily.INET6:
        return IPv6ProxyAddress.from;
      case AddressFamily.UNIX:
        return UnixProxyAddress.from;
      default:
        return UnspecProxyAddress.from;
    }
  }
}

export { AddressFamily };

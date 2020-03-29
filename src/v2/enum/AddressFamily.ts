import { IPv4ProxyAddress } from '../proxy_address/IPv4ProxyAddress';
import { IPv6ProxyAddress } from '../proxy_address/IPv6ProxyAddress';
import { UnixProxyAddress } from '../proxy_address/UnixProxyAddress';
import { UnspecProxyAddress } from '../proxy_address/UnspecProxyAddress';

/**
 * AddressFamilyType represents the types of address families of PROXY protocol V2.
 *
 * > - 0x0 : AF_UNSPEC : the connection is forwarded for an unknown, unspecified
 * >   or unsupported protocol. The sender should use this family when sending
 * >   LOCAL commands or when dealing with unsupported protocol families. The
 * >   receiver is free to accept the connection anyway and use the real endpoint
 * >   addresses or to reject it. The receiver should ignore address information.
 * >
 * > - 0x1 : AF_INET : the forwarded connection uses the AF_INET address family
 * >   (IPv4). The addresses are exactly 4 bytes each in network byte order,
 * >   followed by transport protocol information (typically ports).
 * >
 * > - 0x2 : AF_INET6 : the forwarded connection uses the AF_INET6 address family
 * >   (IPv6). The addresses are exactly 16 bytes each in network byte order,
 * >   followed by transport protocol information (typically ports).
 * >
 * > - 0x3 : AF_UNIX : the forwarded connection uses the AF_UNIX address family
 * >   (UNIX). The addresses are exactly 108 bytes each.
 * >
 * > - other values are unspecified and must not be emitted in version 2 of this
 * >   protocol and must be rejected as invalid by receivers.
 *
 * From
 * http://www.haproxy.org/download/1.8/doc/proxy-protocol.txt
 */
export enum AddressFamilyType {
  UNSPEC = 0x00,
  INET = 0x10,
  INET6 = 0x20,
  UNIX = 0x30,
}

/**
 * AddressFamily is a class that has companion methods for {@link AddressFamilyType}.
 */
export class AddressFamily {
  public constructor(private readonly addressFamilyType: AddressFamilyType) {}

  /**
   * Returns the length of address family's address.
   */
  public getLength(): number {
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

  /**
   * Returns factory method according to the address family.
   */
  public getFactoryMethod(): (
    d: Uint8Array,
  ) => IPv4ProxyAddress | IPv6ProxyAddress | UnixProxyAddress | UnspecProxyAddress {
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

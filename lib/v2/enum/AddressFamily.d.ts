import { IPv4ProxyAddress } from '../proxy_address/IPv4ProxyAddress';
import { IPv6ProxyAddress } from '../proxy_address/IPv6ProxyAddress';
import { UnixProxyAddress } from '../proxy_address/UnixProxyAddress';
import { UnspecProxyAddress } from '../proxy_address/UnspecProxyAddress';
declare enum AddressFamily {
    UNSPEC = 0,
    INET = 16,
    INET6 = 32,
    UNIX = 48
}
declare namespace AddressFamily {
    function getLength(addressFamily: AddressFamily): 0 | 12 | 36 | 216;
    function getFactoryMethod(addressFamily: AddressFamily): (d: Uint8Array) => IPv4ProxyAddress | IPv6ProxyAddress | UnixProxyAddress | UnspecProxyAddress;
}
export { AddressFamily };

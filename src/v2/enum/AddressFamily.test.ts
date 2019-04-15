import { AddressFamily } from './AddressFamily';
import { IPv4ProxyAddress } from '../proxy_address/IPv4ProxyAddress';
import { IPv6ProxyAddress } from '../proxy_address/IPv6ProxyAddress';
import { UnixProxyAddress } from '../proxy_address/UnixProxyAddress';
import { UnspecProxyAddress } from '../proxy_address/UnspecProxyAddress';

test('should getLength() returns exactly value for each AddressFamily', async () => {
  expect(AddressFamily.getLength(AddressFamily.INET)).toBe(12);
  expect(AddressFamily.getLength(AddressFamily.INET6)).toBe(36);
  expect(AddressFamily.getLength(AddressFamily.UNIX)).toBe(216);
  expect(AddressFamily.getLength(AddressFamily.UNSPEC)).toBe(0);
});

test('should getFactoryMethod() returns exactly value for each AddressFamily', async () => {
  expect(AddressFamily.getFactoryMethod(AddressFamily.INET)).toBe(IPv4ProxyAddress.from);
  expect(AddressFamily.getFactoryMethod(AddressFamily.INET6)).toBe(IPv6ProxyAddress.from);
  expect(AddressFamily.getFactoryMethod(AddressFamily.UNIX)).toBe(UnixProxyAddress.from);
  expect(AddressFamily.getFactoryMethod(AddressFamily.UNSPEC)).toBe(UnspecProxyAddress.from);
});

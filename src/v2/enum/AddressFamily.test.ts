import {
  AddressFamily,
  IPv4ProxyAddress,
  IPv6ProxyAddress,
  UnixProxyAddress,
  UnspecProxyAddress,
} from '../../proxy-protocol';
import { AddressFamilyType } from './AddressFamily';

test('should getLength() returns exactly value for each AddressFamily', async () => {
  expect(new AddressFamily(AddressFamilyType.INET).getLength()).toBe(12);
  expect(new AddressFamily(AddressFamilyType.INET6).getLength()).toBe(36);
  expect(new AddressFamily(AddressFamilyType.UNIX).getLength()).toBe(216);
  expect(new AddressFamily(AddressFamilyType.UNSPEC).getLength()).toBe(0);
});

test('should getFactoryMethod() returns exactly value for each AddressFamily', async () => {
  expect(new AddressFamily(AddressFamilyType.INET).getFactoryMethod()).toBe(IPv4ProxyAddress.from);
  expect(new AddressFamily(AddressFamilyType.INET6).getFactoryMethod()).toBe(IPv6ProxyAddress.from);
  expect(new AddressFamily(AddressFamilyType.UNIX).getFactoryMethod()).toBe(UnixProxyAddress.from);
  expect(new AddressFamily(AddressFamilyType.UNSPEC).getFactoryMethod()).toBe(UnspecProxyAddress.from);
});

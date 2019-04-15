import { IPv4Address } from './IPv4ProxyAddress';

test('should create IPv4Address from an array', async () => {
  expect(IPv4Address.createFrom([1, 2, 3, 4])).toEqual(new IPv4Address([1, 2, 3, 4]));
});

test('should create empty IPv4Address', async () => {
  expect(IPv4Address.createWithEmptyAddress()).toEqual(new IPv4Address([0, 0, 0, 0]));
});

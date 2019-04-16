import { IPv6Address } from '../../proxy-protocol';

test('should create IPv6Address from an array', async () => {
  expect(IPv6Address.createFrom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])).toEqual(
    new IPv6Address([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
  );
});

test('should create empty IPv6Address', async () => {
  expect(IPv6Address.createWithEmptyAddress()).toEqual(
    new IPv6Address([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
  );
});

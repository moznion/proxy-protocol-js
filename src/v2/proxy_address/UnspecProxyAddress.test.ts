import { UnspecProxyAddress } from '../../proxy-protocol';

test('should getLength() returns 0', async () => {
  const proxyAddress = UnspecProxyAddress.from(new Uint8Array(0));
  expect(proxyAddress.getLength()).toBe(0);
});

import { AddressFamilyType } from '../enum/AddressFamily';

export interface ProxyAddress {
  getLength(): number;
  getAddressFamilyType(): AddressFamilyType;
}

import { AddressFamilyType } from '../enum/AddressFamily';

/**
 * ProxyAddress owes the responsibility to return particular information according to the type of address.
 */
export interface ProxyAddress {
  /**
   * Returns the address length of address family.
   */
  getLength(): number;

  /**
   * Returns the type of address family.
   */
  getAddressFamilyType(): AddressFamilyType;
}

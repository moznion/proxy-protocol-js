import { AddressFamily } from '../enum/AddressFamily';
export interface ProxyAddress {
    getLength(): number;
    getAddressFamily(): AddressFamily;
}

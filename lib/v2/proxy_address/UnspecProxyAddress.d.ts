import { AddressFamily } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';
export declare class UnspecProxyAddress implements ProxyAddress {
    constructor();
    static from(d: Uint8Array): UnspecProxyAddress;
    getLength(): number;
    getAddressFamily(): AddressFamily;
}

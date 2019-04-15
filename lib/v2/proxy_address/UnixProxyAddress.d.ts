import { AddressFamily } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';
export declare type UnixAddressTuple = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
export declare class UnixAddress {
    readonly address: UnixAddressTuple;
    constructor(address: UnixAddressTuple);
    static createFrom(address: number[]): UnixAddress;
    static createWithEmptyAddress(): UnixAddress;
}
export declare class UnixProxyAddress implements ProxyAddress {
    readonly sourceAddress: UnixAddress;
    readonly destinationAddress: UnixAddress;
    constructor(sourceAddress: UnixAddress, destinationAddress: UnixAddress);
    static from(d: Uint8Array): UnixProxyAddress;
    getLength(): number;
    getAddressFamily(): AddressFamily;
}

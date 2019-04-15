import { AddressFamily } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';
export declare type IPv6AddressTuple = [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
export declare class IPv6Address {
    readonly address: IPv6AddressTuple;
    constructor(address: IPv6AddressTuple);
    static createFrom(address: number[]): IPv6Address;
    static createWithEmptyAddress(): IPv6Address;
}
export declare class IPv6ProxyAddress implements ProxyAddress {
    readonly sourceAddress: IPv6Address;
    readonly sourcePort: number;
    readonly destinationAddress: IPv6Address;
    readonly destinationPort: number;
    constructor(sourceAddress: IPv6Address, sourcePort: number, destinationAddress: IPv6Address, destinationPort: number);
    static from(d: Uint8Array): IPv6ProxyAddress;
    getLength(): number;
    getAddressFamily(): AddressFamily;
}

import { AddressFamily } from '../enum/AddressFamily';
import { ProxyAddress } from './ProxyAddress';
export declare type IPv4AddressTuple = [number, number, number, number];
export declare class IPv4Address {
    readonly address: IPv4AddressTuple;
    constructor(address: IPv4AddressTuple);
    static createFrom(address: number[]): IPv4Address;
    static createWithEmptyAddress(): IPv4Address;
}
export declare class IPv4ProxyAddress implements ProxyAddress {
    readonly sourceAddress: IPv4Address;
    readonly sourcePort: number;
    readonly destinationAddress: IPv4Address;
    readonly destinationPort: number;
    constructor(sourceAddress: IPv4Address, sourcePort: number, destinationAddress: IPv4Address, destinationPort: number);
    static from(d: Uint8Array): IPv4ProxyAddress;
    getLength(): number;
    getAddressFamily(): AddressFamily;
}

import { AddressFamily } from './enum/AddressFamily';
import { Command } from './enum/Command';
import { TransportProtocol } from './enum/TransportProtocol';
import { IPv4ProxyAddress } from './proxy_address/IPv4ProxyAddress';
import { IPv6ProxyAddress } from './proxy_address/IPv6ProxyAddress';
import { UnixProxyAddress } from './proxy_address/UnixProxyAddress';
import { UnspecProxyAddress } from './proxy_address/UnspecProxyAddress';
export declare class V2ProxyProtocolParseError implements Error {
    readonly message: string;
    readonly name: string;
    constructor(message: string);
}
export declare class V2ProxyProtocol {
    readonly command: Command;
    readonly transportProtocol: TransportProtocol;
    readonly proxyAddress: IPv4ProxyAddress | IPv6ProxyAddress | UnixProxyAddress | UnspecProxyAddress;
    private static readonly protocolSignature;
    private static readonly protocolSignatureLength;
    private static readonly protocolMetaLength;
    private static readonly protocolVersion;
    private static readonly initialHeaderOffset;
    readonly addressFamily: AddressFamily;
    constructor(command: Command, transportProtocol: TransportProtocol, proxyAddress: IPv4ProxyAddress | IPv6ProxyAddress | UnixProxyAddress | UnspecProxyAddress);
    build(): Uint8Array;
    static parse(data: Uint8Array): V2ProxyProtocol;
    private initHeader;
    private unionProtocolVersionAndCommand;
    private unionAddressFamilyAndTransportProtocol;
    private static separate32bitTo16bitPair;
    private static separate8bit;
    static isValidProtocolSignature(given: Uint8Array): boolean;
}

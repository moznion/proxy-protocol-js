import { INETProtocol } from './enum/INETProtocol';
import { Peer } from './Peer';
export declare class V1ProxyProtocol {
    readonly inetProtocol: INETProtocol;
    readonly source: Peer;
    readonly destination: Peer;
    readonly data?: string | undefined;
    private static readonly protocolSignature;
    private static readonly v1ProxyProtocolRegexp;
    constructor(inetProtocol: INETProtocol, source: Peer, destination: Peer, data?: string | undefined);
    build(): string;
    static parse(input: string | Uint8Array): V1ProxyProtocol | null;
    static isValidProtocolSignature(input: string | Uint8Array): boolean;
    private static normalizeToString;
}

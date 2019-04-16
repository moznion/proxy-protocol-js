import { INETProtocol } from './enum/INETProtocol';
import { Peer } from './Peer';
export declare class V1ProxyProtocol {
    readonly inetProtocol: INETProtocol;
    readonly source: Peer;
    readonly destination: Peer;
    private static readonly v1ProxyProtocolRegexp;
    constructor(inetProtocol: INETProtocol, source: Peer, destination: Peer);
    build(): string;
    static parse(input: string | Uint8Array): V1ProxyProtocol | null;
}

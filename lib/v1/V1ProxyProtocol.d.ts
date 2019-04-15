import { INETProtocol } from './enum/INETProtocol';
import { Peer } from './Peer';
export declare class V1ProxyProtocol {
    readonly inetProtocol: INETProtocol;
    readonly source: Peer;
    readonly destination: Peer;
    readonly data?: string | undefined;
    private static readonly v1ProxyProtocolRegexp;
    constructor(inetProtocol: INETProtocol, source: Peer, destination: Peer, data?: string | undefined);
    build(): string;
    static parse(text: string): V1ProxyProtocol | null;
}

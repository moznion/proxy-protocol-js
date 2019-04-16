import { ProxyProtocolVersion } from './ProxyProtocolVersion';
export declare class ProxyProtocolIdentifier {
    static identify(data: string | Uint8Array): ProxyProtocolVersion;
}

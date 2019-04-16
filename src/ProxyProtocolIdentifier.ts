import { ProxyProtocolVersion } from './ProxyProtocolVersion';
import { V1ProxyProtocol } from './v1/V1ProxyProtocol';
import { V2ProxyProtocol } from './v2/V2ProxyProtocol';

export class ProxyProtocolIdentifier {
  static identify(data: string | Uint8Array): ProxyProtocolVersion {
    if (V1ProxyProtocol.isValidProtocolSignature(data)) {
      return ProxyProtocolVersion.V1;
    }

    if (typeof data === 'string' || !V2ProxyProtocol.isValidProtocolSignature(data)) {
      return ProxyProtocolVersion.NOT;
    }

    return ProxyProtocolVersion.V2;
  }
}

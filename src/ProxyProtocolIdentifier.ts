import { ProxyProtocolVersion } from './ProxyProtocolVersion';
import { V1BinaryProxyProtocol } from './v1/V1BinaryProxyProtocol';
import { V1ProxyProtocol } from './v1/V1ProxyProtocol';
import { V2ProxyProtocol } from './v2/V2ProxyProtocol';

/**
 * ProxyProtocolIdentifier has a method to identify the version of the PROY protocol.
 */
export class ProxyProtocolIdentifier {
  /**
   * Identifies the version of the PROXY protocol according to the input.
   *
   * @param data is a string or list of binary, it expects the input is a PROXY protocol payload.
   */
  static identify(data: string | Uint8Array): ProxyProtocolVersion {
    if (typeof data === 'string') {
      if (V1ProxyProtocol.isValidProtocolSignature(data)) {
        return ProxyProtocolVersion.V1;
      }

      return ProxyProtocolVersion.NOT;
    }

    if (V1BinaryProxyProtocol.isValidProtocolSignature(data)) {
      return ProxyProtocolVersion.V1;
    }

    if (V2ProxyProtocol.isValidProtocolSignature(data)) {
      return ProxyProtocolVersion.V2;
    }

    return ProxyProtocolVersion.NOT;
  }
}

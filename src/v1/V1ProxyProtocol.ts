import { TextDecoder } from 'util';
import { INETProtocol } from './enum/INETProtocol';
import { Peer } from './Peer';

export class V1ProxyProtocol {
  private static readonly protocolSignature = 'PROXY';
  private static readonly v1ProxyProtocolRegexp = (() => {
    const inetProtoMatcher = Object.keys(INETProtocol).join('|');
    return new RegExp(
      `^${V1ProxyProtocol.protocolSignature} (${inetProtoMatcher}) ([^ ]+) ([^ ]+) ([0-9]+) ([0-9]+)\r\n.*`,
      's',
    );
  })();

  constructor(readonly inetProtocol: INETProtocol, readonly source: Peer, readonly destination: Peer) {}

  build(): string {
    return `PROXY ${this.inetProtocol} ${this.source.ipAddress} ${this.destination.ipAddress} ${this.source.port} ${
      this.destination.port
    }\r\n`;
  }

  static parse(input: string | Uint8Array): V1ProxyProtocol | null {
    const matched = V1ProxyProtocol.v1ProxyProtocolRegexp.exec(this.normalizeToString(input));
    if (!matched) {
      return null;
    }

    return new V1ProxyProtocol(
      INETProtocol[matched[1]],
      new Peer(matched[2], Number(matched[4])),
      new Peer(matched[3], Number(matched[5])),
    );
  }

  static isValidProtocolSignature(input: string | Uint8Array): boolean {
    return V1ProxyProtocol.normalizeToString(input).startsWith(V1ProxyProtocol.protocolSignature);
  }

  private static normalizeToString(input: string | Uint8Array): string {
    if (typeof input === 'string') {
      return input;
    }
    return new TextDecoder().decode(input);
  }
}

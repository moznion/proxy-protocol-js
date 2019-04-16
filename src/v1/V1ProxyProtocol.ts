import { TextDecoder } from 'util';
import { INETProtocol } from './enum/INETProtocol';
import { Peer } from './Peer';

export class V1ProxyProtocol {
  private static readonly v1ProxyProtocolRegexp = (() => {
    const inetProtoMatcher = Object.keys(INETProtocol).join('|');
    return new RegExp(`^PROXY (${inetProtoMatcher}) ([^ ]+) ([^ ]+) ([0-9]+) ([0-9]+)\r\n(.*)`, 's');
  })();

  constructor(
    readonly inetProtocol: INETProtocol,
    readonly source: Peer,
    readonly destination: Peer,
    readonly data?: string,
  ) {}

  build(): string {
    return `PROXY ${this.inetProtocol} ${this.source.ipAddress} ${this.destination.ipAddress} ${this.source.port} ${
      this.destination.port
    }\r\n${this.data ? this.data : ''}`;
  }

  static parse(input: string | Uint8Array): V1ProxyProtocol | null {
    let text: string;
    if (typeof input === 'string') {
      text = input;
    } else {
      text = new TextDecoder().decode(input);
    }

    const matched = V1ProxyProtocol.v1ProxyProtocolRegexp.exec(text);
    if (!matched) {
      return null;
    }

    return new V1ProxyProtocol(
      INETProtocol[matched[1]],
      new Peer(matched[2], Number(matched[4])),
      new Peer(matched[3], Number(matched[5])),
      matched[6],
    );
  }
}

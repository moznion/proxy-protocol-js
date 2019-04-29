import { TextDecoder } from 'util';
import { INETProtocol } from './enum/INETProtocol';
import { Peer } from './Peer';

/**
 * V1ProxyProtocolParseError is an error class that is raised on parsing error occurs.
 */
export class V1ProxyProtocolParseError implements Error {
  readonly name: string;

  constructor(readonly message: string) {
    this.name = this.constructor.name;
  }
}

/**
 * V1ProxyProtocol is a class that has responsibilities for building and parsing PROXY protocol V1.
 */
export class V1ProxyProtocol {
  private static readonly protocolSignature = 'PROXY';
  private static readonly v1ProxyProtocolRegexp = (() => {
    const inetProtoMatcher = Object.keys(INETProtocol).join('|');
    return new RegExp(
      `^${V1ProxyProtocol.protocolSignature} (${inetProtoMatcher}) ([^ ]+) ([^ ]+) ([0-9]+) ([0-9]+)\r\n(.*)`,
      's',
    );
  })();

  /**
   * The constructor to instantiate an instance of V1ProxyProtocol class.
   *
   * @param inetProtocol
   * @param source
   * @param destination
   * @param data
   */
  constructor(
    readonly inetProtocol: INETProtocol,
    readonly source: Peer,
    readonly destination: Peer,
    readonly data?: string,
  ) {}

  /**
   * Constructs a V1 PROXY protocol header.
   *
   * If the instance has data payload, this method appends data into the after of the header.
   */
  build(): string {
    return `PROXY ${this.inetProtocol} ${this.source.ipAddress} ${this.destination.ipAddress} ${this.source.port} ${
      this.destination.port
    }\r\n${this.data ? this.data : ''}`;
  }

  /**
   * Parses a given input string as V1 PROXY protocol and returns the structure.
   *
   * If the given string is invalid, this method throws {@link V1ProxyProtocolParseError}.
   *
   * @param input
   */
  static parse(input: string | Uint8Array): V1ProxyProtocol | null {
    const matched = V1ProxyProtocol.v1ProxyProtocolRegexp.exec(this.normalizeToString(input));
    if (!matched) {
      throw new V1ProxyProtocolParseError("given data isn't suitable for V1 PROXY protocols definition");
    }

    return new V1ProxyProtocol(
      INETProtocol[matched[1]],
      new Peer(matched[2], Number(matched[4])),
      new Peer(matched[3], Number(matched[5])),
      matched[6],
    );
  }

  /**
   * Returns the whether a given input string has a valid protocol signature or not.
   *
   * @param input
   */
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

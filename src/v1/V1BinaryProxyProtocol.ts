import { TextDecoder } from 'util';
import { INETProtocol } from './enum/INETProtocol';
import { Peer } from './Peer';

/**
 * V1BiaryProxyProtocol is a class that has responsibilities for building and parsing PROXY protocol V1 as binary.
 */
export class V1BinaryProxyProtocol {
  /**
   * The constructor to instantiate an instance of V1BinaryProxyProtocol class.
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
    readonly data?: Uint8Array,
  ) {}

  /**
   * Constructs a V1 PROXY protocol header as binary.
   *
   * If the instance has data payload, this method appends data into the after of the header.
   */
  build(): Uint8Array {
    const proto = Buffer.from(
      `PROXY ${this.inetProtocol} ${this.source.ipAddress} ${this.destination.ipAddress} ${this.source.port} ${
        this.destination.port
      }\r\n`,
      'utf8',
    );
    return this.data ? Buffer.concat([proto, this.data]) : proto;
  }

  /**
   * Parses a given input string as V1 PROXY protocol and returns the structure as binary.
   *
   * If the given binary is invalid, this method throws {@link V1BinaryProxyProtocolParseError}.
   *
   * @param input
   */
  static parse(input: Uint8Array): V1BinaryProxyProtocol {
    return new V1BinaryProxyProtocolParser(input).parse();
  }

  /**
   * Returns the whether a given input string has a valid protocol signature or not.
   *
   * @param input
   */
  static isValidProtocolSignature(input: Uint8Array): boolean {
    try {
      new V1BinaryProxyProtocolParser(input).matchSignature();
    } catch (err) {
      return false;
    }

    return true;
  }
}

/**
 * V1BinaryProxyProtocolParseError is an error class that is raised on parsing error occurs.
 */
export class V1BinaryProxyProtocolParseError implements Error {
  readonly name: string;

  constructor(readonly message: string) {
    this.name = this.constructor.name;
  }
}

class V1BinaryProxyProtocolParser {
  private static readonly protocolSignature = Buffer.from('PROXY ', 'utf8');
  private static readonly whitespace = 0x20;
  private static readonly lf = 0x0a;
  private static readonly cr = 0x0d;
  private static readonly numberMap = {
    0x30: 0,
    0x31: 1,
    0x32: 2,
    0x33: 3,
    0x34: 4,
    0x35: 5,
    0x36: 6,
    0x37: 7,
    0x38: 8,
    0x39: 9,
  };

  private cursor: number;

  constructor(private readonly input: Uint8Array) {
    this.cursor = -1;
  }

  parse(): V1BinaryProxyProtocol {
    this.matchSignature();
    const inetProtocol = this.getINETProtocol();
    const srcAddr = this.getIPAddress();
    const dstAddr = this.getIPAddress();
    const srcPort = this.getSrcPort();
    const dstPort = this.getDstPort();
    const data = this.getData();

    return new V1BinaryProxyProtocol(inetProtocol, new Peer(srcAddr, srcPort), new Peer(dstAddr, dstPort), data);
  }

  matchSignature(): void {
    for (let i = 0; i < V1BinaryProxyProtocolParser.protocolSignature.length; i++) {
      if (this.next() !== V1BinaryProxyProtocolParser.protocolSignature[i]) {
        throw new V1BinaryProxyProtocolParseError("doesn't match with protocol signature");
      }
    }
  }

  private getINETProtocol(): INETProtocol {
    const inetProtocolArray: number[] = [];
    while (true) {
      const b = this.next();
      if (b === V1BinaryProxyProtocolParser.whitespace) {
        break;
      }
      inetProtocolArray.push(this.current());
    }

    switch (new TextDecoder('utf8').decode(Uint8Array.from(inetProtocolArray))) {
      case INETProtocol.TCP4:
        return INETProtocol.TCP4;
      case INETProtocol.TCP6:
        return INETProtocol.TCP6;
      case INETProtocol.UNKNOWN:
        return INETProtocol.UNKNOWN;
      default:
        throw new V1BinaryProxyProtocolParseError('unexpected INET protocol has come');
    }
  }

  private getIPAddress(): string {
    const addrArray: number[] = [];

    while (true) {
      const b = this.next();
      if (b === V1BinaryProxyProtocolParser.whitespace) {
        break;
      }
      addrArray.push(b);
    }

    if (addrArray.length <= 0) {
      throw new V1BinaryProxyProtocolParseError('address information is missing');
    }

    return new TextDecoder('utf8').decode(Uint8Array.from(addrArray));
  }

  private getPort(isTerminated: (b: number) => boolean): number {
    let i = 0;
    const portArray: number[] = [];

    while (true) {
      const b = this.next();
      if (isTerminated(b)) {
        break;
      }

      const num = V1BinaryProxyProtocolParser.numberMap[b];
      if (num === undefined) {
        throw new V1BinaryProxyProtocolParseError('invalid port information has come');
      }
      portArray[i++] = num;
    }

    if (portArray.length <= 0) {
      throw new V1BinaryProxyProtocolParseError('port information is missing');
    }

    let port = 0;
    let coef = 1;
    for (const num of portArray.reverse()) {
      port += num * coef;
      coef *= 10;
    }

    return port;
  }

  private getSrcPort(): number {
    return this.getPort(
      (b): boolean => {
        return b === V1BinaryProxyProtocolParser.whitespace;
      },
    );
  }

  private getDstPort(): number {
    return this.getPort(
      (b): boolean => {
        if (b === V1BinaryProxyProtocolParser.cr) {
          if (this.next() === V1BinaryProxyProtocolParser.lf) {
            return true;
          }
          throw new V1BinaryProxyProtocolParseError('invalid port information has come');
        }
        return false;
      },
    );
  }

  private getData(): Uint8Array {
    const data = this.input.slice(++this.cursor);
    if (data.length <= 0) {
      return new Uint8Array();
    }
    return data;
  }

  private current(): number {
    return this.input[this.cursor];
  }

  private next(): number {
    const b = this.input[++this.cursor];
    if (b === undefined) {
      throw new V1BinaryProxyProtocolParseError('protocol payload has been terminated unexpectedly');
    }
    return b;
  }
}

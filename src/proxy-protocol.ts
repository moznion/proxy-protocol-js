export enum INETProtocol {
  TCP4 = 'TCP4',
  TCP6 = 'TCP6',
  UNKNOWN = 'UNKNOWN',
}

export class Host {
  constructor(readonly ipAddress: string, readonly port: number) {}
}

export interface ProxyProtocol {
  build(): string;
}

export class V1ProxyProtocol implements ProxyProtocol {
  private static readonly v1ProxyProtocolRegexp = (() => {
    const inetProtoMatcher = Object.keys(INETProtocol).join('|');
    return new RegExp(`^PROXY (${inetProtoMatcher}) ([^ ]+) ([^ ]+) ([0-9]+) ([0-9]+)\r\n(.*)`, 's');
  })();

  constructor(
    private readonly inetProtocol: INETProtocol,
    private readonly source: Host,
    private readonly destination: Host,
    private readonly data?: string,
  ) {}

  build(): string {
    return `PROXY ${this.inetProtocol} ${this.source.ipAddress} ${this.destination.ipAddress} ${this.source.port} ${
      this.destination.port
    }\r\n${this.data ? this.data : ''}`;
  }

  static parse(text: string): V1ProxyProtocol | null {
    const matched = V1ProxyProtocol.v1ProxyProtocolRegexp.exec(text);
    if (!matched) {
      return null;
    }

    return new V1ProxyProtocol(
      INETProtocol[matched[1]],
      new Host(matched[2], Number(matched[4])),
      new Host(matched[3], Number(matched[5])),
      matched[6],
    );
  }
}

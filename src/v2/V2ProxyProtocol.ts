import { AddressFamily, AddressFamilyType } from './enum/AddressFamily';
import { Command } from './enum/Command';
import { TransportProtocol } from './enum/TransportProtocol';
import { IPv4ProxyAddress } from './proxy_address/IPv4ProxyAddress';
import { IPv6ProxyAddress } from './proxy_address/IPv6ProxyAddress';
import { UnixProxyAddress } from './proxy_address/UnixProxyAddress';
import { UnspecProxyAddress } from './proxy_address/UnspecProxyAddress';

/**
 * V2ProxyProtocolParseError is an error class that is raised on parsing error occurs.
 */
export class V2ProxyProtocolParseError implements Error {
  readonly name: string;

  constructor(readonly message: string) {
    this.name = this.constructor.name;
  }
}

/**
 * V2ProxyProtocol is a class that has responsibilities for building and parsing PROXY protocol V2.
 */
export class V2ProxyProtocol {
  private static readonly protocolSignature = new Uint8Array([
    0x0d,
    0x0a,
    0x0d,
    0x0a,
    0x00,
    0x0d,
    0x0a,
    0x51,
    0x55,
    0x49,
    0x54,
    0x0a,
  ]);
  private static readonly protocolSignatureLength = V2ProxyProtocol.protocolSignature.length;
  private static readonly protocolMetaLength = 4;
  private static readonly protocolVersion = 0x20;
  private static readonly initialHeaderOffset =
    V2ProxyProtocol.protocolSignatureLength + V2ProxyProtocol.protocolMetaLength;

  readonly addressFamilyType: AddressFamilyType;

  constructor(
    readonly command: Command,
    readonly transportProtocol: TransportProtocol,
    readonly proxyAddress: IPv4ProxyAddress | IPv6ProxyAddress | UnixProxyAddress | UnspecProxyAddress,
    readonly data?: Uint8Array,
  ) {
    this.addressFamilyType = proxyAddress.getAddressFamilyType();
  }

  /**
   * Constructs a V2 PROXY protocol header.
   *
   * If the instance has data payload, this method appends data into the after of the header.
   */
  build(): Uint8Array {
    const proto = this.initProto();
    let cursor = V2ProxyProtocol.initialHeaderOffset;

    if (this.addressFamilyType === AddressFamilyType.INET && this.proxyAddress instanceof IPv4ProxyAddress) {
      for (let i = 0; i < 4; i++) {
        proto[cursor++] = this.proxyAddress.sourceAddress.address[i];
      }

      for (let i = 0; i < 4; i++) {
        proto[cursor++] = this.proxyAddress.destinationAddress.address[i];
      }

      const srcPort = V2ProxyProtocol.separate32bitTo16bitPair(this.proxyAddress.sourcePort);
      proto[cursor++] = srcPort[0];
      proto[cursor++] = srcPort[1];

      const dstPort = V2ProxyProtocol.separate32bitTo16bitPair(this.proxyAddress.destinationPort);
      proto[cursor++] = dstPort[0];
      proto[cursor++] = dstPort[1];
    } else if (this.addressFamilyType === AddressFamilyType.INET6 && this.proxyAddress instanceof IPv6ProxyAddress) {
      for (let i = 0; i < 16; i++) {
        proto[cursor++] = this.proxyAddress.sourceAddress.address[i];
      }

      for (let i = 0; i < 16; i++) {
        proto[cursor++] = this.proxyAddress.destinationAddress.address[i];
      }

      const srcPort = V2ProxyProtocol.separate32bitTo16bitPair(this.proxyAddress.sourcePort);
      proto[cursor++] = srcPort[0];
      proto[cursor++] = srcPort[1];

      const dstPort = V2ProxyProtocol.separate32bitTo16bitPair(this.proxyAddress.destinationPort);
      proto[cursor++] = dstPort[0];
      proto[cursor++] = dstPort[1];
    } else if (this.addressFamilyType === AddressFamilyType.UNIX && this.proxyAddress instanceof UnixProxyAddress) {
      for (let i = 0; i < 108; i++) {
        proto[cursor++] = this.proxyAddress.sourceAddress.address[i];
      }

      for (let i = 0; i < 108; i++) {
        proto[cursor++] = this.proxyAddress.destinationAddress.address[i];
      }
    }

    if (this.data) {
      const dataLen = this.data.length;
      for (let i = 0; i < dataLen; i++) {
        proto[cursor++] = this.data[i];
      }
    }

    return proto;
  }

  /**
   * Parses a given input string as V2 PROXY protocol and returns the structure.
   *
   * If the given string is invalid, this method throws {@link V2ProxyProtocolParseError}.
   *
   * @param input
   */
  static parse(input: Uint8Array): V2ProxyProtocol {
    if (!this.isValidProtocolSignature(input)) {
      throw new V2ProxyProtocolParseError("given binary doesn't have v2 PROXY protocol's signature");
    }

    let cursor = this.protocolSignatureLength;

    // 13rd byte
    const versionAndCommandByte = input[cursor++];
    if (versionAndCommandByte === undefined) {
      throw new V2ProxyProtocolParseError("given binary doesn't have a byte for version and command (13rd byte)");
    }
    const versionAndCommand = this.separate8bit(versionAndCommandByte);
    if (versionAndCommand[0] !== this.protocolVersion) {
      throw new V2ProxyProtocolParseError('given protocol version is invalid');
    }
    const command = Command[Command[versionAndCommand[1]]];
    if (command === undefined) {
      throw new V2ProxyProtocolParseError('given command is invalid');
    }

    // 14th byte
    const afAndTransportProtocolByte = input[cursor++];
    if (afAndTransportProtocolByte === undefined) {
      throw new V2ProxyProtocolParseError(
        "given binary doesn't have a byte for address family and transport protocol (14th byte)",
      );
    }
    const afAndTransportProtocol = this.separate8bit(afAndTransportProtocolByte);
    const addressFamilyType = AddressFamilyType[AddressFamilyType[afAndTransportProtocol[0]]];
    if (addressFamilyType === undefined) {
      throw new V2ProxyProtocolParseError('given address family is invalid');
    }
    const transportProtocol = TransportProtocol[TransportProtocol[afAndTransportProtocol[1]]];
    if (transportProtocol === undefined) {
      throw new V2ProxyProtocolParseError('given transport protocol is invalid');
    }

    // 15th and 16th byte (length)
    const upperLengthByte = input[cursor++];
    const lowerLengthByte = input[cursor];
    if (upperLengthByte === undefined || lowerLengthByte === undefined) {
      throw new V2ProxyProtocolParseError("given binary doesn't have bytes for specifying length");
    }
    const length = (upperLengthByte << 8) + lowerLengthByte;
    const addressFamily = new AddressFamily(addressFamilyType);
    const addressFamilyLength = addressFamily.getLength();
    if (length < addressFamilyLength) {
      throw new V2ProxyProtocolParseError("given specified length is shorter than address family's length");
    }

    return new V2ProxyProtocol(
      command,
      transportProtocol,
      addressFamily.getFactoryMethod()(input.slice(16)),
      input.slice(addressFamilyLength + 16),
    );
  }

  private initProto(): Uint8Array {
    const proto = new Uint8Array(
      this.proxyAddress.getLength() +
        V2ProxyProtocol.protocolSignatureLength +
        V2ProxyProtocol.protocolMetaLength +
        (this.data ? this.data.length : 0),
    );

    let cursor = 0;
    for (let i = 0; i < V2ProxyProtocol.protocolSignatureLength; i++) {
      proto[cursor++] = V2ProxyProtocol.protocolSignature[i];
    }

    proto[cursor++] = this.unionProtocolVersionAndCommand();
    proto[cursor++] = this.unionAddressFamilyAndTransportProtocol();

    const len = V2ProxyProtocol.separate32bitTo16bitPair(this.proxyAddress.getLength());
    proto[cursor++] = len[0];
    proto[cursor] = len[1];

    return proto;
  }

  private unionProtocolVersionAndCommand(): number {
    return V2ProxyProtocol.protocolVersion | this.command;
  }

  private unionAddressFamilyAndTransportProtocol(): number {
    return this.addressFamilyType | this.transportProtocol;
  }

  private static separate32bitTo16bitPair(num: number): [number, number] {
    const masked = num & 0xff00;
    const high = num >> 8;
    const low = num - masked;
    return [high, low];
  }

  private static separate8bit(num: number): [number, number] {
    const high = num & 0xf0;
    const low = num - high;
    return [high, low];
  }

  /**
   * Returns the whether a given input string has a valid protocol signature or not.
   *
   * @param input
   */
  static isValidProtocolSignature(input: Uint8Array): boolean {
    for (let i = 0; i < V2ProxyProtocol.protocolSignatureLength; i++) {
      if (input[i] !== V2ProxyProtocol.protocolSignature[i]) {
        return false;
      }
    }
    return true;
  }
}

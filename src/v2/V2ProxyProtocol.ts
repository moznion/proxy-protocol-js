import { AddressFamily } from './enum/AddressFamily';
import { Command } from './enum/Command';
import { TransportProtocol } from './enum/TransportProtocol';
import { IPv4ProxyAddress } from './proxy_address/IPv4ProxyAddress';
import { IPv6ProxyAddress } from './proxy_address/IPv6ProxyAddress';
import { ProxyAddress } from './proxy_address/ProxyAddress';
import { UnixProxyAddress } from './proxy_address/UnixProxyAddress';

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

  readonly addressFamily: AddressFamily;

  constructor(
    readonly command: Command,
    readonly transportProtocol: TransportProtocol,
    readonly proxyAddress: ProxyAddress,
  ) {
    this.addressFamily = AddressFamily.UNSPEC;

    if (proxyAddress instanceof IPv4ProxyAddress) {
      this.addressFamily = AddressFamily.INET;
      return;
    }

    if (proxyAddress instanceof IPv6ProxyAddress) {
      this.addressFamily = AddressFamily.INET6;
      return;
    }

    if (proxyAddress instanceof UnixProxyAddress) {
      this.addressFamily = AddressFamily.UNIX;
      return;
    }
  }

  build(): Uint8Array {
    const proto = this.initHeader();
    let cursor = V2ProxyProtocol.initialHeaderOffset;

    if (this.addressFamily === AddressFamily.INET && this.proxyAddress instanceof IPv4ProxyAddress) {
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
      proto[cursor] = dstPort[1];

      return proto;
    }

    if (this.addressFamily === AddressFamily.INET6 && this.proxyAddress instanceof IPv6ProxyAddress) {
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
      proto[cursor] = dstPort[1];

      return proto;
    }

    if (this.addressFamily === AddressFamily.UNIX && this.proxyAddress instanceof UnixProxyAddress) {
      for (let i = 0; i < 108; i++) {
        proto[cursor++] = this.proxyAddress.sourceAddress.address[i];
      }

      for (let i = 0; i < 108; i++) {
        proto[cursor++] = this.proxyAddress.destinationAddress.address[i];
      }

      return proto;
    }

    // NOTE: unreachable
    return proto;
  }

  private initHeader(): Uint8Array {
    const proto = new Uint8Array(
      this.proxyAddress.getLength() + V2ProxyProtocol.protocolSignatureLength + V2ProxyProtocol.protocolMetaLength,
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
    return this.addressFamily | this.transportProtocol;
  }

  private static separate32bitTo16bitPair(num: number): [number, number] {
    const masked = num & 0xff00;
    const high = num >> 8;
    const low = num - masked;
    return [high, low];
  }
}

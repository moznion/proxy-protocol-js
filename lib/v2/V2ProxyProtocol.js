"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressFamily_1 = require("./enum/AddressFamily");
var Command_1 = require("./enum/Command");
var TransportProtocol_1 = require("./enum/TransportProtocol");
var IPv4ProxyAddress_1 = require("./proxy_address/IPv4ProxyAddress");
var IPv6ProxyAddress_1 = require("./proxy_address/IPv6ProxyAddress");
var UnixProxyAddress_1 = require("./proxy_address/UnixProxyAddress");
var V2ProxyProtocolParseError = (function () {
    function V2ProxyProtocolParseError(message) {
        this.message = message;
        this.name = this.constructor.name;
    }
    return V2ProxyProtocolParseError;
}());
exports.V2ProxyProtocolParseError = V2ProxyProtocolParseError;
var V2ProxyProtocol = (function () {
    function V2ProxyProtocol(command, transportProtocol, proxyAddress) {
        this.command = command;
        this.transportProtocol = transportProtocol;
        this.proxyAddress = proxyAddress;
        this.addressFamily = proxyAddress.getAddressFamily();
    }
    V2ProxyProtocol.prototype.build = function () {
        var proto = this.initHeader();
        var cursor = V2ProxyProtocol.initialHeaderOffset;
        if (this.addressFamily === AddressFamily_1.AddressFamily.INET && this.proxyAddress instanceof IPv4ProxyAddress_1.IPv4ProxyAddress) {
            for (var i = 0; i < 4; i++) {
                proto[cursor++] = this.proxyAddress.sourceAddress.address[i];
            }
            for (var i = 0; i < 4; i++) {
                proto[cursor++] = this.proxyAddress.destinationAddress.address[i];
            }
            var srcPort = V2ProxyProtocol.separate32bitTo16bitPair(this.proxyAddress.sourcePort);
            proto[cursor++] = srcPort[0];
            proto[cursor++] = srcPort[1];
            var dstPort = V2ProxyProtocol.separate32bitTo16bitPair(this.proxyAddress.destinationPort);
            proto[cursor++] = dstPort[0];
            proto[cursor] = dstPort[1];
            return proto;
        }
        if (this.addressFamily === AddressFamily_1.AddressFamily.INET6 && this.proxyAddress instanceof IPv6ProxyAddress_1.IPv6ProxyAddress) {
            for (var i = 0; i < 16; i++) {
                proto[cursor++] = this.proxyAddress.sourceAddress.address[i];
            }
            for (var i = 0; i < 16; i++) {
                proto[cursor++] = this.proxyAddress.destinationAddress.address[i];
            }
            var srcPort = V2ProxyProtocol.separate32bitTo16bitPair(this.proxyAddress.sourcePort);
            proto[cursor++] = srcPort[0];
            proto[cursor++] = srcPort[1];
            var dstPort = V2ProxyProtocol.separate32bitTo16bitPair(this.proxyAddress.destinationPort);
            proto[cursor++] = dstPort[0];
            proto[cursor] = dstPort[1];
            return proto;
        }
        if (this.addressFamily === AddressFamily_1.AddressFamily.UNIX && this.proxyAddress instanceof UnixProxyAddress_1.UnixProxyAddress) {
            for (var i = 0; i < 108; i++) {
                proto[cursor++] = this.proxyAddress.sourceAddress.address[i];
            }
            for (var i = 0; i < 108; i++) {
                proto[cursor++] = this.proxyAddress.destinationAddress.address[i];
            }
            return proto;
        }
        return proto;
    };
    V2ProxyProtocol.parse = function (data) {
        if (!this.isValidProtocolSignature(data)) {
            throw new V2ProxyProtocolParseError("given binary doesn't have v2 PROXY protocol's signature");
        }
        var cursor = this.protocolSignatureLength;
        var versionAndCommandByte = data[cursor++];
        if (versionAndCommandByte === undefined) {
            throw new V2ProxyProtocolParseError("given binary doesn't have a byte for version and command (13rd byte)");
        }
        var versionAndCommand = this.separate8bit(versionAndCommandByte);
        if (versionAndCommand[0] !== this.protocolVersion) {
            throw new V2ProxyProtocolParseError('given protocol version is invalid');
        }
        var command = Command_1.Command[Command_1.Command[versionAndCommand[1]]];
        if (command === undefined) {
            throw new V2ProxyProtocolParseError('given command is invalid');
        }
        var afAndTransportProtocolByte = data[cursor++];
        if (afAndTransportProtocolByte === undefined) {
            throw new V2ProxyProtocolParseError("given binary doesn't have a byte for address family and transport protocol (14th byte)");
        }
        var afAndTransportProtocol = this.separate8bit(afAndTransportProtocolByte);
        var addressFamily = AddressFamily_1.AddressFamily[AddressFamily_1.AddressFamily[afAndTransportProtocol[0]]];
        if (addressFamily === undefined) {
            throw new V2ProxyProtocolParseError('given address family is invalid');
        }
        var transportProtocol = TransportProtocol_1.TransportProtocol[TransportProtocol_1.TransportProtocol[afAndTransportProtocol[1]]];
        if (transportProtocol === undefined) {
            throw new V2ProxyProtocolParseError('given transport protocol is invalid');
        }
        var upperLengthByte = data[cursor++];
        var lowerLengthByte = data[cursor];
        if (upperLengthByte === undefined || lowerLengthByte === undefined) {
            throw new V2ProxyProtocolParseError("given binary doesn't have bytes for specifying length");
        }
        var length = (upperLengthByte << 8) + lowerLengthByte;
        if (length < AddressFamily_1.AddressFamily.getLength(addressFamily)) {
            throw new V2ProxyProtocolParseError("given specified length is shorter than address family's length");
        }
        return new V2ProxyProtocol(command, transportProtocol, AddressFamily_1.AddressFamily.getFactoryMethod(addressFamily)(data.slice(16)));
    };
    V2ProxyProtocol.prototype.initHeader = function () {
        var proto = new Uint8Array(this.proxyAddress.getLength() + V2ProxyProtocol.protocolSignatureLength + V2ProxyProtocol.protocolMetaLength);
        var cursor = 0;
        for (var i = 0; i < V2ProxyProtocol.protocolSignatureLength; i++) {
            proto[cursor++] = V2ProxyProtocol.protocolSignature[i];
        }
        proto[cursor++] = this.unionProtocolVersionAndCommand();
        proto[cursor++] = this.unionAddressFamilyAndTransportProtocol();
        var len = V2ProxyProtocol.separate32bitTo16bitPair(this.proxyAddress.getLength());
        proto[cursor++] = len[0];
        proto[cursor] = len[1];
        return proto;
    };
    V2ProxyProtocol.prototype.unionProtocolVersionAndCommand = function () {
        return V2ProxyProtocol.protocolVersion | this.command;
    };
    V2ProxyProtocol.prototype.unionAddressFamilyAndTransportProtocol = function () {
        return this.addressFamily | this.transportProtocol;
    };
    V2ProxyProtocol.separate32bitTo16bitPair = function (num) {
        var masked = num & 0xff00;
        var high = num >> 8;
        var low = num - masked;
        return [high, low];
    };
    V2ProxyProtocol.separate8bit = function (num) {
        var high = num & 0xf0;
        var low = num - high;
        return [high, low];
    };
    V2ProxyProtocol.isValidProtocolSignature = function (given) {
        for (var i = 0; i < V2ProxyProtocol.protocolSignatureLength; i++) {
            if (given[i] !== V2ProxyProtocol.protocolSignature[i]) {
                return false;
            }
        }
        return true;
    };
    V2ProxyProtocol.protocolSignature = new Uint8Array([
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
    V2ProxyProtocol.protocolSignatureLength = V2ProxyProtocol.protocolSignature.length;
    V2ProxyProtocol.protocolMetaLength = 4;
    V2ProxyProtocol.protocolVersion = 0x20;
    V2ProxyProtocol.initialHeaderOffset = V2ProxyProtocol.protocolSignatureLength + V2ProxyProtocol.protocolMetaLength;
    return V2ProxyProtocol;
}());
exports.V2ProxyProtocol = V2ProxyProtocol;
//# sourceMappingURL=V2ProxyProtocol.js.map
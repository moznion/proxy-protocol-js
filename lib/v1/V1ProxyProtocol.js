"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("util");
var INETProtocol_1 = require("./enum/INETProtocol");
var Peer_1 = require("./Peer");
var V1ProxyProtocol = (function () {
    function V1ProxyProtocol(inetProtocol, source, destination) {
        this.inetProtocol = inetProtocol;
        this.source = source;
        this.destination = destination;
    }
    V1ProxyProtocol.prototype.build = function () {
        return "PROXY " + this.inetProtocol + " " + this.source.ipAddress + " " + this.destination.ipAddress + " " + this.source.port + " " + this.destination.port + "\r\n";
    };
    V1ProxyProtocol.parse = function (input) {
        var matched = V1ProxyProtocol.v1ProxyProtocolRegexp.exec(this.normalizeToString(input));
        if (!matched) {
            return null;
        }
        return new V1ProxyProtocol(INETProtocol_1.INETProtocol[matched[1]], new Peer_1.Peer(matched[2], Number(matched[4])), new Peer_1.Peer(matched[3], Number(matched[5])));
    };
    V1ProxyProtocol.isValidProtocolSignature = function (input) {
        return V1ProxyProtocol.normalizeToString(input).startsWith(V1ProxyProtocol.protocolSignature);
    };
    V1ProxyProtocol.normalizeToString = function (input) {
        if (typeof input === 'string') {
            return input;
        }
        return new util_1.TextDecoder().decode(input);
    };
    V1ProxyProtocol.protocolSignature = 'PROXY';
    V1ProxyProtocol.v1ProxyProtocolRegexp = (function () {
        var inetProtoMatcher = Object.keys(INETProtocol_1.INETProtocol).join('|');
        return new RegExp("^" + V1ProxyProtocol.protocolSignature + " (" + inetProtoMatcher + ") ([^ ]+) ([^ ]+) ([0-9]+) ([0-9]+)\r\n.*", 's');
    })();
    return V1ProxyProtocol;
}());
exports.V1ProxyProtocol = V1ProxyProtocol;
//# sourceMappingURL=V1ProxyProtocol.js.map
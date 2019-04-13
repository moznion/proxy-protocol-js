"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var INETProtocol;
(function (INETProtocol) {
    INETProtocol["TCP4"] = "TCP4";
    INETProtocol["TCP6"] = "TCP6";
    INETProtocol["UNKNOWN"] = "UNKNOWN";
})(INETProtocol = exports.INETProtocol || (exports.INETProtocol = {}));
var Host = (function () {
    function Host(ipAddress, port) {
        this.ipAddress = ipAddress;
        this.port = port;
    }
    return Host;
}());
exports.Host = Host;
var V1ProxyProtocol = (function () {
    function V1ProxyProtocol(inetProtocol, source, destination, data) {
        this.inetProtocol = inetProtocol;
        this.source = source;
        this.destination = destination;
        this.data = data;
    }
    V1ProxyProtocol.prototype.build = function () {
        return "PROXY " + this.inetProtocol + " " + this.source.ipAddress + " " + this.destination.ipAddress + " " + this.source.port + " " + this.destination.port + "\r\n" + (this.data ? this.data : '');
    };
    V1ProxyProtocol.parse = function (text) {
        var matched = V1ProxyProtocol.v1ProxyProtocolRegexp.exec(text);
        if (!matched) {
            return null;
        }
        return new V1ProxyProtocol(INETProtocol[matched[1]], new Host(matched[2], Number(matched[4])), new Host(matched[3], Number(matched[5])), matched[6]);
    };
    V1ProxyProtocol.v1ProxyProtocolRegexp = (function () {
        var inetProtoMatcher = Object.keys(INETProtocol).join('|');
        return new RegExp("^PROXY (" + inetProtoMatcher + ") ([^ ]+) ([^ ]+) ([0-9]+) ([0-9]+)\r\n(.*)", 's');
    })();
    return V1ProxyProtocol;
}());
exports.V1ProxyProtocol = V1ProxyProtocol;
//# sourceMappingURL=proxy-protocol.js.map
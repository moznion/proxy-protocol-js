"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressFamily_1 = require("../enum/AddressFamily");
var IPv4Address = (function () {
    function IPv4Address(address) {
        this.address = address;
    }
    IPv4Address.createFrom = function (address) {
        return new IPv4Address([address[0] || 0, address[1] || 0, address[2] || 0, address[3] || 0]);
    };
    IPv4Address.createWithEmptyAddress = function () {
        return IPv4Address.createFrom([]);
    };
    return IPv4Address;
}());
exports.IPv4Address = IPv4Address;
var IPv4ProxyAddress = (function () {
    function IPv4ProxyAddress(sourceAddress, sourcePort, destinationAddress, destinationPort) {
        this.sourceAddress = sourceAddress;
        this.sourcePort = sourcePort;
        this.destinationAddress = destinationAddress;
        this.destinationPort = destinationPort;
    }
    IPv4ProxyAddress.from = function (d) {
        return new IPv4ProxyAddress(new IPv4Address([d[0], d[1], d[2], d[3]]), (d[8] << 8) + d[9], new IPv4Address([d[4], d[5], d[6], d[7]]), (d[10] << 8) + d[11]);
    };
    IPv4ProxyAddress.prototype.getLength = function () {
        return AddressFamily_1.AddressFamily.getLength(this.getAddressFamily());
    };
    IPv4ProxyAddress.prototype.getAddressFamily = function () {
        return AddressFamily_1.AddressFamily.INET;
    };
    return IPv4ProxyAddress;
}());
exports.IPv4ProxyAddress = IPv4ProxyAddress;
//# sourceMappingURL=IPv4ProxyAddress.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressFamily_1 = require("../enum/AddressFamily");
var IPv6Address = (function () {
    function IPv6Address(address) {
        this.address = address;
    }
    IPv6Address.createFrom = function (address) {
        return new IPv6Address([
            address[0] || 0,
            address[1] || 0,
            address[2] || 0,
            address[3] || 0,
            address[4] || 0,
            address[5] || 0,
            address[6] || 0,
            address[7] || 0,
            address[8] || 0,
            address[9] || 0,
            address[10] || 0,
            address[11] || 0,
            address[12] || 0,
            address[13] || 0,
            address[14] || 0,
            address[15] || 0,
        ]);
    };
    IPv6Address.createWithEmptyAddress = function () {
        return IPv6Address.createFrom([]);
    };
    return IPv6Address;
}());
exports.IPv6Address = IPv6Address;
var IPv6ProxyAddress = (function () {
    function IPv6ProxyAddress(sourceAddress, sourcePort, destinationAddress, destinationPort) {
        this.sourceAddress = sourceAddress;
        this.sourcePort = sourcePort;
        this.destinationAddress = destinationAddress;
        this.destinationPort = destinationPort;
    }
    IPv6ProxyAddress.from = function (d) {
        return new IPv6ProxyAddress(new IPv6Address([
            d[0],
            d[1],
            d[2],
            d[3],
            d[4],
            d[5],
            d[6],
            d[7],
            d[8],
            d[9],
            d[10],
            d[11],
            d[12],
            d[13],
            d[14],
            d[15],
        ]), (d[32] << 8) + d[33], new IPv6Address([
            d[16],
            d[17],
            d[18],
            d[19],
            d[20],
            d[21],
            d[22],
            d[23],
            d[24],
            d[25],
            d[26],
            d[27],
            d[28],
            d[29],
            d[30],
            d[31],
        ]), (d[34] << 8) + d[35]);
    };
    IPv6ProxyAddress.prototype.getLength = function () {
        return AddressFamily_1.AddressFamily.getLength(this.getAddressFamily());
    };
    IPv6ProxyAddress.prototype.getAddressFamily = function () {
        return AddressFamily_1.AddressFamily.INET6;
    };
    return IPv6ProxyAddress;
}());
exports.IPv6ProxyAddress = IPv6ProxyAddress;
//# sourceMappingURL=IPv6ProxyAddress.js.map
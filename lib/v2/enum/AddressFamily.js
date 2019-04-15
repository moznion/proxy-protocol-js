"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IPv4ProxyAddress_1 = require("../proxy_address/IPv4ProxyAddress");
var IPv6ProxyAddress_1 = require("../proxy_address/IPv6ProxyAddress");
var UnixProxyAddress_1 = require("../proxy_address/UnixProxyAddress");
var UnspecProxyAddress_1 = require("../proxy_address/UnspecProxyAddress");
var AddressFamily;
(function (AddressFamily) {
    AddressFamily[AddressFamily["UNSPEC"] = 0] = "UNSPEC";
    AddressFamily[AddressFamily["INET"] = 16] = "INET";
    AddressFamily[AddressFamily["INET6"] = 32] = "INET6";
    AddressFamily[AddressFamily["UNIX"] = 48] = "UNIX";
})(AddressFamily || (AddressFamily = {}));
exports.AddressFamily = AddressFamily;
(function (AddressFamily) {
    function getLength(addressFamily) {
        switch (addressFamily) {
            case AddressFamily.INET:
                return 12;
            case AddressFamily.INET6:
                return 36;
            case AddressFamily.UNIX:
                return 216;
            default:
                return 0;
        }
    }
    AddressFamily.getLength = getLength;
    function getFactoryMethod(addressFamily) {
        switch (addressFamily) {
            case AddressFamily.INET:
                return IPv4ProxyAddress_1.IPv4ProxyAddress.from;
            case AddressFamily.INET6:
                return IPv6ProxyAddress_1.IPv6ProxyAddress.from;
            case AddressFamily.UNIX:
                return UnixProxyAddress_1.UnixProxyAddress.from;
            default:
                return UnspecProxyAddress_1.UnspecProxyAddress.from;
        }
    }
    AddressFamily.getFactoryMethod = getFactoryMethod;
})(AddressFamily || (AddressFamily = {}));
exports.AddressFamily = AddressFamily;
//# sourceMappingURL=AddressFamily.js.map
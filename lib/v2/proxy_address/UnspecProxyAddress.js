"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressFamily_1 = require("../enum/AddressFamily");
var UnspecProxyAddress = (function () {
    function UnspecProxyAddress() {
    }
    UnspecProxyAddress.from = function (d) {
        return new UnspecProxyAddress();
    };
    UnspecProxyAddress.prototype.getLength = function () {
        return AddressFamily_1.AddressFamily.getLength(this.getAddressFamily());
    };
    UnspecProxyAddress.prototype.getAddressFamily = function () {
        return AddressFamily_1.AddressFamily.UNSPEC;
    };
    return UnspecProxyAddress;
}());
exports.UnspecProxyAddress = UnspecProxyAddress;
//# sourceMappingURL=UnspecProxyAddress.js.map
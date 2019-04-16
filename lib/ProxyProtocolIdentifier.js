"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProxyProtocolVersion_1 = require("./ProxyProtocolVersion");
var V1ProxyProtocol_1 = require("./v1/V1ProxyProtocol");
var V2ProxyProtocol_1 = require("./v2/V2ProxyProtocol");
var ProxyProtocolIdentifier = (function () {
    function ProxyProtocolIdentifier() {
    }
    ProxyProtocolIdentifier.identify = function (data) {
        if (V1ProxyProtocol_1.V1ProxyProtocol.isValidProtocolSignature(data)) {
            return ProxyProtocolVersion_1.ProxyProtocolVersion.V1;
        }
        if (typeof data === 'string' || !V2ProxyProtocol_1.V2ProxyProtocol.isValidProtocolSignature(data)) {
            return ProxyProtocolVersion_1.ProxyProtocolVersion.NOT;
        }
        return ProxyProtocolVersion_1.ProxyProtocolVersion.V2;
    };
    return ProxyProtocolIdentifier;
}());
exports.ProxyProtocolIdentifier = ProxyProtocolIdentifier;
//# sourceMappingURL=ProxyProtocolIdentifier.js.map
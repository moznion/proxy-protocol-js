/**
 * INETProtocol represents the protocols that are supported by PROXY protocol V1.
 *
 * > a string indicating the proxied INET protocol and family. As of version 1,
 * > only "TCP4" ( \x54 \x43 \x50 \x34 ) for TCP over IPv4, and "TCP6"
 * > ( \x54 \x43 \x50 \x36 ) for TCP over IPv6 are allowed. Other, unsupported,
 * > or unknown protocols must be reported with the name "UNKNOWN" ( \x55 \x4E
 * > \x4B \x4E \x4F \x57 \x4E ).
 *
 * From
 * http://www.haproxy.org/download/1.8/doc/proxy-protocol.txt
 */
export enum INETProtocol {
  TCP4 = 'TCP4',
  TCP6 = 'TCP6',
  UNKNOWN = 'UNKNOWN',
}

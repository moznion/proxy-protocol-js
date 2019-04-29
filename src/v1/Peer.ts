/**
 * Peer is a data class that represents src and dst the host information.
 */
export class Peer {
  /**
   * The constructor to instantiate an instance of Peer class.
   *
   * @param ipAddress
   * @param port
   */
  constructor(readonly ipAddress: string, readonly port: number) {}
}

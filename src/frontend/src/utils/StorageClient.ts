// Storage client stub — not used in game app
export class StorageClient {
  private readonly _init: string;

  constructor(
    bucket: string,
    _storageGatewayUrl: string,
    _backendCanisterId: string,
    _projectId: string,
    _agent: unknown,
  ) {
    this._init = bucket;
  }

  async putFile(
    _blobBytes: Uint8Array,
    _onProgress?: (p: number) => void,
  ): Promise<{ hash: string }> {
    throw new Error(`StorageClient(${this._init}) not available in game app`);
  }

  async getDirectURL(_hash: string): Promise<string> {
    throw new Error(`StorageClient(${this._init}) not available in game app`);
  }
}

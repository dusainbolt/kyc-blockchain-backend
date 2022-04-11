const { create: ipfsHttpClient } = require('ipfs-http-client');

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

class IpfsHelper {
  static async add(object) {
    return client.add(JSON.stringify(object));
  }
  static getUrl(path) {
    return `https://ipfs.infura.io/ipfs/${path}`;
  }
}

module.exports = IpfsHelper;

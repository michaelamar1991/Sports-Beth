var HDWalletProvider = require('truffle-hdwallet-provider');
const Wallet = require('ethereumjs-wallet');
var ropstenPrivateKey = new Buffer("87893502e9abf4c37d902bd2a1b79852000ee3e30f2fbb061addf6826bbf71bf","hex");
var ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);

var mnemonic = "art subject fringe input stem safe voyage dash umbrella share simple bring"
module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/769d36f81c9145889892de85b9ceb2b4")
      },
      network_id: 3,
    }   
  }
};
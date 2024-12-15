import { ArchwayClient } from '@archwayhq/arch3.js';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice, calculateFee } from "@cosmjs/stargate";

const network = {
  chainId: 'constantine-3',
  endpoint: 'https://rpc.constantine.archway.tech',
  prefix: 'archway',
};

const mnemonic = 'path index calm physical toy when sell annual pill elite creek pave';
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: network.prefix });
const accounts = await wallet.getAccounts();
const client = await SigningArchwayClient.connectWithSigner(network.endpoint, wallet);

const marketContractAddress = 'archway1cwx58k4xew5zrc4zqs888w58fhckvn09ryh02qx03dv83g8d6fyq6kcl3s';
const contractAddress = 'archway15y2rtn48nm0483umghatyj48n8fs6lrwj7t5q2lpl7apzdtmx37qg6j8wc'; // collection address

let purchase_amount = {
    amount: "100",
    denom: "aconst"
};

const gasPrice = GasPrice.fromString("1000000000000aconst");
const { transactionHash } = await client.execute(
  accounts[0].address,
  marketContractAddress,
  {
    "send_tokens": {
        "msg": {
            "offer": {
                "collection": contractAddress,
                "token": "1"
            }
        }
    }
  },
  calculateFee(1000000, gasPrice),
  "",
    [purchase_amount]
);


console.log(transactionHash);
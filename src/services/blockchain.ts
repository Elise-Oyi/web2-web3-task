import { JsonRpcProvider, Wallet, Contract, ethers } from "ethers";
import { config } from "../configuration/config";

export class BlockchainService {
  provider: JsonRpcProvider;
  wallet: Wallet;
  contract: Contract;

  constructor() {
    if (!config.ethereum.privateKey || !config.ethereum.contractAddress) {
      throw new Error("Missing Ethereum configuration");
    }

    const ethers = require("ethers");
    const iface = new ethers.Interface([
      "function getCount() view returns (uint256)",
    ]);
    const encodedData = iface.encodeFunctionData("getCount");

    this.provider = new ethers.JsonRpcProvider(
      config.ethereum.provider,
      "sepolia"
    );

    this.wallet = new Wallet(config.ethereum.privateKey, this.provider);

    const ABI = [
      {
        inputs: [],
        name: "decrement",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Decrement",
        type: "event",
      },
      {
        inputs: [],
        name: "increment",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Increment",
        type: "event",
      },
      {
        inputs: [],
        name: "getCount",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

    this.contract = new Contract(
      config.ethereum.contractAddress,
      ABI,
      this.wallet
    );
  }

  async getCount(): Promise<number> {
    try {
      console.log("here 1");

      const result = await this.contract.getCount();
      if (!result) {
        throw new Error("Received empty response from getCount.");
      }
  
      return Number(result);
    } catch (error) {
      console.error("GetCount error:", error);
      throw error;
    }
  }

  async incrementCounter():Promise<number> {
    try {
      const tx = await this.contract.increment();

      const receipt = await tx.wait();
      console.log(receipt,"receipt")

    const result = await this.getCount();
    console.log(result,"result")
      return result
    } catch (error) {
      console.error("Increment error:", error);
      throw error;
    }
  }
}

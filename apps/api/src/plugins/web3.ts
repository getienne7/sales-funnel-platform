import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { ethers } from 'ethers';
import Web3 from 'web3';

declare module 'fastify' {
  interface FastifyInstance {
    web3: {
      ethereum: Web3;
      polygon: Web3;
      bsc: Web3;
      getProvider: (network: string) => ethers.JsonRpcProvider;
      verifySignature: (message: string, signature: string, address: string) => boolean;
      getTokenBalance: (tokenAddress: string, walletAddress: string, network: string) => Promise<string>;
      estimateGasFee: (network: string) => Promise<{ gasPrice: string; maxFeePerGas?: string; maxPriorityFeePerGas?: string }>;
    };
  }
}

const web3Plugin: FastifyPluginAsync = async (fastify) => {
  // Initialize Web3 instances for different networks
  const providers = {
    ethereum: new Web3(process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/your-project-id'),
    polygon: new Web3(process.env.POLYGON_RPC_URL || 'https://polygon-mainnet.infura.io/v3/your-project-id'),
    bsc: new Web3(process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org/'),
  };

  // Initialize ethers providers
  const ethersProviders = {
    ethereum: new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL || 'https://mainnet.infura.io/v3/your-project-id'),
    polygon: new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL || 'https://polygon-mainnet.infura.io/v3/your-project-id'),
    bsc: new ethers.JsonRpcProvider(process.env.BSC_RPC_URL || 'https://bsc-dataseed.binance.org/'),
  };

  const web3Utils = {
    ethereum: providers.ethereum,
    polygon: providers.polygon,
    bsc: providers.bsc,

    getProvider: (network: string): ethers.JsonRpcProvider => {
      const provider = ethersProviders[network as keyof typeof ethersProviders];
      if (!provider) {
        throw new Error(`Unsupported network: ${network}`);
      }
      return provider;
    },

    verifySignature: (message: string, signature: string, address: string): boolean => {
      try {
        const recoveredAddress = ethers.verifyMessage(message, signature);
        return recoveredAddress.toLowerCase() === address.toLowerCase();
      } catch (error) {
        return false;
      }
    },

    getTokenBalance: async (tokenAddress: string, walletAddress: string, network: string): Promise<string> => {
      try {
        const web3Instance = providers[network as keyof typeof providers];
        if (!web3Instance) {
          throw new Error(`Unsupported network: ${network}`);
        }

        // ERC-20 ABI for balanceOf function
        const erc20Abi = [
          {
            constant: true,
            inputs: [{ name: '_owner', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ name: 'balance', type: 'uint256' }],
            type: 'function',
          },
          {
            constant: true,
            inputs: [],
            name: 'decimals',
            outputs: [{ name: '', type: 'uint8' }],
            type: 'function',
          },
        ];

        const contract = new web3Instance.eth.Contract(erc20Abi, tokenAddress);
        const balance = await contract.methods.balanceOf(walletAddress).call();
        const decimals = await contract.methods.decimals().call();
        
        return web3Instance.utils.fromWei(balance.toString(), 'ether');
      } catch (error) {
        fastify.log.error('Error getting token balance:', error);
        throw error;
      }
    },

    estimateGasFee: async (network: string): Promise<{ gasPrice: string; maxFeePerGas?: string; maxPriorityFeePerGas?: string }> => {
      try {
        const provider = ethersProviders[network as keyof typeof ethersProviders];
        if (!provider) {
          throw new Error(`Unsupported network: ${network}`);
        }

        const feeData = await provider.getFeeData();
        
        return {
          gasPrice: feeData.gasPrice?.toString() || '0',
          maxFeePerGas: feeData.maxFeePerGas?.toString(),
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.toString(),
        };
      } catch (error) {
        fastify.log.error('Error estimating gas fee:', error);
        throw error;
      }
    },
  };

  fastify.decorate('web3', web3Utils);
};

export default fp(web3Plugin, {
  name: 'web3'
});

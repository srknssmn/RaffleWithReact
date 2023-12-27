export const verifyNetwork = async () => {

    // Sepolia Network Verifying
    const dymensionRollupID = await '0x92EACC';
    const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
    
    if (chainId === dymensionRollupID){
        console.log("Bravo!, you are on the correct network")
        
    } else {
  
        console.log("oulalal, switch to the correct network");
        
        try {
        
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: dymensionRollupID}],
            });
            console.log("You have succefully switched to Coinhunters Dymension Rollup")
        
        } catch (switchError) {
            
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                console.log("This network is not available in your metamask, please add it")

                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                        { chainId: '0x92EACC', 
                        chainName:'CoinHuntersTR',
                        rpcUrls:['https://froopyland.dymension.xyz/24/coinhunterstr_9628364-1/evmrpc'],
                        nativeCurrency: {
                        symbol:'CHTR', // 2-6 characters long
                    decimals: 18
                    }
                        
                        }],
                    });
                    } catch (addError) {
                        // handle "add" error
                        console.log(addError);
                    }
            }
        }
    }
};
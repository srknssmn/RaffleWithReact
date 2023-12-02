export const verifyNetwork = async () => {

    // Dymension CoinHuntersTR Network Verifying
    const dymensionRollupID = await '0x4E4E86';
    const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });
    
    if (chainId === dymensionRollupID){
        console.log("Bravo!, you are on the correct network (CoinHuntersTR)")
        
    } else {
  
        console.log("oulalal, switch to the correct network");
        
        try {
        
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: dymensionRollupID}],
            });
            console.log("You have succefully switched to CoinHuntersTR Dymension Rollup")
        
        } catch (switchError) {
            
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                console.log("This network is not available in your metamask, please add it")

                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                        { chainId: '0x4E4E86', 
                        chainName:'CoinHuntersTR',
                        rpcUrls:['https://froopyland.dymension.xyz/22/coinhunterstr_5131910-1-a/evmrpc'],
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
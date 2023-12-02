import { useState } from "react";
import {verifyNetwork} from "./verifyNetwork.js";
import { ethers } from "ethers";

function Connect({sendProvider}) {

    const [account, setAccount] = useState("")
    const [provider, setProvider] = useState(null)

    async function connect() {

        if (!window.ethereum) {
            window.alert("Install Metamask")
            if(confirm("Metamask Download")) document.location = 'https://metamask.io/download/';
        }
        await verifyNetwork();
        
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []).then((accounts) => {
            setAccount(accounts[0]);
        }).catch((err) => {console.log(err)})
        const signer = await provider.getSigner();
        sendProvider(provider)
    }

    return ( 
        <div>
        <button onClick={ () => {
            if (account) return; 
            connect() }}>
                {account ? account : "Connect Wallet"}
            </button>
    </div> 
     );
}

export default Connect; 
import { useState, useEffect } from 'react'
import './App.css'
import './css/styles.css'
import Connect from './controllers/Connect';
import Buyers from './components/Buyers';
import {Contract} from './contracts/Contract';
import { ethers } from "ethers";

import RaffleNFT from './images/RaffleNFT.png'
import bayc from './images/bayc.png'
import bayc2 from './images/bayc2.jpg'
import cpunks from './images/cpunks.png'
import cpunks2 from './images/cpunks2.png'
import beanz from './images/beanz.png'
import DeGods from './images/DeGods.png'
import Doodles from './images/Doodles.png'
import milady from './images/milady.png'

function App() {

  const [first, setfirst] = useState(false)
  const [raffleContract, setRaffleContract] = useState(null)
  const [account, setAccount] = useState(null)
  const [entries, setEntries] = useState(null)
  const [lottery, setLottery] = useState(false)
  const [buyers, setBuyers] = useState([])
  const [userTickets, setUserTickets] = useState(null)
  const [ticketCost, setTicketCost] = useState(null)

  const newAccount = (provider) => {
    const contract = Contract();
    setRaffleContract(contract);
    setAccount(provider);
    setfirst(true)
  }

  const showTicketCost = async () => {
    const response = await raffleContract?.ticketCost();
    const responseValue = await ethers.utils.formatEther(response)
    setTicketCost(responseValue);
  } 

  const showEntries = async () => {
    const response = await raffleContract?.totalEntries();
    const responseValue = await ethers.utils.formatEther(response)
    const entriesValue = await Math.round(responseValue * 10**18)
    setEntries(entriesValue);
  }

  const showBuyers = async () => {
    const response = await raffleContract?.getPlayers();
    setBuyers(response);
  }

  const showLotteryStatus = async () => {
    const response = await raffleContract?.lotteryStatus();
    setLottery(response);
  }

  const showUserTicket = async () => {
    const signer = await account.getSigner();
    const ticketCount = await raffleContract?.entryCounts(signer.getAddress());
    const responseValue = await ethers.utils.formatEther(ticketCount)
    const ticketValue = await responseValue * 10**18
    setUserTickets(ticketValue);
  }

  const handleBuyTicket = async () => {
    const ticketValue = await 1;
    let value_ = await ethers.utils.parseEther(`${1}`)

    try {
      const txn = await raffleContract.buyTicket(ticketValue, { value: value_ });
      await txn.wait();
      await console.log("success")
    } catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if (account) {
      showUserTicket();
      showBuyers();
      showTicketCost();
      showEntries();
      showLotteryStatus();
    }    
  });

  return (
    <>
      <Connect sendProvider={newAccount}/>
      {/* <ShowWinner show={raffleContract} /> */}
      {first ? 
        <div className='w-full flex flex-col lg:flex-row'>
          <div className='lg:w-1/2 items-center px-4'>
            <div className='m-10'>
              <img src={RaffleNFT} alt="" />
            </div>
          </div>
          <div className='lg:w-1/2 items-center px-4'>
            <div className='m-10'>
              {lottery ? <p>Lottery Status: {lottery ? "true" : "false"}</p> : ""}  
              {ticketCost ? <p>Ticket Cost: {ticketCost}</p> : ""}
              <p>User Ticket: {userTickets}</p>
              <div className='hover:text-gega-melon transition duration-500 tracking-widest rounded-lg border-2 border-blue-800 px-1 py-1'>
                <button className='text-blue-800 font-bold' onClick={handleBuyTicket}>Buy Ticket</button>
              </div>
              <p>Total Entries: {entries}</p>
              {buyers.length > 0 ? <p>Total Buyers: {buyers.length}</p> : ""}
              <Buyers buyersArray={buyers}/>
            </div>
          </div>  
        </div>
        :
        <div>
          <div className='mx-32 mt-20 mb-8'>
            <h1 className="text-6xl font-bold tracking-wider">
              You Can Get the Most Valuable NFTs
            </h1>
            <h1 className="text-6xl font-bold tracking-wider text-blue-800 mt-4">
              by Participating in the Raffles
            </h1>
            <div className='items-center mt-20 place-items-center content-center text-center'>
              <button disabled className='text-xl text-gray-500 border-2 border-blue-500 rounded-xl px-10 py-2 font-bold'>Let's Start with Wallet Connect</button>
            </div>
          </div>
          <div className="logos flex flex-row cursor-pointer select-none">
            <div className="logos-slide flex flex-row">
                <img src={RaffleNFT} className="lg:ml-10 rounded-lg" alt=""/>
                <img src={bayc} className="rounded-lg" alt=""/>
                <img src={cpunks} className="rounded-lg" alt=""/>
                <img src={beanz} className="rounded-lg" alt=""/>
                <img src={DeGods} className="rounded-lg" alt=""/>
                <img src={RaffleNFT} className="lg:ml-10 rounded-lg" alt=""/>
                <img src={Doodles} className="rounded-lg" alt=""/>
                <img src={milady} className="rounded-lg" alt=""/>
                <img src={bayc2} className="rounded-lg" alt=""/>
                <img src={cpunks2} className="rounded-lg" alt=""/>
            </div>
          </div>
        </div>
    }
    </>
  )
}

export default App
import { useState, useEffect } from 'react'
import './App.css'
import './css/styles.css'
import Connect from './controllers/Connect';
import Buyers from './components/Buyers';
import {Contract} from './contracts/Contract';
import { ethers } from "ethers";
import RaffleNFT from './images/RaffleNFT.png'

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
    const entriesValue = await responseValue * 10**18
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
        <div className='w-full flex flex-row'>
          <div className='w-1/2 items-center px-4'>
            <div className='m-10'>
              <img src={RaffleNFT} alt="" />
            </div>
          </div>
          <div className='w-1/2 items-center px-4'>
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
          <h1 className="text-3xl font-bold underline">
            Hello world!
          </h1>
        </div>
    }
    </>
  )
}

export default App
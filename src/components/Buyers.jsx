import ShowBuyers from "./ShowBuyers";

function Buyers({buyersArray}) {

    return ( 
        <div>
            {buyersArray.map((item, index) => {
                return (
                    <ShowBuyers buyer={item} key={index}/>
                )
            })}
        </div>
     );
}

export default Buyers;
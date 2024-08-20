import React from "react";
import { Link } from "react-router-dom";


const Records = ({data}) => {
    return(
        <div>
        {data.map((ticket) => (
           <Link className="custom-link" to={`/getTicket/${ticket.ticketID}`}style={{ background: 'unset', 
            color: 'inherit', 
            textDecoration: 'none',textDecorationColor: 'none'}}><div className='p-2' key={ticket.ticketID}>{ticket.title}
            </div>
            </Link>
        ))}
        </div>
        
    )
}

export default Records


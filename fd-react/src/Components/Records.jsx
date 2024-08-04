import React from "react";


const Records = ({data}) => {
    return(
        <div>
        {data.map((ticket) => (
            <div className='p-2' key={ticket.ticketID}>{ticket.title}</div>
        ))}
        </div>
    )
}

export default Records
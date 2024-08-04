
import Stack from 'react-bootstrap/Stack';
import './HomeComponent.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';



export default function Home()
{
    

    const [data,setData] = useState([]);

    const [currentPage , setCurrentPage] = useState(1);

    const [recordsPerPage] = useState(10);

    

    const fetchData = async () => {
        try{
            const response = await axios.get("http://localhost:3000/api/v1/getTickets");
            setData(response.data);
        } catch (error){
            console.error("Error fetching data",error);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const data2 = data.slice(indexOfFirstRecord,indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    
   
    return(
        <>
        <Stack gap={3}>
            <div>
            {data.map((ticket) => (
                <div className='p-2' key={ticket.ticketID}>{ticket.title}</div>
            ))}
            </div>
        <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
        </Stack>
        </>
        
    )
}


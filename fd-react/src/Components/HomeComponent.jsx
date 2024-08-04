
import Stack from 'react-bootstrap/Stack';
import './HomeComponent.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Records from './Records';



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

    const currentRecords = data.slice(indexOfFirstRecord,indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    
   
    return(
        <>
        <Stack gap={3}>
          <Records data={currentRecords}/>
        <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
        </Stack>
        </>
        
    )
}


import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function TicketComponent(props)
{
    const {  id   } = useParams();
    const [data,setData] = useState([]);
    const fetchData = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/v1/getTicket/${id}`);
            console.log(response)
            setData(response.data);
        } catch (error){
            console.error("Error fetching data",error);
        }
    };


    useEffect(() => {
        fetchData();
    },[]);



    return(
       <div>
        <p>{data.title}</p>
        <p>{data.description}</p>
       </div>
    )

}

//Still need to make this in a readable format


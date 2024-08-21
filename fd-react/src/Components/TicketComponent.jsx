import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


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
       <div className="position-relative">
        <div className="p-3"><strong>{data.title}</strong></div>
        <div className="p-3">{data.description}</div>
        <div className="p-3">Position an element at the top of the viewport, from edge to edge. Be sure you understand the ramifications of fixed position in your project; you may need to add additional CSS.

</div>
        <Form>
            <Form.Group className='p-3' controlId="desc" form-color-width="5rem">
                <Form.Label className='fw-bold'>Your Reply</Form.Label>
                <FormControl name="description" as="textarea" className='w-60' rows={5} />
            </Form.Group>
            <div className="d-flex justify-content-end p-3">
            <Button id="button" className='mb-3' variant='primary' type="submit">
                Submit
            </Button>
        </div>
        </Form>
       </div>
    )

}

//Still need to make this in a readable format


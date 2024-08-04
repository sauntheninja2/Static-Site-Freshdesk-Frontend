import { FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function NewTicketForm(){

   const navigate = useNavigate();

    const [data,setData] = useState({
        title: "",
        description: ""
    });

   

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const ticketData = {
            title: data.title,
            description: data.description
        };

        axios.post("http://localhost:3000/api/v1/createTicket",ticketData).then((response) => {
            console.log(response.status , response.data);
        });

        navigate('/home')
    };

    return(
        <>
        <div>
        <div class="container mt-4 pt-5">
        <p class="fs-4 custom-margin-top" style={{ marginTop: '-55px' }}> <Link to="/home" style={{ textDecoration: 'none' }}>Home</Link>
        </p>
            <div classname="typography">
        <p class="fs-2 mb-2 " style={{marginTop: '-5px' }}>Report an Issue</p>
        </div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='formgroupSubject'>
                <Form.Label className='fw-bold'>Subject</Form.Label>
                <Form.Control name="title" className='w-60' type='text' value={data.title} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className='mb-4' controlId="desc">
                <Form.Label className='fw-bold'>Description</Form.Label>
                <FormControl name="description" as="textarea" value={data.description} onChange={handleChange} className='w-60' rows={10} />
            </Form.Group>
            <div className="d-flex justify-content-end">
            <Button id="button" className='mb-3' variant='primary' type="submit">
                Submit
            </Button>
        </div>
        </Form>
        </div>
    </div>
    </>
        
    )
}
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
    const [coms,setComment]  = useState([]);
    const [post, setPost] = useState({
        ticketID: "",
        comment: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setPost({
            ...post,
            [e.target.name] : value
        });
    };

    const config = {
        headers: {
            'Content-Type': "application/json",
            'Accept': 'application/json'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const commentData = {
            ticketID: id,
            comment: post.comment
        };

        axios.post(`http://localhost:3000/api/v1/getTicket/${id}/comment`,commentData,config).then((response) => {
            console.log(response.status,commentData);
            setPost({ ...post,comment: ""});
            commentsData();
        })

    }

    const fetchData = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/v1/getTicket/${id}`);
            console.log(response);
            setData(response.data);
        } catch (error){
            console.error("Error fetching data",error);
        }
    };

    const commentsData = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/api/v1/getTicket/${id}/comment`);
            console.log(response)
            setComment(response.data);
            console.log(coms,"Hello World");
        }catch(error){
            console.error("Error fetching data",error)
        }
    };

    let itemsToRender;
    if(coms){
        itemsToRender = coms.map(comment => {
            return <div key={comment.commentID}>{comment.comment}</div>
        });
    }


    useEffect(() => {
        fetchData();
        commentsData();
    },[id]);


    return(
       <div className="position-relative">
        <div className="p-3"><strong>{data.title}</strong></div>
        <div className="p-3">{data.description}</div>
        <div className="p-3">{itemsToRender}</div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='p-3' controlId="desc" form-color-width="5rem">
                <Form.Label className='fw-bold'>Your Reply</Form.Label>
                <FormControl name="comment" as="textarea" value={post.comment} onChange={handleChange} className='w-60' rows={5} />
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


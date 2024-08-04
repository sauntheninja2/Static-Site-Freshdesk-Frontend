import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NewTicketForm from './NewTicketForm';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NavigationBar() {

   /* const [formVisible , setFormVisible] = useState(false);

    const formHandler = () => {
        setFormVisible(true);

    }

    */

    const navigate = useNavigate()

    const goToTicketForm=()=>{
        navigate("/createTicket");
    }

    return(
        <>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Sujaynath</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex ms-auto">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button  variant="outline-success" onClick={() => goToTicketForm()} >New</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
    )

};
    


//This will hold the Navbar component and should be rendered at alll times in all the webpages

/**
 * <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand",href="#">FreshDesk</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collaspe" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
 */
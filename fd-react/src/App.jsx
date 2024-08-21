import NavigationBar from "./Components/NavComponent"
import { BrowserRouter } from "react-router-dom";
import HomeComponent from "./Components/HomeComponent";
import { BrowserRouter as Router, Route, Link, Routes , redirect} from "react-router-dom";
import NewTicketForm from "./Components/NewTicketForm";
import TicketComponent from "./Components/TicketComponent";


function App() {

  return (
    <>
      <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/home" element={<HomeComponent />} />
        <Route path="/createTicket" element={<NewTicketForm />} />
        <Route path="/getTicket/:id" element={<TicketComponent />} />
        <Route path="/getTicket/:id/comment" element={<TicketComponent />} />
        <Route path="/getTicket/:id/comment" element={<TicketComponent />} />
        <Route path="/getTicket/:id" element={<TicketComponent />} />
      </Routes>
      </Router>
    </>
    
  )
}

export default App

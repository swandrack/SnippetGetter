import { Link } from "react-router"
import { Select, MenuItem, Button } from "@mui/material"
import { useState } from "react";

function Header() {
  const [page, setPage] = useState('Home')

  const handleChange = (event) => {
    setPage(event.target.value)
}

  return(
    <nav class="topnav">
      <Button 
      value="Home"
      variant="outlined"
      color="info">
        <Link to="/">
          Home
        </Link>
      </Button>
      <Button 
      value="Feedback"
      variant="outlined"
      color="info">
        <Link to="/feedback">
          Submit Feedback
        </Link>
      </Button>
    </nav>
  )
}

export default Header;
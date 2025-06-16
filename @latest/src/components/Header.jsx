import { Link } from "react-router"
import { Select, MenuItem } from "@mui/material"
import { useState } from "react";

function Header() {
  const [page, setPage] = useState('Home')

  const handleChange = (event) => {
    setPage(event.target.value)
}

  return(
    <nav>
      <Select
      value={page}
      variant="outlined"
      onChange={handleChange}
      >
        <MenuItem value="Feedback">
          <Link to="/feedback">
            Submit Feedback
          </Link>
        </MenuItem>
        <MenuItem value="Home">
          <Link to="/">
            Home
          </Link>
        </MenuItem>
      </Select>
    </nav>
  )
}

export default Header;
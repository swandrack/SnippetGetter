/* Look, I hated the top nav. This should be much cleaner. */

import { Link } from "react-router"
import { Button, Typography, Container, ThemeProvider, createTheme } from "@mui/material"

const theme = createTheme({
  palette:{
    sidebar: {
      main: '#222222',
      secondary: '#D3D3D3'
    }
  }
})

export default function Sidebar() {
  return(
    <ThemeProvider theme={theme}>
      <Container className="sidebar-container" sx={{
        mr: "25px"
      }}>
        <br />
        <Typography variant="h5" style={{color: "#222222"}}>
          Snippet Getter
        </Typography>
        <hr />
        <div className="button-container" style={{display: "block", alignItems: "start", paddingBottom: "25px"}}>
          <Button
            variant="text"
            fullWidth
            className="sidebar-button"
            endIcon={<img src="/home-icon.svg" id="icon" />}
            component={Link} 
            to="/" 
            style={{color:"#D3D3D3"}}
            >
              Home
          </Button>
          <Button
            variant="text"
            fullWidth
            endIcon={<img src="/Terminal-icon.svg" id="icon"/>}
            className="sidebar-button"
            component={Link} 
            to="/terminal" 
            style={{color:"#D3D3D3"}}
          >
            Terminal
          </Button>
          <Button
            variant="text"
            fullWidth
            endIcon={<img src="/Feedback-icon.svg" id="icon"/>}
            className="sidebar-button"
            component={Link}
            to="/feedback" 
            style={{color:"#D3D3D3"}}
            >
              Submit Feedback
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  )
}
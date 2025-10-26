import { Typography, Box, Container, Button } from '@mui/material'
import { Link } from 'react-router'

export default function FeedbackSubmitted() {
  return(
    <Container>
        <Typography>
          Thanks for your feedback!
        </Typography>
        <Button
          variant="outlined"
          id="centered">
          <Link to="/">Home</Link>
        </Button>
        <Button
          variant="outlined"
          id="centered">
            <Link to="/terminal">Terminal</Link>
          </Button>
    </Container>
    )
}
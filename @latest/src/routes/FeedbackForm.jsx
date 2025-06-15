import { Button,Box, FormControl, TextField, Typography } from '@mui/material'
import submitFeedback from '../utils/apimanager'
import { useState } from 'react';

export default function FeedbackForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('');

  function submitForm() {
    submitFeedback(name, email, subject, body);
  }

  function clearForm() {
    setBody("")
    setEmail("")
    setName("")
    setSubject("")
  }

  return(
    <Box id="feedback-form">
      <Typography
      variant="h5" 
      gutterBottom
      >
        Feedback Form
      </Typography>
      <FormControl
      fullWidth
      color = 'primary'
      size='large'
      >
        <TextField
          fullWidth
          margin="normal"
          label="Your Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}>
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Your Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}>
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Subject"
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}>
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          label="Feedback"
          variant="outlined"
          multiline='true'
          minRows={5}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          >
        </TextField>
      </FormControl>
      <Button 
          width="100px"
          onClick={clearForm}
          variant="outlined"
          color="warning"
        >
          Clear Form
        </Button>
        <Button
          className='align-right'
          width='60px'
          onClick={submitForm}
          variant="outlined"
          color="success"
          
        >Submit
        </Button>
    </Box>
)}
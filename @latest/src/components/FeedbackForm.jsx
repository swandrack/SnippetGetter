import { Button,Box } from '@mui/material'
import submitFeedback from '../utils/apimanager'

export default function FeedbackForm() {
  return(
  <Box>
    <Button 
      onClick={submitFeedback}
      variant="outlined"
      color="info"
    >Button Text</Button>
    <span>more text</span>
  </Box>
)}
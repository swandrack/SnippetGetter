import { Button, Box } from "@mui/material"

export default function LaunchEnvEx(props) {
  if (props.walkmeLoaded === false) {
      return(
        <Box>
          <Button 
              variant="contained"
              color="warning"
              disabled
          >
              Launch EnvEx
          </Button>
        </Box>
      )} else {
        return(
          <Box>
            <Button 
                variant="outlined"
                color="warning"
                onClick={_walkmeInternals.launchEnvEx}
            >
                Launch EnvEx
            </Button>
          </Box>
        )
      }
  }
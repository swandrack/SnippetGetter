import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import * as React from "react";

export default function WalkMeTools(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if(props.walkmeLoaded === true) {
    return(
        <div>
          <Button
            id="menu-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? true : undefined}
            onClick={handleClick}
          >
          WalkMe Tools
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={WalkMeAPI.launchTracker()}>Launch Flow Tracker</MenuItem>
            <MenuItem onClick={_walkmeInternals.launchEnvEx()}>Launch EnvEx</MenuItem>
            <MenuItem onClick={() => {
              const logLevel = prompt("Please enter log level", "1-5")
              WalkMeAPI.log.enable(logLevel)
            }}>
            Run Logs
            </MenuItem>
          </Menu>
        </div>
    )} else {
      return(
        <div>
          <Button
            id="menu-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? true : undefined}
            onClick={handleClick}
            disabled
          >
          WalkMe Tools
          </Button>
        </div>
      )
    }
}
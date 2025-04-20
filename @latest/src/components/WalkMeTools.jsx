import { Button } from "@mui/material";
import { useState } from "react";
import * as React from "react";
import { Menu, MenuItem, SubMenu } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';

export default function WalkMeTools(props) {
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  if(props.walkmeLoaded === true) {
    return(
        <div>
          <Menu
            menuButton={<Button 
            id="menu-button"
            variant="outlined"
            color="alert"
            >
            WalkMe Tools
            </Button>}
          >
            <MenuItem onClick={() => {WalkMeAPI.launchTracker()}}>Launch Flow Tracker</MenuItem>
            <MenuItem onClick={() => {_walkmeInternals.launchEnvEx()}}>Launch EnvEx</MenuItem>
            <SubMenu label="Logs">
              <MenuItem onClick={() => {
                const logLevel = prompt("Please enter log level", "1-5")
                WalkMeAPI.log.enable(logLevel)
                }}
              >
              Player Logs
              </MenuItem>
              <MenuItem onClick={() => {WalkMeAPI.log.disable()}}>Disable Logs</MenuItem>
              <SubMenu label="Prelib Logs">
              <MenuItem onClick={() => {
                console.log("Please refresh page to see prelib logs")
                _walkmeInternals.ctx.get("PrelibLogger").enableLog()}}>Enable Logs</MenuItem>
              <MenuItem onClick={() => {
                _walkmeInternals.ctx.get("PrelibLogger").disableLog()}}>Disable Logs</MenuItem>
                </SubMenu>
            </SubMenu>
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
            loading
            loadingPosition="end"
          >
          WalkMe Tools
          </Button>
        </div>
      )
    }
}
import { Button, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from "react";
import { Menu, MenuItem, SubMenu } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import {ThemeProvider} from "@mui/material";
import Modal from "./Modal";
import { setLocalKeys, setCookie,  } from "../utils/storage";

export default function WalkMeTools(props) {
  const theme = useTheme();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCrossDomain, setIsCrossDomain] = useState(true);
  const closeModal = () => setIsModalOpen(false);


  if(props.walkmeLoaded === true) {
    return(
        <ThemeProvider theme={theme}>
          <Modal isOpen={isModalOpen} onClose={closeModal} isCrossDomain={isCrossDomain} />
          <Menu
            menuButton={<Button 
            id="menu-button"
            variant="outlined"
            >
            WalkMe Tools
            </Button>}
          >
            <SubMenu label="Launch iFrame">
              <MenuItem onClick={() => {
              setIsModalOpen(true)}
              }>Cross Domain
              </MenuItem>
              <MenuItem onClick={() => {
                setIsCrossDomain(false)
                setIsModalOpen(true)
              }
              }>Same Domain</MenuItem>
            </SubMenu>
            <MenuItem onClick={() => {WalkMeAPI.launchTracker()}}>Launch Flow Tracker</MenuItem>
            <MenuItem onClick={() => {_walkmeInternals.launchEnvEx('/js/main.js')}}>Launch EnvEx</MenuItem>
            <SubMenu label="Logs">
              <SubMenu label="Player Logs">
              <MenuItem onClick={() => {
                const logLevel = prompt("Please enter log level", "1-5")
                WalkMeAPI.log.enable(logLevel)
                }}
              >
              Player Logs
              </MenuItem>
              <MenuItem onClick={() => {WalkMeAPI.log.disable()}}>Disable Logs</MenuItem>
              </SubMenu>
              <SubMenu label="Prelib Logs">
              <MenuItem onClick={() => {
                console.log("Please refresh page to see prelib logs")
                _walkmeInternals.ctx.get("PrelibLogger").enableLog()}}>Enable Logs</MenuItem>
              <MenuItem onClick={() => {
                _walkmeInternals.ctx.get("PrelibLogger").disableLog()}}>Disable Logs</MenuItem>
                </SubMenu>
            </SubMenu>
            <SubMenu label="Manage Storage">
              <SubMenu label="Set Storage">
                <MenuItem onClick={() => {
                    const keyName = prompt("Please enter key name")
                    const keyValue = prompt("Please enter key value")
                    setLocalKeys(keyName, keyValue)
                  }}>
                  Set storage Key
                </MenuItem>
                <MenuItem onClick={() => {
                  const keyName = prompt("Please enter cookie name")
                  const keyValue = prompt("Please enter cookie value")
                  setCookie(keyName, keyValue)
                }}>
                  Set Cookie
                </MenuItem>
              </SubMenu>
              <SubMenu label="Manage Storage">
                <MenuItem onClick={() => {
                  const keyName = prompt("Please enter key name")
                  localStorage.removeItem(keyName)
                }}>Remove Storage Key</MenuItem>
                <MenuItem onClick={() => {
                  const question = prompt("Do you want to delete all storage?");
                  if(question.toLowerCase() === "yes") {
                    localStorage.clear()
                    document.cookie.split(";").forEach((c) => {
                      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
                    })
                    alert("Storage cleared")
                  } else {
                    alert("Storage not cleared")
                  }
                }}>Clear Storage</MenuItem>
                <MenuItem onClick={() => {
                  const keyName = prompt("Please enter cookie name")
                  document.cookie = keyName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }}>Delete Cookie</MenuItem>
                </SubMenu>
            </SubMenu>
          </Menu>
        </ThemeProvider>
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
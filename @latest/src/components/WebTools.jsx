import { Button, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import * as React from "react";
import { Menu, MenuItem, SubMenu } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import {ThemeProvider} from "@mui/material";
import { setLocalKeys, setCookie,  } from "../utils/storage";
import Modal from "./Modal";

export default function WebTools(props) {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCrossDomain, setIsCrossDomain] = useState(true);
  const closeModal = () => setIsModalOpen(false);

  return(
    <ThemeProvider theme={theme}>
      <Modal isOpen={isModalOpen} onClose={closeModal} isCrossDomain={isCrossDomain} />
      <Menu 
        menuButton={<Button 
        id="menu-button"
        variant="outlined"
        >Web Tools</Button>}>
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
  )
}

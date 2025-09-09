import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button } from "@mui/material";
import { useState } from "react";

export default function Modal({isOpen, onClose, children}) {

  if (!isOpen) {
    return null
  }
  else {
    return(
      <Dialog open={isOpen} onClose={onClose}>
        <div className="modal-overlay" onClick={onClose}>
          <DialogPanel className="inner-modal-wrapper">
            <DialogTitle className="font-bold modal-title">iFrame Window</DialogTitle>
            <div className="iframe-container">
              <iframe className="wikipedia-iframe" src="https://wikipedia.org/" />
            </div>
            <div className="button-container">
              <Button 
              onClick={onClose} 
              id="modal-close-button"
              variant="outlined"
              color="alert"
              >Close</Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    )
  }
}
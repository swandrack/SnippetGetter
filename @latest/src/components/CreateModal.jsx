import { useState } from "react"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button } from "@mui/material";

export default function CreateModal({elements, isOpen, onClose}) {

  const el = elements;
  const createElements = (element) => {
    element.forEach((element) => {
      try {
        const container = document.getElementsByClassName("elements-container")
        const newContainer = document.createElement("div")
        const newElement = document.createElements(element)
        document.body.insertBefore(newContainer, container)
        newContainer.appendChild(newElement)
      } catch(e) {
        console.log(e)
      }
    })
  }
  if (!isOpen) {
    return null
  } else {
    return (
      <Dialog open={isOpen} onClose={onClose}>
        <div className="modal-overlay" onClick={onClose}>
          <DialogPanel className="inner-modal-wrapper">
            <DialogTitle className="font-bold modal-title">Create Modal</DialogTitle>
            <div className="elements-container">
              {createElements(el)}
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
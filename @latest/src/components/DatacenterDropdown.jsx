import { Select, MenuItem, InputLabel, FormControl } from "@mui/material"
import { useState, useEffect } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../utils/storage";

export default function DatacenterDropdown({ data, sendDataToParent }) {
  
  const [dc, setDc] = useState(getLocalStorageItem("dc"))

  const handleChange = (e) => {
    setDc(e.target.value)
  }

  useEffect(() => {sendDataToParent(dc)}, [dc])

  return(
    <FormControl 
        fullWidth
        margin="normal"
        variant="outlined">
      <InputLabel 
        id="demo-select-small-label"
        label="DataCenter">
        Data Center
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={dc}
        onChange={handleChange}
        label="DataCenter">
        <MenuItem value="US">WalkMe US</MenuItem>
        <MenuItem value="EU">WalkMe EU</MenuItem>
        <MenuItem value="SAP US">SAP US</MenuItem>
        <MenuItem value="SAP EU">SAP EU</MenuItem>
      </Select>
    </FormControl>
  )
}
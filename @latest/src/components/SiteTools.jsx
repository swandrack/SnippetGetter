import * as material from '@mui/material'

export default function SiteTools() {
  function openiFrame() {
    srcURL = alert("Enter URL to load");
    return(
      <div className="iframeholder">
        <material.Typography>Your iFrame:</material.Typography>
        <iframe src='${srcURL}'></iframe>
      </div>
    )
  }
return(
  <material.Box>
    <material.Menu 
      menuButton= {<material.Button
      variant="contained"
      id="siteToolsButton"
      className="button"
      color="warning"
      >
        Site Tools
      </material.Button>}>
      <material.MenuItem onClick={() => {openiFrame()}}>
      Open iFrame
      </material.MenuItem>
    </material.Menu>
  </material.Box>
)}
import { useState } from "react";
import React from "react";

export default function App() {
  const [guid, setGuid] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    (function() {
      var walkme = document.createElement('script'); 
      walkme.type = 'text/javascript'; 
      walkme.async = true; 
      walkme.src = `https://cdn.walkme.com/users/${guid}/test/walkme_${guid}_https.js`; 
      var s = document.getElementsByTagName('script')[0]; 
      s.parentNode.insertBefore(walkme, s); 
      window._walkmeConfig = {smartLoad:true}; 
    })();
  }

  return(
  <form>
    <label>Please add GUID here:
      <input 
      type="text" 
      value={guid}
      onChange={(e) => setGuid(e.target.value)}
      />
      <input type="submit" onClick={handleSubmit}/>
    </label>
  </form>
)}
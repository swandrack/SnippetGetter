import { useState } from "react";
import React from "react";

export default function App() {
  const [guid, setGuid] = useState("");
  const [env, setEnv] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      async function loadWalkMe() {
        var walkme = document.createElement('script'); 
        walkme.type = 'text/javascript'; 
        walkme.async = true; 
        walkme.src = `https://cdn.walkme.com/users/${guid}${isEnv(env)}/walkme_${guid}_https.js`; 
        var s = document.getElementsByTagName('script')[0]; 
        s.parentNode.insertBefore(walkme, s); 
        window._walkmeConfig = {smartLoad:true};
        await new Promise(resolve => setTimeout(resolve, 1200))
      };
      async function statusReport(){
        await loadWalkMe()
        if (_walkmeInternals.removeWalkMeReason) {
          alert(_walkmeInternals.removeWalkMeReason )
        }
      }
      statusReport()
    } catch (error) {
      alert(error)
    }
  }
  const removeWalkMe = (event) =>{
    try {
      event.preventDefault()
      _walkMe.removeWalkMe()
    } catch (error) {
      alert("WalkMe is not running!")
    }
  }

  function isEnv(env) {
    if (env) {
      return '/' + env
    } else {
      return ""
    }
  }

  return(
  <form id="mainForm">
    <label>Please add GUID here:&nbsp;
      <input 
      id="textbox"
      type="text" 
      value={guid}
      onChange={(e) => setGuid(e.target.value)}
      />
    </label>
    <br />
    <label>Please enter Env here:&nbsp;
      <input
      id="textbox"
      type="text"
      value={env}
      onChange={(e) => setEnv(e.target.value)}
      />
    </label>
    <br />
      <input type="submit" onClick={handleSubmit}/>
      <input 
      type="submit" 
      className="removeWalkMeButton" 
      onClick={removeWalkMe} 
      value="Remove WalkMe"
      />
  </form>
)}
import { useState } from "react";
import { loadWalkMe } from "./routes/loadWalkme";

export default function App() {
  const [guid, setGuid] = useState("");
  const [env, setEnv] = useState("");
  const [uuid, setUuid] = useState("");

  const handleSubmit = (event) => {
    const getGuid = guid
    const environment = isEnv(env)
    event.preventDefault();
    createUuid(uuid);
    loadWalkMe(getGuid, environment, statusReport)
    }

  const removeWalkMe = (event) =>{
    try {
      event.preventDefault()
      window._walkMe.removeWalkMe()
    } catch (error) {
      console.error("Failed to remove WalkMe:", error);
    }
  }

  async function statusReport(){
    if (window._walkmeInternals.removeWalkMeReason) {
      alert(window._walkmeInternals.removeWalkMeReason )
    }
  }

  function isEnv(env) {
    if (env) {
      return '/' + env
    } else {
      return ""
    }
  }

  function createUuid(uuid) {
    window[uuid] = "Hello I got places to be"
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
    <label>Please Enter UUID variable if necessary: </label>
      <input
        id="textbox"
        type="text"
        value={uuid}
        onChange={(e) => setUuid(e.target.value)}
      />
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